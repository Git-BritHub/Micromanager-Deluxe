const inquirer = require("inquirer");
const db = require("./config/connection");

db.connect(function (err) {
    if (err) throw err;
    console.log("MySQL is connected!");
    init();
});

const questions = [
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee's Role"],
    },
];

// Allow user to manage company database functions
const init = () => {
    inquirer.prompt(questions).then((data) => {
        const choice = data.action;
        if (choice === "View All Departments") {
            viewAllDepartments();
        }
        if (choice === "View All Roles") {
            viewAllRoles();
        }
        if (choice === "View All Employees") {
            viewAllEmployees();
        }
        if (choice === "Add a Department") {
            addDepartment();
        }
        if (choice === "Add a Role") {
            addRole();
        }
        if (choice === "Add an Employee") {
            addEmployee();
        }
        if (choice === "Update an Employee's Role") {
            updateEmployeeRole();
        }
    });
};

// View all departments in database
const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// View all employee roles in database
const viewAllRoles = () => {
    db.query(`SELECT * FROM employee_role left JOIN department ON employee_role.department_id = department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// View all employees in database
const viewAllEmployees = () => {
    db.query(`SELECT * FROM employees left JOIN employee_role ON employees.role_id = employee_role.id left JOIN department ON employee_role.department_id = department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// Add department to database
const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "departmentName",
        message: "What department would you like to add?",
    }]).then((res) => {
        db.query(`INSERT INTO department SET ?`, {
            department_name: res.departmentName,
        }),
            console.log("Department was successfully added!");
        init();
    });
};

// Add employee role to database
const addRole = () => {
    db.query("SELECT * FROM department", (err, res) => {
        const departmentMap = res.map((depData) => ({
            name: depData.department_name,
            value: depData.id,
        }))
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What role would you like to add?",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What salary does this new role have?",
            },
            {
                type: "list",
                name: "departmentId",
                message: "Which department ID does this role belong to?",
                choices: departmentMap
            },
        ]).then((res) => {
            db.query(`INSERT INTO employee_role SET ?`, {
                title: res.roleName,
                salary: res.roleSalary,
                department_id: res.departmentId
            }),
                console.log("Role was successfully added!");
            init();
        })
    });
};

// Global variables needed for role and employee maps/options
let roleMap = [];
let roleOpt = [];
let empMap = [];
let empOpt = [];

// Add employee to database
const addEmployee = () => {
    db.query("SELECT * FROM employee_role", (err, res) => {
        res.forEach(n => {
            roleMap.push(n.title)
            roleOpt.push([n.title, n.id])
        })
    })
    db.query("SELECT * FROM employees", (err, res) => {
        res.forEach(n => {
            empMap.push(n.first_name + " " + n.last_name)
            empOpt.push([n.first_name + " " + n.last_name, n.id])
        })
    })
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee you would like to add?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "roleId",
            message: "What is the role ID of the employee?",
            choices: roleMap
        },
        {
            type: "list",
            name: "managerId",
            message: "What is the manager ID of the employee?",
            choices: empMap
        },
    ]).then((employeeData) => {
        let title = employeeData.roleId
        let role_id
        console.log(title)
        roleOpt.forEach(role => {
            console.log(role)
            if (title === role[0]) {
                role_id = role[1]
            }
        })
        let fullName = employeeData.managerId
        let manager_id
        empOpt.forEach(manager => {
            console.log(manager)
            if (fullName === manager[0]) {
                manager_id = manager[1]
            }
        })
        db.query(`INSERT INTO employees SET ?`, {
            first_name: employeeData.firstName,
            last_name: employeeData.lastName,
            role_id,
            manager_id,
        }, (err, res) => {
            if (err) {
                console.error("Error in adding new employee!", err);
            } else {
                console.log("Employee was successfully added!");
            }
            init();
        });
    })
};

// Update employee's new role to database using promise() method/cleanest method
const updateEmployeeRole = async () => {
    try {
        const [employees] = await db.promise().query('SELECT id as value, concat( first_name, " ", last_name ) as name FROM employees')
        const [roles] = await db.promise().query('SELECT id as value, title as name FROM employee_role')
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Which employee would you like to update?",
                choices: employees,
            },
            {
                type: "list",
                name: "role_id",
                message: "What is the employee's new role?",
                choices: roles,
            },
        ])
        await db.promise().query('UPDATE employees SET role_id = ? WHERE id = ?', [response.role_id, response.id])
        console.log('Employee successfully added!')
        init()
    } catch (err) {
        console.log(err)
    }
}