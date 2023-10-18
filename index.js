const inquirer = require("inquirer");
const sequelize = require("./config/connection");

sequelize.connect(function (err) {
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

const viewAllDepartments = () => {
    sequelize.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const viewAllRoles = () => {
    sequelize.query(`SELECT * FROM employee_role`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const viewAllEmployees = () => {
    sequelize.query(`SELECT * FROM employees`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "departmentName",
        message: "What department would you like to add?",
    }]).then((res) => {
        sequelize.query(`INSERT INTO department SET ?`, {
            department_name: res.departmentName,
        }),
            console.log("Department was successfully added!");
        init();
    });
};

// TODO: get addRole functioning correctly and research implimenting .promise() function
const addRole = () => {

    sequelize.query("SELECT * FROM department", (err, res) => {
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
            sequelize.query(`INSERT INTO employee_role SET ?`, {
                title: res.roleName,
                salary: res.roleSalary,
                department_id: res.departmentId
            }),
                console.log("Role was successfully added!");
            init();
        })
    });
};
let roleMap = [];
let roleOpt = [];
let empMap = [];
let empOpt = [];
// TODO: get addEmployee functioning correctly and research implimenting .promise() function
const addEmployee = () => {
    sequelize.query("SELECT * FROM employee_role", (err, res) => {
        // let roleMap = res.map((roleData) => ({
        res.forEach(n => {
            roleMap.push(n.title)
            roleOpt.push([n.title, n.id])
        })
        // res.forEach(v => {
        //     roleMap.push(v.id)
        // })
        //     name: roleData.title,
        //     value: roleData.id,
        // }))
    })
    sequelize.query("SELECT * FROM employees", (err, res) => {
        res.forEach(n => {
            empMap.push(n.first_name + " " + n.last_name)
            empOpt.push([n.first_name + " " + n.last_name, n.id])
        })
        // res.forEach(v => {
        //     empMap.push(v.id)
        // })
        // let empMap = res.map((employeeData) => ({
        //     name: employeeData.last_name,
        //     firstName: employeeData.first_name,
        //     value: employeeData.id,
        // }))
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
        let title =  employeeData.roleId
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
        sequelize.query(`INSERT INTO employees SET ?`, {
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
    // });
};

// TODO: get updateEmployeeRole functioning correctly and research implimenting .promise() function
const updateEmployeeRole = () => {
    sequelize.query(`SELECT * FROM employees`, (err, employees) => {
        if (err) throw err;
        console.table(employees);
        inquirer.prompt([
            {
                type: "list",
                name: "employeeName",
                message: "Which employee would you like to update?",
                choices: employees.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                })),
            },
        ]).then((employeeData) => {
            sequelize.query(`SELECT * FROM employee_role`, (err, roles) => {
                if (err) throw err;
                 roleMap = roles.map((roleData) => ({
                    name: roleData.title,
                    value: roleData.id,
                }))
                inquirer.prompt([
                    {
                        type: "list",
                        name: "selectRoleId",
                        message: "What is the employee's new role ID?",
                        choices: roleMap,
                    }]).then((roleData) => {
                        const selectedEmployeeId = employeeData.employeeName;
                        const selectedRoleId = roleData.selectRoleId;
                        const params = [selectedRoleId, selectedEmployeeId]
                        sequelize.query(`UPDATE employees SET role_id = ? WHERE id = ?`, params,
                            (err, res) => {
                                if (err) {
                                    console.error("Error updating employee role!", err);
                                } else {
                                    console.log("Role was successfully updated!")
                                }
                                init();
                            }
                        );
                    })
            })
        });
    });
};


