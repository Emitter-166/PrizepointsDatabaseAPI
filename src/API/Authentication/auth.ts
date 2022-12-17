import {NextFunction, Request, Response} from "express";
import {userData} from "./accounts";

const auth = require('basic-auth');

export const authenticate = (req:Request, res:Response, next:NextFunction) =>{
    const credentials = auth(req);

    if(credentials?.pass === undefined || credentials?.name === undefined){
        res.status(401)
            .send({
                message: "Please use basic authentication with valid name and pass"
            })
        return;
    }

    userData.users.forEach((user, i) => {
        if(user.name === credentials?.name){
            if(user.pass === credentials.pass){
                next();
                return
            }else{
                res.sendStatus(401);
                return;
            }
        }
    })
}