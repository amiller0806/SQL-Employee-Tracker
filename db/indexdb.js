const mysql = require('mysql2');


class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor() {
        const connection = mysql.createConnection({
            port: "3306",
            user: "root",
            password: '',
            database: 'employeetracker_db'
        });

        connection.connect(function (err) {
            if (err) throw (err);
        });
        this.connection = connection;
    }


    // Find all departments
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.department_name FROM department;"


        );
    }



    // Find all roles
    // the job title, role id, the department that role belongs to, and the salary for that role
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT roles.title, roles.id, roles.salary, roles.department_id FROM roles;"


        );
    }



    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id  FROM employee;"

        );
    }

    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department(department_name)VALUES(?);", department)
    }

    createRole(role) {
        return this.connection.promise().query("INSERT INTO roles(title, salary, department_id)VALUES(?,?,?);", role);

    }

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES(?,?,?,?);", employee);
    }


    updateEmployeeRole(employeeId, roleId) {
        console.log(`Emplo -${employeeId} Update role - ${roleId}`);

        return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id= ?;", [roleId, employeeId])


    }

}

module.exports = DB;