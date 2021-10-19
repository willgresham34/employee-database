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
    } else if(res.contQuestion === "View All Roles") {
        viewAllRoles();
    } else if(res.contQuestion === "Add Role") {
        addRole();
    } else if(res.contQuestion === "View All Departments") {
        viewAllDeps();        
    } else if(res.contQuestion === "Add Department") {
        addDeps();
    } else if(res.contQuestion === "View All Employees") {
        viewAllEmps();
    } else {
        console.log('GoodBye!');
    }
    })
    .catch(err => console.error(err)) 
}
    const employeeQuestions = (Cards) => {
    inquirer.prompt([
        {
            type:'input', 
            message: 'What is your employees name?',
            name: 'empName',
        },

        {
            type: 'input',
            message: 'What is your employees ID number?',
            name: 'empId', 
        },

        {
            type: 'input',
            message: 'What is your employees email?',
            name: 'empEmail', 
        },

        {
            type: 'input',
            message: 'What is your employees gitHub user name?',
            name: 'empGithub', 
        },

        {
            type: 'list',
            message: 'Would you like to add employee or intern?',
            choices: [
                'Employee',
                'Intern',
                'No, Thank you',
            ],
            name: 'contQuestion', 
        },
        
    ])
    .then(res => {
    if (res.contQuestion === "Employee") {
        employeeQuestions(Cards);
    } else if(res.contQuestion === "Intern") {
        internQuestions(Cards);
    } else {
        writeHTMLFile(Cards);
    }
    })
    .catch(err => console.error(err)) 
}
const internQuestions = () => {
    inquirer.prompt([
        {
            type:'input', 
            message: 'What is your interns name?',
            name: 'intName',
        },

        {
            type: 'input',
            message: 'What is your interns ID number?',
            name: 'intId', 
        },

        {
            type: 'input',
            message: 'What is your interns email?',
            name: 'intEmail', 
        },

        {
            type: 'input',
            message: 'What school does your intern go to?',
            name: 'school', 
        },

        {
            type: 'list',
            message: 'Would you like to add employee or intern?',
            choices: [
                'Intern',
                'No, Thank you',
            ],
            name: 'contQuestion', 
        },
        
    ])
    .then(res => {
        if(res.contQuestion === "Intern") {
            internQuestions();
        }        
    })
    .catch(err => console.error(err)) 
}
