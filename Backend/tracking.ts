import http from 'http';
import path from 'path';
import express, { Request, Response } from 'express';
import fs from 'fs'
import { IPlayer } from './IPlayer';
import { IGame } from './IGame';
import { IMappedGame } from './IMappedGame';
import { IPlayerInfo } from './IPlayerInfo';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

// PLAYERS API REQUESTS

const playersPath = path.join(__dirname, 'Players.json');
let playersList: IPlayer[] = [];

fs.readFile(playersPath, (err: any, data:any) => {
    if (err) {
        console.error('unable to find file: ' + playersPath);
    } else {
        playersList = JSON.parse(data) as IPlayer[];
    }
});


const port = process.env.PORT || 3000;

//Create a GET endpoint that will return all of the contacts as JSON.
app.get('/players', (req: Request, res: Response) => {
    res.status(200)
    return res.json(playersList)

});

// Create another GET endpoint that takes in an id as a parameter and returns the contact matching that id.  
app.get('/players/:id', (req: Request, res: Response) => {
    if(req.params.id){
        const player = playersList.find(c => c.id.toString() === req.params.id)
        if(player){
            res.status(200);
            return res.json(player);
        }
        res.status(200);
        return res.json({error: `Player with id: ${req.params.id} not found`})    }
});

// Create a POST endpoint that adds a new player to your list.  You can parse the data from the request body and add to your list.
app.post('/players', (req: Request, res: Response) => {
    const newData = req.body;
    playersList.push(newData);
    return res.sendStatus(200);
});

// Create a PUT endpoint that modifies an existing player on the list.
app.put('/players/:id', (req: Request, res: Response) => {
    //modify an existing player on the list
    const player = playersList.find(c => c.id.toString() === req.params.id)
    if(player){
        if(req.body.name){
            player.name = req.body.name;
        }  
        res.status(200);
        return res.json(player);
    }
});

// Create a DELETE endpoint that removes a player from the list.
app.delete('/players/:id', (req: Request, res: Response) => {
    //delete 
    const player = playersList.find(c => c.id.toString() === req.params.id)

    if(player){
        playersList.splice(playersList.indexOf(player), 1)
    }
    res.status(200);
    return res.json(playersList)

})

// GAMES API REQUESTS


const gamesPath = path.join(__dirname, 'Games.json');
let gamesList: IGame[] = [];

fs.readFile(gamesPath, (err: any, data:any) => {
    if (err) {
        console.error('unable to find file: ' + gamesPath);
    } else {
        gamesList = JSON.parse(data) as IGame[];
    }
});



//Create a GET endpoint that will return all of the games as JSON.
app.get('/games', (req: Request, res: Response) => {
    res.status(200)
    return res.json(gamesList)

});

// Create another GET endpoint that takes in an id as a parameter and returns the games matching that id.  
app.get('/games/:id', (req: Request, res: Response) => {
    if(req.params.id){
        const game = gamesList.find(c => c.id.toString() === req.params.id)
        if(game){
            res.status(200);
            return res.json(game);
        }
        res.status(200);
        return res.json({error: `Game with id: ${req.params.id} not found`})    }
});

// Create a POST endpoint that adds a new game to your list.  You can parse the data from the request body and add to your list.
app.post('/games', (req: Request, res: Response) => {
    const nextId = gamesList.length > 0 ? Math.max(...gamesList.map(g => g.id)) + 1 : 1;
    const newGame: IGame = { id: nextId, ...req.body };
    gamesList.push(newGame);

    return res.json(newGame);
});

// Create a PUT endpoint that modifies an existing game on the list.
app.put('/games/:id', (req: Request, res: Response) => {
    //modify an existing game on the list
    const game = gamesList.find(c => c.id.toString() === req.params.id)
    if(game){
        if(req.body.player1Id){
            game.player1Id = req.body.player1Id;
        }
        if(req.body.player2Id){
            game.player2Id = req.body.player2Id;
        }
        if(req.body.winnerId){
            game.winnerId = req.body.winnerId;
        }
        res.status(200);
        return res.json(game);
    }
});

// Create a DELETE endpoint that removes a game from the list.
app.delete('/games/:id', (req: Request, res: Response) => {
    //delete 
    const game = gamesList.find(c => c.id.toString() === req.params.id)

    if(game){
        gamesList.splice(gamesList.indexOf(game), 1)
    }
    res.status(200);
    return res.json(gamesList)

})


// Create a GET endpoint that returns stats for a specific player
app.get('/players/:id/info', (req: Request, res: Response) => {
    const player = playersList.find(p => p.id.toString() === req.params.id);
    if (!player) {
        res.status(404);
        return res.json({ error: `Player with id: ${req.params.id} not found` });
    }

    const gamesPlayed = gamesList.filter(g => g.player1Id === player.id || g.player2Id === player.id);
    const wins = gamesPlayed.filter(g => g.winnerId === player.id).length;
    const losses = gamesPlayed.length - wins;

    const playerInfo: IPlayerInfo = {
        id: player.id,
        name: player.name,
        gamesPlayed: gamesPlayed.length,
        wins,
        losses
    };

    res.status(200);
    return res.json(playerInfo);
});

// Create a GET endpoint that returns games with player names mapped in
app.get('/mapped-games', (req: Request, res: Response) => {
    const mappedGames: IMappedGame[] = gamesList.map(game => {
        const player1 = playersList.find(p => p.id === game.player1Id);
        const player2 = playersList.find(p => p.id === game.player2Id);
        const winner = playersList.find(p => p.id === game.winnerId);
        return {
            id: game.id,
            player1: player1 ? player1.name : 'Unknown',
            player2: player2 ? player2.name : 'Unknown',
            winner: winner ? winner.name : 'Unknown'
        };
    });
    res.status(200);
    return res.json(mappedGames);
});


app.listen(port, () => {
    console.log(`Running on port ${port}`);
})



