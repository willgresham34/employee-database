const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')

const app = express();
const PORT = process.env.PORT || 3001;

