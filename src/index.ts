import {Sequelize} from "sequelize"
import * as fs from 'fs';
import * as path from "path";
const express = require('express');

export const app = express();
app.use(express.json);



require('dotenv').config({
    path: path.join(__dirname, ".env")
})

export const sequelize = new Sequelize('prizepoints', process.env.USERNAME as string, process.env.PASSWORD, {
    dialect: "mysql",
    host: "localhost"
})

fs.readdirSync(path.join(__dirname, "Database", "Models", "Static"))
    .forEach(file => {
        const model = require(path.join(__dirname, "Database", "Models", "Static", file))
        model(sequelize);
    })

sequelize.sync({alter: true, logging: false});
