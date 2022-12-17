import {Request, Response} from "express";
import {sequelize} from "../../index";

export const setThreads = async (req: Request, res: Response) => {
    const {threadId, points} = req.query;
    if (!threadId || !points) {
        res.status(400).send({
            message: "Invalid body"
        })
    }

    const [model, created] = await sequelize.model("threads").findOrCreate({
        where:{
            threadId: threadId
        },
        defaults: {
            threadId: threadId,
            points: points
        }
    })
    if(created){
        res.status(200).send({
            message: "Thread created and points updated",
            model
        })
    }else{
        const updated = await model.update({
            points: points
        })
        res.status(200).send({
            message: "Thread points updated",
            updated
        })
    }

}

export const getThread = async (req: Request, res: Response) => {
    const {threadId} = req.query;
    if (!threadId) {
        res.status(400).send({
            message: "Invalid body"
        })
    }
    const model = await sequelize.model("threads").findOne({
        where:{threadId: threadId}
    })

    if(model === null){
       res.status(400).send({
           message: "Thread not found"
       })
    }else{
       res.status(200).send({
           message: "Thread found",
           model
       })
    }
}


export const getAllThreads = async (req:Request, res:Response) => {
    const models = await sequelize.model("threads").findAll();
    if(models.length === 0){
        res.status(400).send({
            message: "No threads found"
        })
    }else{
        res.status(200).send({
            models
        })
    }
}