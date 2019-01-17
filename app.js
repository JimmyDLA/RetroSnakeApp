window.addEventListener("load", function() {
    console.log("JS running")
//   medium()
});

console.log("JS is running");

//global variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
let page = 1;
let level;
let dir;
let eat;
let trun;
let wall;
let gameMusic;
let overMusic;


document.activeElement.addEventListener('keydown', direction);

function direction(e) {
    console.log("direction = "+e.key);
    if ((page == 3 && e.key == "ArrowLeft")  && dir != "RIGHT") {
        dir = "LEFT";
        turn.play();

    } else if ((page == 3 && e.key == "ArrowUp") && dir != "DOWN") {
        dir = "UP";
        turn.play();

    } else if ((page == 3 && e.key == "ArrowRight") && dir != "LEFT") {
        dir = "RIGHT";
        turn.play();

    } else if ((page == 3 && e.key == "ArrowDown") && dir != "UP") {
        dir = "DOWN";
        turn.play();

    } else if ( e.key == "Enter" && page == 1) {
        //next page to instruction
        showInstruction();

    } else if ( e.key == "Enter" && page == 4) {
        //restart game
        restart();
    } else if (e.key == "1" && page == 2) {
        // select level ...
        console.log("game set to easy")
        easy();

    } else if (e.key == "2" && page == 2) {
        // select level ...
        medium();

    } else if (e.key == "3" && page == 2) {
        // select level ...
        hard();

    } else if (e.key == "4" && page == 2) {
        // select level ...
        pro();

    }

}


function game() {
    console.log("RUN GAME!");
    //add new image
    let ground = new Image();
    let egg = new Image();
    ground.src = "./public/checker board.png";
    egg.src = "./public/egg.png";

    //add new audio
    eat = new Audio();
    eat.src =  "./public/audio/eat.mp3";
    eat.volume = 0.1;
    console.log("eat audio:" , eat);
    console.log("eat audio:" + JSON.stringify(eat));

    turn = new Audio();
    turn.src =  "./public/audio/turn.mp3";
    turn.volume = 0.1;

    wall = new Audio();
    wall.src =  "./public/audio/wall.mp3";

    overMusic = new Audio();
    overMusic.src =  "./public/audio/over.mp3";

    gameMusic = new Audio();
    gameMusic.src =  "./public/audio/game_music.mp3";
    gameMusic.loop = true;
    gameMusic.volume = 1;

    const scoreText = document.getElementById('score');
    let box = 13;
    let score = 0;
    let snake = [];
    let food = {
        x: Math.floor(Math.random() * 16) * box,
        y: Math.floor(Math.random() * 16) * box
    }

    //where snake start
    snake[0] = { x: 8 * box, y: 9 * box };


    function collision(head, arr) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (head.x == element.x && head.y == element.y) {
                return true
            }
        }
        return false
    }

    function gameover() {
        let gameoverAlert = document.getElementById("gameoverCont");
        gameoverAlert.style.display = "block";
        overMusic.play();
    }

    function draw() {
        gameMusic.play();
        console.log("draw");

        // ctx.drawImage(src, x, y, width, height);
        ctx.drawImage(ground, 0, 0, box * 16, box * 16);

        for (i = 0; i < snake.length; i++) {
            //draw head of snake
            if (i == 0) {
                // the triangle
                ctx.beginPath();

                if (dir == undefined) {
                    ctx.moveTo(snake[i].x + (box / 2), snake[i].y);
                    ctx.lineTo(snake[i].x, snake[i].y + box);
                    ctx.lineTo(snake[i].x + box, snake[i].y + box);
                    ctx.closePath();
                }

                //turn head UP
                if (dir == "UP") {
                    ctx.moveTo(snake[i].x + (box / 2), snake[i].y);
                    ctx.lineTo(snake[i].x, snake[i].y + box);
                    ctx.lineTo(snake[i].x + box, snake[i].y + box);
                    ctx.closePath();
                }

                //turn head LEFT
                if (dir == "LEFT") {
                    ctx.moveTo(snake[i].x + box, snake[i].y);
                    ctx.lineTo(snake[i].x + box, snake[i].y + box);
                    ctx.lineTo(snake[i].x, snake[i].y + (box / 2));
                    ctx.closePath();
                }

                //turn head RIGHT
                if (dir == "RIGHT") {
                    ctx.moveTo(snake[i].x, snake[i].y);
                    ctx.lineTo(snake[i].x, snake[i].y + box);
                    ctx.lineTo(snake[i].x + box, snake[i].y + (box / 2));
                    ctx.closePath();
                }
                //turn head DOWN
                if (dir == "DOWN") {
                    ctx.moveTo(snake[i].x, snake[i].y);
                    ctx.lineTo(snake[i].x + box, snake[i].y);
                    ctx.lineTo(snake[i].x + (box / 2), snake[i].y + box);
                    ctx.closePath();
                }

                // the outline
                ctx.strokeStyle = '#666666';
                ctx.stroke();

                // the fill color
                ctx.fillStyle = "rgba(48,52,105, 0.8)";
                ctx.fill();
            } else {
                // draw snake body
                ctx.fillStyle = "rgba(249, 202, 36,1.0)";
                ctx.strokeStyle = "white";
                ctx.lineWidth = 3;
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
        }
        ctx.drawImage(egg, food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (dir == "RIGHT") snakeX += box;
        if (dir == "LEFT") snakeX -= box;
        if (dir == "UP") snakeY -= box;
        if (dir == "DOWN") snakeY += box;

        // if snake head has same X,Y position as food, SCORE++
        if (snakeX == food.x && snakeY == food.y) {
            eat.play();
            score++;
            scoreText.innerHTML = "SCORE: " + score;

            food = {
                x: Math.floor(Math.random() * 16) * box,
                y: Math.floor(Math.random() * 16) * box
            }

        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        // collision detection
        if (snakeX < 0 || snakeX > box * 15 || snakeY < 0 || snakeY > box * 15 || collision(newHead, snake)) {
            wall.play();
            gameMusic.pause();
            console.log("GAME OVER!");
            page = 4;

            clearInterval(startGame);
            setTimeout(() => {
                gameover();
            }, 500);
            return;
        }

        snake.unshift(newHead);
    }

    console.log("level = "+level)
    let startGame = setInterval(draw, level);

}

function restart(){
    score = 0;
    dir = null;

    // //where snake start
    // snake[0] = { x: 8 * box, y: 9 * box };

    const scoreText = document.getElementById('score');
    scoreText.innerHTML = "SCORE: " + score;
    //remove gameover
    let gameoverAlert = document.getElementById("gameoverCont");
    gameoverAlert.style.display = "none";
    //remove gameCont
    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.style.display = "none";
    showInstruction()
}


function showInstruction(){
    let body = document.querySelector("body");
    body.style.backgroundColor = "white"
    //hide landing page
    let firstPage = document.getElementById("firstPageContainer");
    firstPage.style.display = "none";

    // show instructionCont
    let instructionCont = document.getElementById("instructionCont");
    instructionCont.style.display = "flex";

    //keep track of page
    page = 2;

}

function showGame() {
    //hide instructionCont
    let instructionCont = document.getElementById("instructionCont");
    instructionCont.style.display = "none";

    //show gameContainer
    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.style.display = "flex";

    //show canvas
    canvas.style.display = "block";

    //change body background-color
    let body = document.querySelector("body");
    body.style.backgroundColor = "rgb(45, 73, 24)";
    page = 3;

    game();
}

function easy() {
    level = 450;
    console.log("clicked easy");
    showGame();
}
function medium() {
    level = 400;
    console.log("clicked medium");
    showGame();
}
function hard() {
    level = 350;
    console.log("clicked hard");
    showGame();
}
function pro() {
    level = 300;
    console.log("clicked pro");
    showGame();
}
