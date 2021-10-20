const fs = require('fs');
const inquirer = require('inquirer');
const env = require('dotenv')
const mysql = require('mysql2');
const express = require('express')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',

        user: process.env.DB_USER,

        password: process.env.DB_PASSWORD,
        
        database: process.env.company_db
    }
)