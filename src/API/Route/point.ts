import {Request, Response} from "express";
import {sequelize} from "../../index";
import {model as pointsModel} from "../../Database/Models/Dynamic/points";

export const pointsTableCache = new Map<string, number>();

export const getPoints =  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    if (!name) {
        res.status(400).send({message: "invalid body"})
        return;
    }
    try{
        const model = await sequelize.model(name).findAll();
        res.status(200).send({
            message: "points table found",
            model,
            updatedAt: pointsTableCache.get(name)
        })
    }catch (err){
        res.status(400).send({message: "No game points table with that name is found!"})
    }
}

export const setPoints = async (req: Request, res: Response) => {
    const queryData = req.query;
    if (Object.keys(queryData).length !== 3) {
        res.status(400).send({message: "invalid body"})
        return;
    }
    let gamePointsModel;
    try{
        gamePointsModel = sequelize.model(queryData.name as string);
    }catch (err){
        pointsModel(sequelize, queryData.name as string)
        await sequelize.sync({alter: true})
        gamePointsModel = sequelize.model(queryData.name as string);
    }
    const [model, created] = await gamePointsModel.findOrCreate({
        where: {userId: queryData.name},
        defaults: {points: queryData.points}
    });

    const updatedAt = (new Date()).getTime();
    pointsTableCache.set(queryData.name as string, updatedAt);

    if(created){
        res.status(200).send({
            message:"New user created",
            model,
            updatedAt
        })
    }else{
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