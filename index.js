const inquirer = require("inquirer");
const sequelize = require("./config/connection");

sequelize.connect(function (err) {
    if (err) throw err;
    console.log("MySQL is connected!")
    init()
})

const questions = [
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee's Role"]
    }
]

const init = () => {
    inquirer.prompt(questions).then((data) => {
        const choice = data.action;
        if (choice === "View All Departments") {
            viewAllDepartments()
        }
        if (choice === "View All Roles") {
            viewAllRoles()
        }
        if (choice === "View All Employees") {
            viewAllEmployees()
        }
        if (choice === "Add a Department") {
            addDepartment()
        }
        if (choice === "Add a Role") {
            addRole()
        }
        if (choice === "Add an Employee") {
            addEmployee()
        }
        if (choice === "Update an Employee's Role") {
            updateEmployeeRole()
        }
    })
}

const viewAllDepartments = () => {
    sequelize.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res)
        init()
    })
}

const viewAllRoles = () => {
    sequelize.query(`SELECT * FROM employee_role`, function (err, res) {
        if (err) throw err;
        console.table(res)
        init()
    })
}

const viewAllEmployees = () => {
    sequelize.query(`SELECT * FROM employees`, function (err, res) {
        if (err) throw err;
        console.table(res)
        init()
    })
}

const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "departmentName",
        message: "What department would you like to add?"
    }]).then((res) => {
        sequelize.query(`INSERT INTO department SET ?`, {
            department_name: res.departmentName
        })
        console.log("Department was successfully added!")
        init()
    })
}

const addRole = () => {
    inquirer.prompt([{
        type: "input",
        name: "roleName",
        message: "What role would you like to add?"
    }]).then((res) => {
        sequelize.query(`INSERT INTO employee_role SET ?`, {
            employee_role_name: res.employee_roleName
        })
        console.log("Role was successfully added!")
        init()
    })
}

const addEmployee = () => {
    inquirer.prompt([{
        type: "input",
        name: "employeeName",
        message: "What employee would you like to add?"
    }]).then((res) => {
        sequelize.query(`INSERT INTO employees SET ?`, {
            employees_name: res.employeesName
        })
        console.log("Employee was successfully added!")
        init()
    })
}

const updateEmployeeRole = () => {
    inquirer.prompt([{
        type: "list",
        name: "employeeName",
        message: "Which employee would you like to update?",
    }]).then((res) => {
        sequelize.query(`SELECT * FROM employees`, function (err, res) {
            if (err) throw err;
            console.table(res)
            init()
        });inquirer.prompt([{
            type: "list",
            name: "selectRole",
            message: "What is the employee's new role?",
        }]).then((res) => {
            sequelize.query(`INSERT INTO employee_role SET ?`, {
                employee_role_name: res.employee_roleName
            })
            console.log("Role was successfully added!")
            init()
        })
    })
}