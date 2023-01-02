const inquirer = require('inquirer');
const DB = require("./db/indexdb");
const database = new DB;
// require("./db/connection");

require("console.table");




init();


function init() {
    inquirer.prompt([{
                type: 'list',
                name: 'choices',
                message: 'What would you like to do?',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit application']

            }
            // end of prompt
        ])

        .then((response => {
            let choices = response.choices;
            switch (choices) {
                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "View All Employees":
                    viewEmployees();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Exit application":
                    quit();
                    break;

            }

        }))
}


// THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
    database.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => init());

}

// WHEN I choose to view all roles
// THEN I am presented with :
// the job title, role id, the department that role belongs to, and the salary for that role

function viewRoles() {
    database.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => init());
}

// View all employees
function viewEmployees() {
    database.findAllEmployees()
        .then(([rows]) => {
            let employee = rows;
            console.log("\n");
            console.table(employee);
        })
        .then(() => init());
}


// / Add department 

function addDepartment() {
    inquirer.prompt([{

            name: "newDepartmentName",
            message: "What is the name of the department?"
        }])
        .then(response => {
            let name = response;
            database.createDepartment(response.newDepartmentName)
                .then(() => console.log(`Added  to the database`))
                .then(() => init());

        })
}

function addRole() {

    inquirer.prompt([{
                name: "newRoleName",
                message: "What is the name of the role?"

            },

            {


                name: "salary",
                message: "What is the salary for this role?"
            },


            {

                name: "departmentNewRole",
                message: "What is the department ID for this role?"

            }
        ])


        .then(response => {
            let name = [response.newRoleName,
                response.salary,
                response.departmentNewRole
            ];
            database.createRole(name)
                .then(() => console.log(`Added ${name} to the database`),




                )
                .then(() => init());

        })

}


function addEmployee() {

    inquirer.prompt([{
                name: "employeeFirstName",
                message: "What is the first name of the employee?"

            },

            {
                name: "employeeLastName",
                message: "What is the last name of the employee?"

            }

        ])
        .then(response => {
            let firstName = response.employeeFirstName;
            let lastName = response.employeeLastName;


            database.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const choicesRole = roles.map(({
                        id,
                        title
                    }) => ({
                        name: title,
                        value: id
                    }));



                    inquirer.prompt({
                            type: "list",
                            name: "employeeRole",
                            message: "What is the role of the employee?",
                            choices: choicesRole
                        })

                        .then(response => {
                            let employeeRole = response.employeeRole;


                            database.findAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const employeeManager = employees.map(({
                                        id,
                                        first_name,
                                        last_name
                                    }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id

                                    }));

                                    inquirer.prompt({
                                            type: "list",
                                            name: "employeeManagerId",
                                            message: "Who is this employee's manager?",
                                            choices: employeeManager

                                        })

                                        .then(response => {
                                            // let employee = {
                                            // //     first_name: firstName,
                                            // //     last_Name: lastName,
                                            // //     role_id: employeeRole,
                                            // //     manager_id: response.employeeManagerId
                                            // // }

                                            let employee = [
                                                firstName,
                                                lastName,
                                                employeeRole,
                                                response.employeeManagerId
                                            ]

                                            database.createEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added  ${firstName} ${lastName} to the database`


                                        ))
                                        .then(() => init())
                                })
                        })
                })
        })
}



function updateEmployeeRole() {
    database.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeSelections = employees.map(({
                id,
                first_name,
                last_name
            }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            console.log(employeeSelections)
            inquirer.prompt([{
                        type: "list",

                        name: "idEmployee",
                        message: "Which employee's role do you want to update?",
                        choices: employeeSelections
                    }

                ])

                .then(responE => {

                    let idEmployee = responE.idEmployee;
                    database.findAllRoles()
                        .then(([rows]) => {

                            let roles = rows;

                            const roleSelections = roles.map(({
                                id,
                                title

                            }) => ({
                                name: title,
                                value: id
                            }));

                            inquirer.prompt({
                                    type: "list",
                                    name: "idRole",
                                    message: "Which role do you want to give the selected employee?",
                                    choices: roleSelections
                                })

                                .then(response => {
                                    console.log(idEmployee, response.idRole);
                                    database.updateEmployeeRole(idEmployee, response.idRole)
                                        .then((res) => {
                                            console.log(res)
                                            init()
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })
                                });
                        })
                })
        })
}

// Exit the application
function quit() {
    console.log("Goodbye!");
    process.exit();
}




//     inquirer.prompt([{
//         name: "newRoleName",
//         message: "What is the name of the role?"

//     },

//     {


//         name: "salary",
//         message: "What is the salary for this role?"
//     },


//     {

//         name: "departmentNewRole",
//         message: "What is the department ID for this role?"

//     }
// ])


// .then(response => {
//     let name = [response.newRoleName,
//     response.salary,
// response.departmentNewRole];
//     database.createRole(name)
//         .then(() => console.log(`Added ${name} to the database`),




//         )
//         .then(() => init());

// })




// // Update an employee's role
// function updateEmployeeRole() {
//     db.findAllEmployees()
//       .then(([rows]) => {
//         let employees = rows;
//         const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
//           name: `${first_name} ${last_name}`,
//           value: id
//         }));

//         prompt([
//           {
//             type: "list",
//             name: "employeeId",
//             message: "Which employee's role do you want to update?",
//             choices: employeeChoices
//           }
//         ])
//           .then(res => {
//             let employeeId = res.employeeId;
//             db.findAllRoles()
//               .then(([rows]) => {
//                 let roles = rows;
//                 const roleChoices = roles.map(({ id, title }) => ({
//                   name: title,
//                   value: id
//                 }));

//                 prompt([
//                   {
//                     type: "list",
//                     name: "roleId",
//                     message: "Which role do you want to assign the selected employee?",
//                     choices: roleChoices
//                   }
//                 ])
//                   .then(res => db.updateEmployeeRole(employeeId, res.roleId))
//                   .then(() => console.log("Updated employee's role"))
//                   .then(() => loadMainPrompts())
//               });
//           });
//       })
//   }

// Update an employee's manager