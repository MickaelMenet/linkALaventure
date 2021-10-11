const app = {
    board: document.getElementById('board'),
    player: {
        x: 0,
        y: 0,
        direction: 'right',
    },
    targetCell: {
        x: 5,
        y: 3,
    },

    toTheLeft: {
        right: 'up',
        up: 'left',
        left: 'down',
        down: 'right',
    },
    toTheRight: {
        right: 'down',
        down: 'left',
        left: 'up',
        up: 'right',
    },
    gameOver: false,
    nbMoves: 0,
    redrawBoard: () => {
        app.clearBoard();
        app.drawBoard();
    },
    clearBoard: () => {
        board.innerHTML = '';
    },
    drawBoard: () => {
        for (let y = 0; y < 4; y++) {
            const line = document.createElement('div');
            line.className = 'row';
            app.board.appendChild(line);

            for (let x = 0; x < 6; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';

                if (x === app.targetCell.x && y === app.targetCell.y) {
                    cell.classList.add('targetCell');
                }

                if (x === app.player.x && y === app.player.y) {
                    const player = document.createElement('div');
                    player.classList.add('player', `player--${app.player.direction}`);
                    cell.appendChild(player);
                }

                line.appendChild(cell);
            }
        }
        app.isGameOver();
    },
    turnLeft: () => {
        if (app.gameOver === true) {
            return;
        }

        app.nbMoves++;

        app.player.direction = app.toTheLeft[app.player.direction];

        app.redrawBoard();
    },
    turnRight: () => {
        if (app.gameOver === true) {
            return;
        }

        app.nbMoves++;

        app.player.direction = app.toTheRight[app.player.direction];
        app.redrawBoard();
    },

    moveForward: () => {
        if (app.gameOver) {
            return;
        }

        app.nbMoves++;

        switch (app.player.direction) {
            case 'right':
                if (app.player.x < 5) {
                    app.player.x += 1;
                } else {
                    console.log('Player au bord du vide, mouvement impossible');
                }
                break;

            case 'left':
                if (app.player.x > 0) {
                    app.player.x -= 1;
                } else {
                    console.log('Player au bord du vide, mouvement impossible');
                }
                break;

            case 'up':
                if (app.player.y > 0) {
                    app.player.y -= 1;
                } else {
                    console.log('Player au bord du vide, mouvement impossible');
                }
                break;

            case 'down':
                if (app.player.y < 3) {
                    app.player.y += 1;
                } else {
                    console.log('Player au bord du vide, mouvement impossible');
                }
                break;
            default:
                break;
        }

        app.redrawBoard();
    },

    listenKeyboardEvents: () => {
        document.addEventListener('keyup', function (event) {
            switch (event.code) {
                case 'ArrowLeft':
                    app.turnLeft();
                    break;
                case 'ArrowRight':
                    app.turnRight();
                    break;
                case 'ArrowUp':
                    app.moveForward();
                    break;
                default:
                    break;
            }
        });
    },
    isGameOver: () => {
        if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
            app.gameOver = true;
            console.log(`Ayé, j\'ai gagné en ${app.nbMoves} coups !!!`);
        }
    },
    init: () => {
        console.log('init !');
        app.drawBoard();
        app.listenKeyboardEvents();
    },
};

document.addEventListener('DOMContentLoaded', app.init);
