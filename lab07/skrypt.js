/* jshint esversion: 6, browser: true, devel: true */
document.addEventListener('DOMContentLoaded', () => {
    //localStorage.clear();

    // Properties.
    const newGameForm = document.getElementById('newGame');
    const newGameButton = document.getElementById('newGameButton');
    const movesContainer = document.getElementById('moves-container');
    const gameStepsContainer = document.getElementById('gameStepsContainer');
    const availableSteps = document.getElementById('availableSteps');
    const backToMenuButton = document.getElementById('backToMenuButton');
    let gameMenu = document.getElementById('gameMenu');
    const colors = new Map();
    let currentColor;
    let currentColorNumber;

    const buildUI = () => {
        movesContainer.style.display = "none";
        gameStepsContainer.style.display = "none";
        backToMenuButton.style.display = "none";
    };

    const buildColors = () => {
        colors.set(1, "#8A2BE2");
        colors.set(2, "#A52A2A");
        colors.set(3, "#DC143C");
        colors.set(4, "#00008B");
    };

    const checkIfGameExists = () => {
        let game = localStorage.getItem("gameId");
        
        if (game !== null) {
            restoreGame();
        }
    }

    const createMoveButton = (movesRow) => {
        let makeMoveButton = document.createElement('button');
        makeMoveButton.setAttribute("class", "moveButton");
        makeMoveButton.innerHTML = "Ruch";
        
        // Make move click.
        makeMoveButton.addEventListener('click', makeMoveClick);
        movesRow.appendChild(makeMoveButton);
    };

    const makeMoveClick = () => {
            let move = [];
            let currentMoveBrackets = movesContainer.lastChild;
            let makeMoveButton = currentMoveBrackets.lastChild;
            currentMoveBrackets.removeChild(makeMoveButton);
            let moveRow = Array.from(currentMoveBrackets.childNodes);

            moveRow.forEach((item) => {
                let currentColorNumber = item.getAttribute("data-colornumber");
                move.push(parseInt(currentColorNumber));
            });   

            makeMoveRequest(move);        
};

    const restoreGame = () => {
        newGameGUI();

        let movesHistory = JSON.parse(localStorage.getItem("movesHistory"));
        console.log(movesHistory);
        let currentGameSize = localStorage.getItem("gameSize");

        if (movesHistory.length === 0) {
            newMoveRow();
            return;
        }
        
        movesHistory.forEach((item) => {

            let movesRow = document.createElement('div');
            movesRow.setAttribute("class", "row");

            for (let i = 0; i < currentGameSize; i++) {
                let moveBracket = document.createElement('div');
                moveBracket.setAttribute("class", "colorMove");
                moveBracket.style.backgroundColor = colors.get(item.move[i]);

                moveBracket.addEventListener('click', function (event) {
                    event.target.style.backgroundColor = currentColor;
                    moveBracket.setAttribute("data-colorNumber", currentColorNumber);
                });
                
                movesRow.appendChild(moveBracket);
            }

            movesContainer.appendChild(movesRow);
            setResultsGUI(item.whiteScore, item.blackScore);
        });

        newMoveRow();
    }

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
                localStorage.setItem('gameSize', parseInt(newGame.size));
                localStorage.setItem('gameColors', parseInt(newGame.colors));
                localStorage.setItem('gameSteps', parseInt(newGame.steps));
                createNewGame();
                }
                else {
                    alert(this.responseText);
            }
        };

        localStorage.setItem("moves", new Map());
    });

    const createNewGame = () => {
        let movesHistory = [];
        localStorage.setItem("movesHistory", JSON.stringify(movesHistory));

        newGameGUI();
        newMoveRow();
    };

    const newGameGUI = () => {
        newGameForm.style.display = "none";
        newGameButton.style.display = "none";
        movesContainer.style.display = "flex";
        gameStepsContainer.style.display = "flex";
        backToMenuButton.style.display = "flex";

        backToMenuButton.addEventListener('click', endGame);

        availableSteps.innerHTML = localStorage.getItem("gameSteps");

        buildColors();
        buildColorsBrackets();
    }

    const buildColorsBrackets = () => {
        let currentGameColors = localStorage.getItem('gameColors');

        for (let i = 1; i <= currentGameColors; i++) {
            let colorBracket = document.createElement('div');
            colorBracket.style.backgroundColor = colors.get(i);
            colorBracket.setAttribute("data-colorNumber", i);
            colorBracket.setAttribute("class", "colorMenu");
            colorBracket.addEventListener('click', function (event) {
                currentColor = event.target.style.backgroundColor;
                currentColorNumber = event.target.getAttribute("data-colorNumber");
            });

            gameMenu.appendChild(colorBracket);
        }
    };

    const newMoveRow = () => {
        let currentGameSize = localStorage.getItem('gameSize');
        let movesRow = document.createElement('div');
        movesRow.setAttribute("class", "row");

        for (let i = 0; i < currentGameSize; i++) {
            let moveBracket = document.createElement('div');
            moveBracket.setAttribute("class", "colorMove");
            moveBracket.addEventListener('click', function (event) {
                event.target.style.backgroundColor = currentColor;
                moveBracket.setAttribute("data-colorNumber", currentColorNumber);
            });
            
            movesRow.appendChild(moveBracket);
        }

        movesContainer.appendChild(movesRow);

        createMoveButton(movesRow);
    };

    const makeMoveRequest = (move) => {
        let request = new XMLHttpRequest();

        let requestData = {
            game: localStorage.getItem("gameId"),
            move: move
        };

        request.open('POST', 'http://localhost:3000/game/move', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(requestData));
        request.onload = function () {

            if (this.status === 200) {
                let moveResult = JSON.parse(this.responseText);

                let whiteScore = parseInt(moveResult.white);
                let blackScore = parseInt(moveResult.black);

                applyMoveResult(whiteScore, blackScore);
                addMoveToHistory(move, whiteScore, blackScore);

                }
                else {
                    alert(this.responseText);
            };
        };
    };

    const addMoveToHistory = (move, whiteScore, blackScore) => {
        moveElement = {
            move: move,
            whiteScore: whiteScore,
            blackScore: blackScore
        };

        console.log(moveElement);

        let movesHistory = JSON.parse(localStorage.getItem("movesHistory"));
        console.log(movesHistory);
        movesHistory.push(moveElement);
        localStorage.setItem("movesHistory", JSON.stringify(movesHistory));
    };

    const applyMoveResult = (whiteScore, blackScore) => {
        let gameSize = parseInt(localStorage.getItem('gameSize'));

        if (blackScore === gameSize) {
            endGame(true);
            return;
        }

        let gameSteps = localStorage.getItem("gameSteps");
        gameSteps -= 1;
        localStorage.setItem("gameSteps", gameSteps);
        availableSteps.innerHTML = gameSteps;

        if (gameSteps === 0) {
            endGame(false);
            return;
        }

        setResultsGUI(whiteScore, blackScore);
        newMoveRow();
    };

    const setResultsGUI = (whiteScore, blackScore) => {
        let lastMoveRow = movesContainer.lastChild;
        console.log(movesContainer);
        if (whiteScore > 0) {
            for (let i = 0; i < whiteScore; i++) {
                let whiteResult = document.createElement('div');
                whiteResult.setAttribute("class", "resultDiv");
                lastMoveRow.appendChild(whiteResult);
            };
        }

        if (blackScore > 0) {
            for (let i = 0; i < blackScore; i++) {
                let blackResult = document.createElement('div');
                blackResult.setAttribute("class", "resultDiv");
                blackResult.style.backgroundColor = "black";
                lastMoveRow.appendChild(blackResult);
            };
        }
    };

    const endGame = (win) => {

        if (win === true) {
            alert("Wygrałeś!");
        }
        
        if (win === false) {
            alert("Koniec ruchów! Przegrałeś! Spróbuj ponownie.")
        }

        removeChildElements(movesContainer);
        removeChildElements(gameMenu);

        movesContainer.style.display = "none";
        newGameForm.style.display = "inline-block";
        newGameButton.style.display = "inline-block";

        localStorage.clear();
    };

    const removeChildElements = (node) => {

        while(node.firstChild) {
            node.removeChild(node.firstChild);
        };
    }

    // On-launch.
    buildUI();
    checkIfGameExists();

});