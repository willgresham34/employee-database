const fs = require('fs');
const inquirer = require('inquirer');

//Beginning Question
function entryQuestion(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Update Employee Role',
                'Add Employee',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'View All Employees',
                'Quit'
            ],
            name: 'contQuestion', 
        },
    ])
    .then(res => {
    if (res.contQuestion === "Update Employee Role") {
        updateEmpRole();
    }else if (res.contQuestion === "Add Employee") {
        addEmployee();
    } else if(res.contQuestion === "View All Roles") {
        viewAllRoles();
    } else if(res.contQuestion === "Add Role") {
        addRole();
    } else if(res.contQuestion === "View All Departments") {
        viewAllDeps();        
    } else if(res.contQuestion === "Add Department") {
        addDept();
    } else if(res.contQuestion === "View All Employees") {
        viewAllEmps();
    } else {
        console.log('GoodBye!');
    }
    })
    .catch(err => console.error(err)) 
}
const addEmployee = () => {
    inquirer.prompt([
        {
            type:'input', 
            message: 'What is the employees first name?',
            name: 'firstName',
        },

        {
            type:'input', 
            message: 'What is the employees last name?',
            name: 'lastName',
        },

        {
            type: 'list',
            message: 'What is the employees role?',
            choices: [
                //Insert var from database with array of roles
            ],
            name: 'empRole', 
        },

        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: [
                //insert var from database with array of depts
            ],
            name: 'dept', 
        },
        
    ])
    .then(res => {
        console.log(`Added ${res.roleName} to the database`);
        // create function that takes responses and puts them into the data base
        entryQuestion();
    })
    .catch(err => console.error(err)) 
}

    const addRole = () => {
    inquirer.prompt([
        {
            type:'input', 
            message: 'What is the name of the role?',
            name: 'roleName',
        },

        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'rolePay', 
        },

        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: [
                //insert var that contains the array of depts
            ],
            name: 'dept', 
        },
        
    ])
    .then(res => {
        console.log(`Added ${res.roleName} to the database`);
        // create function that takes responses and puts them into the data base
        entryQuestion();
    })
    .catch(err => console.error(err)) 
}

const addDept = () => {
    inquirer.prompt([
        {
            type:'input', 
            message: 'What is the name of the department?',
            name: 'deptName',
        },
    ])
    .then(res => {
        console.log(`Added ${res.roleName} to the database`);
        // create function that takes responses and puts them into the data base
        entryQuestion();
    })
    .catch(err => console.error(err)) 
}

entryQuestion();


module.export = index;