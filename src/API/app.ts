
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
import {getGame, getGames} from "./Route/game";

app.get("/api/v1/games", async (req:Request, res:Response) => {
    const {name} = req.query;

    if(name){
        await getGame(req, res);
    }else{
        await getGames(req, res);
    }
})