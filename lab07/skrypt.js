/* jshint esversion: 6, browser: true, devel: true */
document.addEventListener('DOMContentLoaded', () => {

    const newGameForm = document.getElementById('newGame');
    const newGameButton = document.getElementById('newGameButton');
    const moveForm = document.getElementById('moveForm');
    let gameMenu = document.getElementById('gameMenu');

    const colors = new Map();
    let currentColor;
    let currentColorNumber;

    const buildUI = () => {
        moveForm.style.display = "none";
    };

    const buildColors = () => {
        colors.set(1, "#8A2BE2");
        colors.set(2, "#A52A2A");
        colors.set(3, "#DC143C");
        colors.set(4, "#00008B");
    };

    buildUI();

    // New game.
    newGameButton.addEventListener('click', (e) => {
        let size = document.getElementById('size').value.trim();
        let colors = document.getElementById('colors').value.trim();
        let steps = document.getElementById('steps').value.trim();

        let requestData = {
            size: parseInt(size),
            colors: parseInt(colors),
            steps: parseInt(steps)
        };

        let request = new XMLHttpRequest();

        request.open('POST', 'http://localhost:3000/game/new', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(requestData));
        request.onload = function () {

            if (this.status === 200) {
                let newGame = JSON.parse(this.responseText)
                localStorage.setItem('gameId', newGame.game);
                localStorage.setItem('gameSize', newGame.size);
                localStorage.setItem('gameColors', newGame.colors);
                localStorage.setItem('gameSteps', newGame.steps);
                createNewGame();
                }
                else {
                    alert(this.responseText);
            }
        };

        localStorage.setItem("moves", new Map());
    });

    const createNewGame = () => {
        newGameForm.style.display = "none";
        newGameButton.style.display = "none";
        moveForm.style.display = "inline-block";

        buildColors();
        buildColorsBrackets();
        newMove();
    };

    const buildColorsBrackets = () => {
        let currentGameColors = localStorage.getItem('gameColors');

        for (let i = 1; i <= currentGameColors; i++) {
            let colorBracket = document.createElement('div');
            colorBracket.style.backgroundColor = colors.get(i);
            colorBracket.setAttribute("data-colorNumber", i);
            colorBracket.addEventListener('click', function (event) {
                currentColor = event.target.style.backgroundColor;
                currentColorNumber = event.target.getAttribute("data-colorNumber");
            });

            gameMenu.appendChild(colorBracket);
        }
    };

    const newMove = () => {
        let move = [];
        let currentGameSize = localStorage.getItem('gameSize');

        for (let i = 0; i < currentGameSize; i++) {
            let moveBracket = document.createElement('div');
            moveBracket.addEventListener('click', function (event) {
                event.target.style.backgroundColor = currentColor;
                moveBracket.setAttribute("data-colorNumber", currentColorNumber);
            });
            
            moveForm.appendChild(moveBracket);
        }

        let makeMoveButton = document.createElement('button');
        makeMoveButton.innerHTML = "Ruch";
        
        makeMoveButton.addEventListener('click', function (event) {
            moveForm.removeChild(makeMoveButton);

            let colorBrackets = Array.from(moveForm.children);
            colorBrackets.forEach((item) => {
                let currentColorNumber = item.getAttribute("data-colorNumber");
                move.push(currentColorNumber);
            });

            makeMoveRequest(move);
            
        });

        moveForm.appendChild(makeMoveButton);
    };

    const makeMoveRequest = (move) => {
        let movesMap = localStorage.getItem("moves");

        let request = new XMLHttpRequest();

        let requestData = {
            game: localStorage.getItem("gameId"),
            move: move
        };

        console.log(move);

        request.open('POST', 'http://localhost:3000/game/move', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(requestData));
        request.onload = function () {

            if (this.status === 200) {
                let moveResult = JSON.parse(this.responseText);

                let whiteScore = moveResult.white;
                let blackScore = moveResult.black;

                console.log(whiteScore);
                console.log(blackScore);
                console.log(moveResult.board);

                }
                else {
                    alert(this.responseText);
            }
        };
    }
});