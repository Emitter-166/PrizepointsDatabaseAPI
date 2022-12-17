import {Request, Response} from "express";
import {sequelize} from "../../index";

export const updateGame = async (req: Request, res: Response) => {

    if(req.query.name === undefined){
        res.status(400).send({message: 'invalid format'})
        return;
    }

    let defaultObject = {...req.query};
    const [model, created] = await sequelize.model("games").findOrCreate({
        where: {name: req.query.name},
        defaults: defaultObject
    })
    if (!created) {
        await model.update(defaultObject)
        res.status(200).send({
            message: "Game updated",
            model
        })
        return;
    } else {
        res.status(200).send({
            message: "Game created",
            model
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
        res.status(200).send({message: "Game found", model})
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
