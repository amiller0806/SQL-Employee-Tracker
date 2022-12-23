const mysql = require('mysql2');


const connection = mysql.createConnection({
    port: "3306",
    user: "root",
    password: '',
    database: 'employeetracker_db'
});

connection.connect(function(err) {
    if (err) throw (err);
}); 

module.exports = connection;