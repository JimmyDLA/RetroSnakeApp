window.addEventListener("load", function() {
    console.log("JS running")
  medium()
});

console.log("JS is running");

//global variables
const canvas = document.getElementById('canvas');
const scoreText = document.getElementById('score');
const ctx = canvas.getContext("2d");

//add new image
let ground = new Image();
let egg = new Image();
ground.src = "./public/checker board.png";
egg.src = "./public/egg.png";

//add new audio
// let audio = new Audio();
// audio.src =  "./path"

let box = 13;
let score = 0;
let snake = [];
let dir;
let level;
let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

//where snake start
snake[0] = { x: 8 * box, y: 9 * box };

document.activeElement.addEventListener('keydown', direction);
document.addEventListener("keydown", direction);

function direction(e) {
    console.log("direction = "+e.key);
    if ((e.keyCode == 37 || e.key == "ArrowLeft")  && dir != "RIGHT") {
        dir = "LEFT";

    } else if ((e.keyCode == 38 || e.key == "ArrowUp") && dir != "DOWN") {
        dir = "UP";
        
    } else if ((e.keyCode == 39 || e.key == "ArrowRight") && dir != "LEFT") {
        dir = "RIGHT";

    } else if ((e.keyCode == 40 || e.key == "ArrowDown") && dir != "UP") {
        dir = "DOWN";

    } else if ((e.keyCode == 40 || e.key == "ArrowDown") && dir != "UP") {
        dir = "DOWN";

    } else if ((e.keyCode == 40 || e.key == "ArrowDown") && dir != "UP") {
        dir = "DOWN";

    }else if ((e.keyCode == 40 || e.key == "ArrowDown") && dir != "UP") {
        dir = "DOWN";

    }
    
}


function game() {
    console.log(document.activeElement);


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
    }

    function draw() {
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

        // if snake head has same X,Y as food, POINT++ 
        if (snakeX == food.x && snakeY == food.y) {
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
            console.log("GAME OVER!");

            clearInterval(startGame);
            setTimeout(() => {
                gameover();
            }, 500);
        }

        snake.unshift(newHead);
    }

    console.log(level)
    let startGame = setInterval(draw, level);

}

function restart() {
    console.log("refresh");
    location.reload();

}

function showGame() {
    //hide instructionCont
    let instructionCont = document.getElementById("instructionCont")
    instructionCont.style.display = "none";
    //show gameContainer
    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.style.display = "flex"
    //show canvas 
    canvas.style.display = "block"
}

function easy() {
    level = 450;
    console.log("clicked easy");
    showGame();
    game();
}
function medium() {
    level = 350;
    console.log("clicked medium");
    showGame();
    game();
}
function hard() {
    level = 250;
    console.log("clicked hard");
    showGame();
    game();
}
function pro() {
    level = 150;
    console.log("clicked pro");
    showGame();
    game();
}
