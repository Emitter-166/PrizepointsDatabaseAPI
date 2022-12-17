import {Sequelize} from "sequelize"
import * as fs from 'fs';
import * as path from "path";
import {startServer} from "./API/app";
import express from 'express';

export const app = express();
app.use(express.json());

require('dotenv').config({
    path: path.join(__dirname, ".env")
})
export const sequelize = new Sequelize('prizepoints', process.env.DATABASE_USERNAME as string, process.env.PASSWORD, {
    dialect: "mysql",
    host: "localhost",
    logging: false
})

fs.readdirSync(path.join(__dirname, "Database", "Models", "Static"))
    .forEach(file => {
        const model = require(path.join(__dirname, "Database", "Models", "Static", file))
        model.model(sequelize)
    })

sequelize.sync({alter: true}).then(r => console.log("synced all models"));
startServer();
app.listen(process.env.PRIZEPOINTS_PORT, () => {
    console.log(`Listening to port ${process.env.PRIZEPOINTS_PORT}`)
})