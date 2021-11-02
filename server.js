const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require("express");
const { start } = require("repl");
require("dotenv").config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  dialect: "mysql",
  port: 3306,

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function startConnection() {
  const db = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) throw err;
  });
  return db;
}
//Beginning Question
function entryQuestion() {
  startConnection();

  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Update Employee Role",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "View All Employees",
          "Quit",
        ],
        name: "contQuestion",
      },
    ])
    .then((res) => {
      if (res.contQuestion === "Add Employee") {
        addEmployee();
      } else if (res.contQuestion === "View All Roles") {
        viewAllRoles();
      } else if (res.contQuestion === "Add Role") {
        addRole();
      } else if (res.contQuestion === "View All Departments") {
        viewAllDeps();
      } else if (res.contQuestion === "Add Department") {
        addDept();
      } else if (res.contQuestion === "View All Employees") {
        viewAllEmps();
      } else {
        console.log("GoodBye!");
      }
    })
    .catch((err) => console.error(err));
}

const addEmployee = () => {
  db.query("Select title FROM roles", (err, res) => {
    var rolesArray = [];
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      rolesArray.push(res[i].title);
    }

    db.query("Select first_name FROM employees", (err, res) => {
      var manArray = ["None"];
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        manArray.push(res[i].first_name);
      }
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employees first name?",
            name: "firstName",
          },

          {
            type: "input",
            message: "What is the employees last name?",
            name: "lastName",
          },

          {
            type: "list",
            message: "What is the employees role?",
            choices: rolesArray,
            name: "empRole",
          },

          {
            type: "list",
            message: "Who is your employees manager?",
            choices: manArray,
            name: "empMang",
          },
        ])
        .then((res) => {
          // create function that takes responses and puts them into the data base
          db.query(`INSERT INTO employees SET ?`, {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.empRole,
            manager: res.empMang,
          });

          console.log(`Added ${res.firstName} ${res.lastName} to the database`);
          entryQuestion();
        })
        .catch((err) => console.error(err));
    });
  });
};

const addRole = () => {
  db.query("Select departments FROM departments", (err, res) => {
    var deptArray = [];
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      deptArray.push(res[i].departments);
    }

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "roleName",
        },

        {
          type: "input",
          message: "What is the salary of the role?",
          name: "rolePay",
        },

        {
          type: "list",
          message: "Which department does the role belong to?",
          choices: deptArray,
          name: "dept",
        },
      ])
      .then((res) => {
        // create function that takes responses and puts them into the data base
        db.query(`INSERT INTO roles SET ?`, {
          title: res.roleName,
          salary: res.rolePay,
          department_id: res.dept,
        });

        console.log(`Added ${res.roleName} to the database`);
        entryQuestion();
      })
      .catch((err) => console.error(err));
  });
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "deptName",
      },
    ])
    .then((res) => {
      // create function that takes responses and puts them into the data base
      db.query(
        `INSERT INTO departments SET ?`,
        {
          departments: res.deptName,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`Added ${res.deptName} to the database`);
          entryQuestion();
        }
      );
    })
    .catch((err) => console.error(err));
};

//view employees
const viewAllEmps = () => {
  db.query(
    `SELECT id, first_name, last_name, role_id, manager FROM employees;`,
    (err, res) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(res);
      console.log(`\n`);
      entryQuestion();
    }
  );
};

//view roles
const viewAllRoles = () => {
  db.query(
    `SELECT id, title, salary, department_id FROM roles;`,
    (err, res) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(res);
      console.log(`\n`);
      entryQuestion();
    }
  );
};

//view deps
const viewAllDeps = () => {
  db.query(`SELECT id, departments FROM departments;`, (err, res) => {
    if (err) throw err;
    console.log(`\n`);
    console.table(res);
    console.log(`\n`);
    entryQuestion();
  });
};

entryQuestion();
