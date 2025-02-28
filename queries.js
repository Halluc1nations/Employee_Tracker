import pool from './connection.js';

const getDepartments = async () => {
    const { rows } = await pool.query('SELECT * FROM department');
    return rows;
};

const getRoles = async () => {
    const { rows } = await pool.query(`
        SELECT role.id, role.title, role.salary, department.first_name AS department
        FROM role
        JOIN department ON role.department = department.id
    `);
    return rows;
};

const getEmployees = async () => {
    const { rows } = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, role.title, department.first_name AS department, role.salary,
               CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN department ON role.department = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
    return rows;
};

const addDepartment = async (name) => {
    await pool.query('INSERT INTO department (first_name) VALUES ($1)', [name]);
};

const addRole = async (title, salary, department) => {
    await pool.query('INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)', [title, salary, department]);
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, role_id, manager_id]);
};

const updateEmployeeRole = async (employee_id, role_id) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

export { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
