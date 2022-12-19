import {Request, Response} from "express";
import {sequelize} from "../../index";
import {model as pointsModel} from "../../Database/Models/Dynamic/points";

export const pointsTableCache = new Map<string, number>();
export const pointsUserCache = new Map<string, number>();

export const getPoints = async (req: Request, res: Response) => {
    let {name, userId} = req.query;
    name = name as string;
    userId = userId as string;

    if (!name) {
        res.status(400).send({message: "invalid body"})
        return;
    }
    if (userId) {
        try {
            const mainModel = sequelize.model(name)
            const model = await mainModel.findOne({
                where: {
                    userId: userId
                }
            })
            if(model !== null){
                if(!pointsUserCache.has(userId)){
                    pointsUserCache.set(userId, (new Date()).getTime())
                }
                res.status(200).send({
                    message: "points found",
                    model,
                    updatedAt: pointsUserCache.get(userId)
                })
            }else{
                res.status(400).send({
                    message: "points not found",
                })
            }

        } catch (err) {
            res.status(400).send({message: "No game points table with that name is found!"})
        }
    } else {
        try {
            if (!pointsTableCache.has(name)) {
                pointsTableCache.set(name, (new Date()).getTime())
            }
            const model = await sequelize.model(name).findAll();
            res.status(200).send({
                message: "points table found",
                model,
                updatedAt: pointsTableCache.get(name)
            })
        } catch (err) {
            res.status(400).send({message: "No game points table with that name is found!"})
        }
    }

}

export const setPoints = async (req: Request, res: Response) => {
    const queryData = req.query;
    if (Object.keys(queryData).length !== 3) {
        res.status(400).send({message: "invalid body"})
        return;
    }
    let gamePointsModel;
    try {
        gamePointsModel = sequelize.model(queryData.name as string);
    } catch (err) {
        pointsModel(sequelize, queryData.name as string)
        await sequelize.sync({alter: true})
        gamePointsModel = sequelize.model(queryData.name as string);
    }
    const [model, created] = await gamePointsModel.findOrCreate({
        where: {userId: queryData.userId},
        defaults: {points: queryData.points}
    });

    const updatedAt = (new Date()).getTime();
    pointsTableCache.set(queryData.name as string, updatedAt);
    pointsUserCache.set(queryData.userId as string, updatedAt);

    if (created) {
        res.status(200).send({
            message: "New user created",
            model,
            updatedAt
        })
    } else {
        await model.update({
            points: queryData.points
        })
        res.status(200).send({
            message: "Updated points",
            model,
            updatedAt
        })
    }
}