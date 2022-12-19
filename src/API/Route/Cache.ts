import {Request, Response} from "express";
import {pointsTableCache, pointsUserCache} from "./point";
import {gamesCache} from "./game";

export const gameValidator = async (req: Request, res: Response) => {
    const {name, time} = req.query;
    if (!name || !time) {
        res.status(400).send({
            message: "invalid body"
        })
        return
    }
    res.status(200).send({
        valid: (gamesCache.get(name as string) === Number(time))
    })
}

export const pointsValidator = async (req: Request, res: Response) => {
    const {name, time, userId} = req.query;
    if ((!name || !userId) && !time) {
        res.status(400).send({
            message: "invalid body"
        })
        return
    }
    if (userId) {
        res.status(200).send({
            valid: (pointsUserCache.get(userId as string) === Number(time))
        })
    } else {
        res.status(200).send({
            valid: (pointsTableCache.get(name as string) === Number(time))
        })
    }
}