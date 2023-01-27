USE department_db
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales lead", 10000, 1),
       ("Salesperson", 75000, 2),
       ("Leade Engineer", 250000, 1),
       ("Software Engineer", 80000, 2),
       ("Account Manager", 10000, 1),
       ("Accountant", 60000, 3),
       ("Legal Team Lead", 125000, 1),
       ("Lawyer", 125000, 2);  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
    ("Mike","Chan", 2, NULL),
    ("Ashley","Rodriguez", 2, NULL),
    ("Kevin","Tupik", 3, 2),
    ("Kunal","Singh", 3, 2),
    ("Malia","Brown", 4, 4),
    ("Sarah","Lourd", 2, 5),
    ("Tom","Allen", 1, 1);

    