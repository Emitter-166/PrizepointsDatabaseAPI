import {Request, Response} from "express";
import {sequelize} from "../../index";
import {Model} from "sequelize";

export const gamesCache = new Map<string, number>();

export const updateGame = async (req: Request, res: Response) => {
    const {name} = req.query;
    if (name === undefined) {
        res.status(400).send({message: 'invalid format'})
        return;
    }

    let defaultObject = {...req.query};
    delete defaultObject.name

    let created:boolean = false;

    let model = await sequelize.model("games").findOne({
        where: {name: name}
    })
    if(model === null){
      model = await sequelize.model("games").create({
           name: name,
           defaultObject
       })
        created = true
    }

    const updatedAt = (new Date()).getTime();
    gamesCache.set(name as string, updatedAt);

    if (!created) {
        await model.update(defaultObject)
        res.status(200).send({
            message: "Game updated",
            model,
            updatedAt
        })
        return;
    } else {
        res.status(200).send({
            message: "Game created",
            model,
            updatedAt
        })
    }
}

export const getGame = async (req: Request, res: Response) => {
    const whereObject = {...req.query};
    if(whereObject.enabled !== undefined){
        try{
        whereObject.enabled = JSON.parse(whereObject.enabled as string);
        } catch(err){
            res.status(400).send({
                message: "invalid body"
            })
            return;
        }
    }
    const model = await sequelize.model("games").findOne({
        where: whereObject
    })

    if (model === null) {
        res.status(400).send({message: "Game not found"})
    } else {
        let returnData: {
            model: Model,
            updatedAt: number
        };
        let name = model.get("name") as string;
        if (gamesCache.get(name) === undefined) {
            gamesCache.set(name, 0)
            returnData = {
                model: model,
                updatedAt: 0
            }
        } else {
            returnData = {
                model: model,
                updatedAt: gamesCache.get(name) as number
            }
        }
        res.status(200).send({message: "Game found", returnData})
    }
}

export const getGames = async (req: Request, res: Response) => {
    try {
        res.status(200).send(
            await sequelize.model("games").findAll()
        )
    } catch (err) {
        res.status(500).send({
            message: "An internal error occurred, please try again or contact an admin"
        })
    }
}
