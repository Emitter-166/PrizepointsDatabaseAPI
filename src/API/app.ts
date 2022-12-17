
/*
* operations:
*   - get points of a game
*   - get all the games and their configs
*   - add points to a play in a game
*   - make a new game
*   - update existing games config
*
*/

import {app} from '../index';
import {Request, Response} from "express";
import {getGame, getGames, updateGame} from "./Route/game";
import {getPoints, setPoints} from "./Route/point";
import {getAllThreads, getThread, setThreads} from "./Route/thread";
import {authenticate} from "./Authentication/auth";
export const startServer = () => {
    console.log("Server started")

    app.get("/", authenticate, async (req:Request, res:Response) => {
        res.status(200).send({
            message: "Not a valid URL",
            games: "api/v1/games | ?property=something",
            createOrUpdateGames: "api/v1/games/update?name=something&property=something",
            points: "api/v1/points | ?name=something | ?name=something&userId=something&points=1",
            threads: "api/v1/threads | ?threadId=something | ?threadId=something&points=1",
        })
    })

    app.get("/api/v1/games",authenticate, async (req:Request, res:Response) => {
        if(Object.keys(req.query).length !== 0){
            await getGame(req, res);
        }else{
            await getGames(req, res);
        }
    })
    app.post("/api/v1/games/update", authenticate,async (req:Request, res:Response) =>{
        await updateGame(req, res);
    })

    app.get("/api/v1/points",authenticate, async( req:Request, res:Response) =>{
        const keys = Object.keys(req.query);
        if(keys.length === 1){
           await getPoints(req, res)
        }else if(keys.length === 3){
           await setPoints(req, res)
        }else{
            res.status(400).send({
                message: "No query provided",
                example: {
                    getPoints: "api/v1/points?name=something",
                    setPoints:"api/v1/points?name=something&userId=something&points=1",
                }
            })
        }
    })

    app.get("/api/v1/threads",authenticate, async (req:Request, res:Response) => {
        const lengthOfQuery:number = Object.keys(req.query).length;

        switch (lengthOfQuery){
            case 0:
                await getAllThreads(req, res);
                break;
            case 1:
                await getThread(req, res);
                break;
            case 2:
                await setThreads(req, res);
        }
    })
}
