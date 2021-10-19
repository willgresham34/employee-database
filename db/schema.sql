DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL,
    Last_name VARCHAR(50) NOT NULL,
    title VARCHAR(60) NOT NULL,
    department VARCHAR(30),
    salary INT NOT NULL,
    manager VARCHAR(30),
    PRIMARY KEY(id)
)