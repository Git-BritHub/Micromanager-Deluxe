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
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add a Employee", "Update a Employee's Role"]
    }
]

const init = () => {
    inquirer.prompt(questions).then((data) => {
        const choice = data.action;
        if (choice === "View All Departments") {
            viewAllDepartments()
        }
        if (choice === "Add a Department") {
            addDepartment()
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


const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "departmentName",
        message: "What department would you like to add?"
    }]).then((res) => {
        sequelize.query(`INSERT INTO department SET ?`,{
            department_name: res.departmentName
        })
        console.log("Department was successfully added!")
        init()
    })
}