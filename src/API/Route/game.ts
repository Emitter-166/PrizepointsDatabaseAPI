import {Request, Response} from "express";
import {sequelize} from "../../index";
import {Model} from "sequelize";

export const gamesCache = new Map<string, number>();

export const updateGame = async (req: Request, res: Response) => {
    const {name} = req.query;
    if(name === undefined){
        res.status(400).send({message: 'invalid format'})
        return;
    }

    let defaultObject = {...req.query};

    const [model, created] = await sequelize.model("games").findOrCreate({
        where: {name: name},
        defaults: defaultObject
    })

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
   const model = await sequelize.model("games").findAll({
       where: whereObject
   })

    if(model.length === 0){
        res.status(400).send({message: "Game not found"})
    }else{
        let returnData:{
            model: Model,
            updatedAt: number
        }[] = [];
        model.forEach(model => {
            let name = model.get("name") as string;
            if(gamesCache.get(name) === undefined){
               gamesCache.set(name, 0)
                returnData.push({
                    model: model,
                    updatedAt: 0
                })
            }else{
                returnData.push({
                    model: model,
                    updatedAt: gamesCache.get(name) as number
                })
            }
        })
        res.status(200).send({message: "Game found", returnData})
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
