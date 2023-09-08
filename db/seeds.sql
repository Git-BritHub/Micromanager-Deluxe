INSERT INTO department(id, department_name)
VALUES (1, "Board"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Finance"),
       (5, "Legal");

INSERT INTO employee_role(department_id, title, salary)
VALUES (1, "CEO", 1000000),
       (2, "Sales Lead", 75000),
       (2, "Sales Person", 65000),
       (3, "Senior Software Engineer", 120000),
       (3, "Junior Software Engineer", 70000),
       (4, "Account Manager", 80000),
       (4, "Accountant", 70000),
       (5, "Legal Team Lead", 170000),
       (5, "Lawyer", 140000);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Brittany", "Brimley", 1, null),
       ("Tyler", "Brown", 2, 1),
       ("Alyssa", "James", 3, 2),
       ("Brittany", "Wells", 4, 1),
       ("James", "Green", 5, 4),
       ("William", "Beckley", 6, 1),
       ("Stephany", "Brewer", 7, 6),
       ("Edward", "Planter", 8, 1),
       ("Robert", "Smith", 9, 8);