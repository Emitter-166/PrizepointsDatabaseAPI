import {Request, Response} from "express";
import {pointsCache} from "./point";
import {gamesCache} from "./game";

export const gameValidator = async (req:Request, res:Response) => {
    const {name, time} = req.query;
    if(!name || !time){
        res.status(400).send({
            message: "invalid body"
        })
        return
    }
   try{
        if(gamesCache.get(name as string) === Number(time)){
           res.status(200).send({
               valid: true
           })
       }else{
           res.status(200).send({
               valid: false
           })
       }
   }catch (err){
       res.status(500).send({
           message: "Please make sure your queries are valid"
       })
   }
}

export const pointsValidator = async (req:Request, res:Response) => {
    const {name, time} = req.query;
    if(!name || !time) {
        res.status(400).send({
            message: "invalid body"
        })
        return
    }
    try{
        if(pointsCache.get(name as string) === Number(time)){
            res.status(200).send({
                valid: true
            })
        }else{
            res.status(200).send({
                valid: false
            })
        }
    }catch (err){
        res.status(500).send({
            message: "Please make sure your queries are valid"
        })
    }

}