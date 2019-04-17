/*jshint node: true, esversion: 6 */
'use strict';

const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const uuidv1 = require('uuid/v1');

const app = require('express')();
const port = process.env.PORT || 3000;

let games = new Map();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/game/new', (_req, res) => {
    let uuid = uuidv1();   
    let game = {
        "solved": false,
        "board": createGame(_req.body.size, _req.body.colors),
        "steps": _req.body.steps
    }

    games.set(uuid, game);

    res.status(200).json( {
        game: uuid,
        size: _req.body.size,
        colors: _req.body.colors,
        steps: _req.body.steps
    });
  });


app.post('/game/move', (_req, res) => {
    let uuid = _req.body.game;
    let move = _req.body.move;

    let currentGame = games.get(uuid);

    let moveResult = moveRating(moveToMap(currentGame.board), moveToMap(move));

    if (moveResult.black === currentGame.board.size) {
        currentGame.solved = true;
    }
    else {
        currentGame.steps -= 1;
    }

    res.json({
        board: currentGame.board,
        black: moveResult.black,
        white: moveResult.white
    })
});

app.post('/game/status', (_req, res) => {
    let uuid = _req.body.game;
    let currentGame = games.get(uuid);

    res.json({
        game: uuid,
        solved: currentGame.solved
    })
});

app.listen(port, function () {
    console.log("Serwer nasłuchuje na porcie " + port);
});

const createGame = (size, colorCount) => {
    let gameBoard = [];

    for (let i = 0; i < size; i++) {
        gameBoard.push(Math.floor(Math.random() * colorCount) + 1);
    }

    return gameBoard;
};

const moveRating = (kod, ruch)  => {
    let result = {
        black: 0,
        white: 0
    }

    kod.forEach( (value, index) => { 
        let ruchSet = ruch.get(index);
        
        if (ruchSet !== undefined) {
            let intersectionBlack = new Set([...value].filter(x => ruchSet.has(x)));
            result.black += intersectionBlack.size;

            let differenceKod = new Set([...value].filter(x => !intersectionBlack.has(x)));
            let differenceRuch = new Set([...ruchSet].filter(x => !intersectionBlack.has(x)));
            result.white += Math.min(differenceKod.size, differenceRuch.size);
        
        }
    } );

    return result;
}

const moveToMap = (tab) => {
    let map = new Map();
    tab.forEach((element, key) => {
        if (!map.has(element)) {
            map.set(element, new Set());         
        }

        map.get(element).add(key);
    });

    return map;
}