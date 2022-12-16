import {Request, Response} from "express";
import {sequelize} from "../../index";

export const postGame = async (req: Request, res: Response) => {
    let body: gameUpdateField;
    try {
        body = (req.body as gameUpdateField);
    } catch (err) {
        res.status(400).send({message: 'invalid format'})
        return;
    }
    let defaultObject = {
        channelIds: body.channelIds,
        roleIds: body.roleIds,
        pointsPerMessage: body.pointsPerMessage,
        pointsPerThreadCreation: body.pointsPerThreadCreation,
        enabled: body.enabled
    }

    if (body.channelIds === undefined) delete defaultObject.channelIds;
    if (body.roleIds === undefined) delete defaultObject.roleIds;
    if (body.pointsPerMessage === undefined) delete defaultObject.pointsPerMessage;
    if (body.pointsPerThreadCreation === undefined) delete defaultObject.pointsPerThreadCreation;
    if (body.enabled === undefined) delete defaultObject.enabled;

    const [model, created] = await sequelize.model("games").findOrCreate({
        where: {name: body.name},
        defaults: defaultObject
    })
    if (!created) {
        const updatedModel = await model.update(defaultObject)
        res.status(200).send({
            message: "Game updated",
            before: model,
            after: updatedModel
        })
        return;
    } else {
        res.status(200).send({
            message: "Game created",
            model: model
        })
    }
}

export const getGame = async (req: Request, res: Response) => {
    let gameName;
    try {
        gameName = req.query.name
    } catch (err) {
        res.status(400).send({
            message: "invalid body"
        })
    }
    try {
        const model = await sequelize.model("games").findOne({
            where: {
                name: gameName
            }
        })
        if(model !== null){
            res.status(200).send({
                message: "Game found",
                model: model
            })
        }else{
            res.status(400).send({
                message: "Game not found",
            })
        }

    }catch (err){
        res.send(500).send({
            message: "game probably doesn't exist"
        })
    }
}

export const getGames = async (req:Request, res:Response) => {
    try{
        res.status(200).send(
            await sequelize.model("games").findAll()
        )
    }catch (err) {
        res.status(500).send({
            message: "An internal error occurred, please try again or contact an admin"
        })
    }
}

export const getActiveGames = async (req:Request, res:Response) => {
    try{
        res.status(200).send(
            await sequelize.model("games").findOne({
                where: {
                    enabled: true
                }
            })
        )
    }catch (err){
        res.status(500).send({message: "An internal error occurred, please try again or contact an admin"})
    }
}