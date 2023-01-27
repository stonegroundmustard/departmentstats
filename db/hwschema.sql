DROP DATABASE IF EXISTS department_db;
CREATE DATABASE IF NOT EXISTS department_db;

USE department_db;

CREATE TABLE department (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);
-- comments --
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL(11,2) NOT NULL, 
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT,
    -- FOREIGN KEY (role_id) REFERENCES role(id), --
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);