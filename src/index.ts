import {Sequelize} from "sequelize"

const express = require('express');
export const app = express();


app.use(express.json);

import * as path from "path";

require('dotenv').config({
    path: path.join(__dirname, ".env")
})

export const sequelize = new Sequelize('prizepoints', process.env.USERNAME as string, process.env.PASSWORD, {
    dialect: "mysql",
    host: "localhost"
})