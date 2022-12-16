
/*
* operations:
*   - get points of a game
*   - get all the games and their configs
*   - add points to a play in a game
*   - make a new game
*   - update existing games config
*
*/


import {app, sequelize} from '../index';
import {Request, Response} from "express";
import {getGame, getGames} from "./Route/game";

export const startServer = () => {
    console.log("Server started")

    app.get("/", async (req:Request, res:Response) => {
        res.status(200).send({
            message: "Not a valid URL",
            games: "api/v1/games",
            createGames: "api/v1/games/create?name=something",
            updateGames: "api/v1/games/update?property=something",
            points: "api/v1/points?gameName=something",
            addPoints:"api/v1/points?userId=something&points=1",
            threads: "api/v1/threads",
            getThread: "api/v1/threads?threadId=something",
            createThreads: "api/v1/threads/create?threadId=something",
            addPointsToThreads: "api/v1/threads/add?threadId=something&query=something"
        })
    })

    app.get("/api/v1/games", async (req:Request, res:Response) => {
        const {name} = req.query;
        if(name){
            await getGame(req, res);
        }else{
            await getGames(req, res);
        }
    })

    app.post("/api/v1/games/create", async (req:Request, res:Response) =>{
        const {name} = req.query;
        if(!name){
            res.status(400).send({
                message: "No name provided"
            })
        }else{
            const [model, created] = await sequelize.model("games").findOrCreate({
                where:{
                    name: name
                }, defaults:{
                    name: name
                }
            })

            if(!created){
                res.status(400).send({message: "game already exist!", model})
            }else{
                res.status(200).send({message: "Game created! please enable it to make it runnable", model})
            }
        }
    })
}
