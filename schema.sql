DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;



\c employeetracker_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL
);

CREATE TABLE role  (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary decimal NOT NULL,
  department Integer NOT NULL,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id Integer NOT NULL,
  manager_id Integer,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);