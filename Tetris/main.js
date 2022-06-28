document.addEventListener('DOMContentLoaded', () => {
    var BOARDWIDTH = 10;
    var BOARDHEIGHT = 20;
    var BOARDSIZE = BOARDWIDTH * BOARDHEIGHT;

    var NEXTWIDTH = 10;
    var NEXTHEIGHT = 5;
    var NEXTSIZE = NEXTWIDTH*NEXTHEIGHT;

    var FIGURES = [
        {
            cells: [0, BOARDWIDTH, BOARDWIDTH*2, BOARDWIDTH*2+1],
            width: 3,
            color: 'lFigure',
        },
        {
            cells: [1, BOARDWIDTH+1, BOARDWIDTH*2, BOARDWIDTH*2+1],
            width: 3,
            color: 'jFigure',
        },
        {
            cells: [0, 1, BOARDWIDTH+1, BOARDWIDTH+2],
            width: 3,
            color: 'zFigure',
        },
        {
            cells: [1, 2, BOARDWIDTH, BOARDWIDTH+1],
            width: 3,
            color: 'sFigure'
        },
        {
            cells: [1, BOARDWIDTH, BOARDWIDTH+1, BOARDWIDTH*2+1],
            width: 3,
            color: 'tFigure'
        },
        {
            cells: [0, 1, BOARDWIDTH, BOARDWIDTH+1],
            width: 2,
            color: 'oFigure',
        },
        {
            cells: [1, BOARDWIDTH+1, BOARDWIDTH*2+1, BOARDWIDTH*3+1],
            width: 4,
            color: 'iFigure',
        },
        {
            cells: [0, 1, BOARDWIDTH],
            width: 2,
            color: 'gFigure',
        },
        {
            cells: [0, 1, BOARDWIDTH, BOARDWIDTH+1, BOARDWIDTH*2],
            width: 3,
            color: 'pFigure',
        },
        {
            cells: [1, BOARDWIDTH, BOARDWIDTH+1, BOARDWIDTH+2, BOARDWIDTH*2+1, BOARDWIDTH*3+1],
            width: 4,
            color: 'plusFigure',
        }
    ]

    var RECORDS = [
        {
            name: 'someone 1',
            score: 100,
        },
        {
            name: 'someone 2',
            score: 50,
        },
        {
            name: 'someone 3',
            score: 10,
        },
    ]

    var gameFinished = false;
    var gamePaused = false;
    var gameInFocus = false;
    var stepTimer;

    var boardElement = document.getElementById('board');
    var nextElement = document.getElementById('next');
    boardElement.style.width = 30*BOARDWIDTH+'px';
    boardElement.style.height = 30*BOARDHEIGHT+'px';

    var gameBoard = {
        cells: [],
        finishedLines: 0,
        score: 0,
        stepDelay: 1000,
        currentFigure: null,
        currentFigureWidth: 0,
        currentColor: '',
        currentPosition: 0,
        nextPosition: 0,
    };
    //следующая фигура в очереди
    var gameNext = {
        cells: [],
        currentFigure: null,
        currentFigureWidth: 0,
        currentColor: '',
        currentPosition: 11,
    }
    //вторая фигура в очереди
    var nextFigure = {
        cells: [],
        currentFigure: null,
        currentFigureWidth: 0,
        currentColor: '',
        currentPosition: 16,
    }

    // Вывод текстовых полей с состоянием игры
    var scoreElement = document.getElementById('score');
    var linesElement = document.getElementById('lines');
    function renderCounters() {
        scoreElement.innerHTML = 'Счет игры: '+gameBoard.score;
        linesElement.innerHTML = 'Собрано линий: '+gameBoard.finishedLines;
    }

    //таблица рекордов
    function recordsTable () {
        var recEl = document.getElementById('records');
        recEl.innerHTML='<h4>Таблица рекордов</h4>';
        for (i=0; i<3; i++) {
           var recBlock = document.createElement('div');
           recBlock.id = 'block_'+i;
           recBlock.innerHTML=RECORDS[i].name+" ............ "+RECORDS[i].score+" очков." 
           recEl.appendChild(recBlock);
        }
    }
    // Функция завершения игры
    function gameOver() {
        console.log('Взрыв! Вы проиграли!');
        boardElement.style.borderColor = 'red';
        var name = prompt("Спасибо за игру. Введите, пожалуйста, Ваше имя для нашей таблицы рекордов.")
        for (i=RECORDS.length-1; i>=0; i--) {
            if (i==0){
                RECORDS.unshift({name: name, score:gameBoard.score,},)
            } else if (gameBoard.score>RECORDS[i].score && gameBoard.score<RECORDS[i-1].score ){
                RECORDS.splice(i, 0, {name: name, score:gameBoard.score})
            } else if (gameBoard.score<RECORDS[i].score) {
                break;
            }
        }
        recordsTable()
        gameFinished = true;
    }

    function pauseHandler() {
        if (gamePaused) {
            if (gameFinished) {
                gameFinished = false;
                initBoard();
            }
            stepTimer = setTimeout(gameStep, gameBoard.stepDelay, true);
            boardElement.style.borderColor = '#dcd6bc';
            console.log('Игра возобновлена');
            gameBoard.cells.forEach((cell) => cell.element.className = cell.haveBlock?cell.color:'closed');
            drawFigure(gameBoard);
            gamePaused = false;
        } else {
            clearTimeout(stepTimer);
            boardElement.style.borderColor = 'green';
            gameBoard.cells.forEach((cell) => cell.element.className = 'closed');
            console.log('Игра на паузе')
            gamePaused = true;
        }
    }

    function undrawFigure(arg) {
        if (arg.currentFigure) {
            arg.currentFigure.forEach((cellPos) => {
                arg.cells[arg.currentPosition+cellPos].element.className = 'closed';
            });
        }
    }
    
    function drawFigure(arg) {
        if (arg.currentFigure) {
            arg.currentFigure.forEach((cellPos) => {
                arg.cells[arg.currentPosition+cellPos].element.className = arg.currentColor;
            });
        }
    }

    function canMove(newPosition) {
        var result = true;
        var maxXOld = -1, maxXNew = -1;
        var minXOld = BOARDWIDTH, minXNew = BOARDWIDTH;
        gameBoard.currentFigure.forEach((cellPos) => {
            if (newPosition+cellPos<0 || newPosition+cellPos>=BOARDSIZE) {
                result = false;
            } else if (gameBoard.cells[newPosition+cellPos].haveBlock) {
                result = false;
            }
            minXOld = Math.min(minXOld, (gameBoard.currentPosition+cellPos)%BOARDWIDTH);
            minXNew = Math.min(minXNew, (newPosition+cellPos)%BOARDWIDTH);
            maxXOld = Math.max(maxXOld, (gameBoard.currentPosition+cellPos)%BOARDWIDTH);
            maxXNew = Math.max(maxXNew, (newPosition+cellPos)%BOARDWIDTH);
        });
        if (Math.abs(minXOld-minXNew)>1 ||
            Math.abs(maxXOld-maxXNew)>1 ||
            Math.abs(maxXNew-minXNew)>4) {
            result = false;
        }
        return result;
    }

    function getFullLines() {
        var result = [];

        for (var i=0; i<BOARDHEIGHT; i++) {
            var lineEmpty = true;
            for (var j=0; j<BOARDWIDTH; j++) {
                if (!gameBoard.cells[i*BOARDWIDTH+j].haveBlock) {
                    lineEmpty = false;
                }
            }
            if (lineEmpty) {
                result.push(i);
            }
        }
        return result;
    }

    function gameStep(isDown) {
        clearTimeout(stepTimer);
        if (canMove(gameBoard.nextPosition)) {
            undrawFigure(gameBoard);
            gameBoard.currentPosition = gameBoard.nextPosition;
            gameBoard.nextPosition += BOARDWIDTH;
            drawFigure(gameBoard);
        } else if (isDown) {
            // Фиксация фигуры и запуск следующей
            gameBoard.currentFigure.forEach((cellPos) => {
                gameBoard.cells[gameBoard.currentPosition+cellPos].haveBlock = true;
                gameBoard.cells[gameBoard.currentPosition+cellPos].color = gameBoard.currentColor;
            })
            gameBoard.score += gameBoard.currentFigure.length;
            var fullLines = getFullLines();
            fullLines.forEach((line) => {
                for (var i = line*BOARDWIDTH-1; i>=0; i--) {
                    gameBoard.cells[i+BOARDWIDTH].haveBlock = gameBoard.cells[i].haveBlock;
                    gameBoard.cells[i+BOARDWIDTH].color = gameBoard.cells[i].color;
                    gameBoard.cells[i+BOARDWIDTH].element.className = gameBoard.cells[i].color;
                }
            })
            for (var i = 0; i<fullLines.length*BOARDWIDTH; i++) {
                gameBoard.cells[i].haveBlock = false;
                gameBoard.cells[i].color = '';
                gameBoard.cells[i].element.className = 'closed';
            }
            if (fullLines.length>0) {
                gameBoard.score += Math.pow(2, fullLines.length-1)*10;
            }
            gameBoard.finishedLines += fullLines.length;
            renderCounters();
            gameBoard.stepDelay = Math.max(100, 1000-10*gameBoard.finishedLines);
            setNewFigure();
            if (!canMove(gameBoard.currentPosition)) {
                gameOver(false);
            }
        }
        if (!gameFinished) {
            stepTimer = setTimeout(gameStep, gameBoard.stepDelay, true);
        }
    }

    function moveFigure(position, isDown) {
        if (canMove(position)) {
            gameBoard.nextPosition = position;
            gameStep(isDown);
        }
    }

    function rotateFigure() {
        var oldFigure = gameBoard.currentFigure;

        undrawFigure(gameBoard);
        gameBoard.nextPosition = gameBoard.currentPosition;
        gameBoard.currentFigure = gameBoard.currentFigure.map((cellPos) => {
            var x = cellPos%BOARDWIDTH;
            var y = Math.floor(cellPos/BOARDWIDTH);

            return x*BOARDWIDTH + gameBoard.currentFigureWidth-1-y;
        })
        if (!canMove(gameBoard.currentPosition)) {
            gameBoard.currentFigure = oldFigure;
        }
        gameStep();
    }

    function keyHandler(event) {
        if (gameInFocus) {
            // console.log(event.key, event.code);
            switch (event.code) {
                case 'ArrowLeft':
                    moveFigure(gameBoard.currentPosition-1);
                    event.preventDefault();
                    break;
                case 'ArrowRight':
                    moveFigure(gameBoard.currentPosition+1);
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    rotateFigure();
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    moveFigure(gameBoard.currentPosition+BOARDWIDTH, true);
                    event.preventDefault();
                    break;
                case 'KeyP':
                    pauseHandler();
                    event.preventDefault();
                    break;
            }
        }
    }
    function setNextFigure () {
        nextFigure.currentFigureNumber = Math.floor(Math.random()*FIGURES.length);
        nextFigure.currentFigure = FIGURES[nextFigure.currentFigureNumber].cells;
        nextFigure.currentColor = FIGURES[nextFigure.currentFigureNumber].color;
        nextFigure.currentFigureWidth = FIGURES[nextFigure.currentFigureNumber].width;
    }
    function changeFigure(){
        gameNext.currentFigure = nextFigure.currentFigure
        gameNext.currentColor = nextFigure.currentColor
        gameNext.currentFigureWidth = nextFigure.currentFigureWidth
    }
    function setNewFigure() {
        if (nextFigure.currentFigure==null){
            nextFigure.cells = gameNext.cells;
            setNextFigure();
            changeFigure();
            setNewFigure();
        } else {
            undrawFigure(gameNext);
            undrawFigure(nextFigure);
            gameBoard.currentFigure = gameNext.currentFigure
            gameBoard.currentColor = gameNext.currentColor
            gameBoard.currentFigureWidth = gameNext.currentFigureWidth
            gameBoard.currentPosition = 4;
            gameBoard.nextPosition = gameBoard.currentPosition;
            changeFigure();
            setNextFigure();
            drawFigure(gameNext);
            drawFigure(nextFigure);
        }
    }
    function createBoard (arg, Arg, ARG){
        arg.innerHTML = '';
        Arg.cells = []
        for (var i = 0; i < ARG; i++) {
            const cell = document.createElement('div');
            cell.className = 'closed';
            arg.appendChild(cell);
            Arg.cells[i] = { element: cell, index: i, haveBlock: false, color: '' };
        }
    }
    function initBoard() {
        createBoard (boardElement, gameBoard, BOARDSIZE);
        createBoard (nextElement, gameNext, NEXTSIZE);
        

        boardElement.addEventListener('click', pauseHandler);
        document.addEventListener('keydown', keyHandler);
        boardElement.addEventListener('mouseenter', () => gameInFocus = true);
        boardElement.addEventListener('mouseleave', () => gameInFocus = false);

        gameBoard.finishedLines = 0;
        gameBoard.score = 0;
        gameBoard.stepDelay = 1000;
        setNewFigure();
        // Выводим счетчики и таблицу рекордов
        renderCounters();
        recordsTable();
    }

    initBoard();
    pauseHandler();
})