USE employeetracker_db;

INSERT INTO department (department_name )
VALUES 
("Sales Department"),
("Marketing Department"),
("HR Department"),
("Admin Department");

INSERT INTO roles (title, salary, department_id)
VALUES
("Manager", 100000, 1),
("Manager", 100000, 2),
("Manager", 100000, 3),
("Manager", 100000, 4),
("Sales Rep", 100000, 1),
("Marketing Agent", 100000, 2),
("HR Representative", 90000, 3),
("Administrative Director", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Ariel", "Miller", 1, null),
("John", "Johnson", 2, null),
("Veronica", "James", 3, null),
("Erik", "Mills", 4, null),

("Emily", "Johns", 5, 1),
("Marcus", "Mays", 6,2),
("Beverly", "Jones", 7,3),
("Lianna", "Jameson", 8, 4);

