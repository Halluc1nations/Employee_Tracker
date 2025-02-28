import inquirer from "inquirer"
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './queries.js';

 const mainMenu = async () => {
    const { choice } = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (choice) {
        case 'View all departments':
            const departments = await getDepartments();
            console.log(departments);
            break;

        case 'View all roles':
            const roles = await getRoles();
            console.log(roles);
            break;

        case 'View all employees':
            const employees = await getEmployees();
            console.log(employees);
            break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt([
                { type: 'input', name: 'departmentName', message: 'Enter the department name:' }
            ]);
            await addDepartment(departmentName);
            console.log('Department added successfully!');
            break;

        case 'Add a role':
            const { title, salary, departmentId } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter the role title:' },
                { type: 'input', name: 'salary', message: 'Enter the salary:' },
                { type: 'input', name: 'departmentId', message: 'Enter the department ID:' }
            ]);
            await addRole(title, salary, departmentId);
            console.log('Role added successfully!');
            break;

        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter the employee first name:' },
                { type: 'input', name: 'lastName', message: 'Enter the employee last name:' },
                { type: 'input', name: 'roleId', message: 'Enter the role ID:' },
                { type: 'input', name: 'managerId', message: 'Enter the manager ID (or leave blank):' }
            ]);
            await addEmployee(firstName, lastName, roleId, managerId || null);
            console.log('Employee added successfully!');
            break;

        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'employeeId', message: 'Enter the employee ID to update:' },
                { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' }
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            console.log('Employee role updated successfully!');
            break;

        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    mainMenu(); // Restart menu
};

// Start the application
mainMenu();
