import {Request, Response} from "express";


export const postGame = (req:Request, res:Response) => {
    let body:gameUpdateField;
       try {
           body = (req.body as gameUpdateField);
       }catch (err){
           res.status(400).send({message: 'invalid format'})
           return;
       }

}

export const getGame = (req:Request, res:Response) => {

}