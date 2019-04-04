/*jshint node: true, esversion: 6 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const uuidv1 = require('uuid/v1');

const app = require('express')();
const port = process.env.PORT || 3000;

let uuids = new Map();
const colors = ['blue', 'yellow', 'red', 'black', 'white', 'green', 'brown', 'purple'];

const createGame = (size, colorCount) => {
    let selectedColors = [];
    for (let i = 0; i < colorCount; i++) {
        selectedColors.push(colors[Math.floor(Math.random()*colors.length)]);
    }

    let gameBoard = [];
    for (let i = 0; i < size; i++) {
        gameBoard.push(selectedColors[Math.floor(Math.random()*colors.length)]);
    }

    return gameBoard;
};

app.use(bodyParser.json());

app.post('/game/new', (_req, res) => {

    let uuid = uuidv1();   
    let game = createGame(_req.body.size, _req.body.colors);

    uuids.set(uuid, game);

    res.json( {
        game: uuid,
        size: _req.body.size,
        colors: _req.body.colors,
        steps: _req.body.steps
    });
  });

app.post('/game/move', (_req, res) => {
    res.json({
        black: 1,
        white: 0
    })
});

app.post('/game/status', (_req, res) => {
    res.json({
        
    })
});

app.listen(port, function () {
    console.log("Serwer nasłuchuje na porcie " + port);
});