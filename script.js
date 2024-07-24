

// const canvas = document.getElementById('breakout');
// const context = canvas.getContext('2d');

// const ballRadius = 10;
// const paddleHeight = 10;
// const paddleWidth = 75;
// const brickRowCount = 3;
// const brickColumnCount = 5;
// const brickWidth = 75;
// const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
// const paddleSpeed = 7;

// let x, y, dx, dy, paddleX;
// let rightPressed = false;
// let leftPressed = false;
// let bricks = [];
// let score = 0;
// let lives = 3;
// let mode = 'easy';
// let level = 1;
// let gameStarted = false; // Track if the game has started

// function initGame() {
//     x = canvas.width / 2;
//     y = canvas.height - 30;
//     dx = getBallSpeed();
//     dy = -dx;
//     paddleX = (canvas.width - paddleWidth) / 2;
//     rightPressed = false;
//     leftPressed = false;
//     bricks = createBricks();
//     score = 0;
//     lives = 3;
//     gameStarted = true;
//     document.querySelector('.overlay').style.display = 'none';
// }

// function getBallSpeed() {
//     switch (mode) {
//         case 'easy': return 2 + level * 0.5;
//         case 'medium': return 3 + level * 0.5;
//         case 'hard': return 4 + level * 0.5;
//         case 'insane': return 5 + level * 0.5;
//         case 'expert': return 6 + level * 0.5;
//         default: return 2;
//     }
// }

// function createBricks() {
//     const newBricks = [];
//     for (let c = 0; c < brickColumnCount + level; c++) { // Increase columns with levels
//         newBricks[c] = [];
//         for (let r = 0; r < brickRowCount + level; r++) { // Increase rows with levels
//             newBricks[c][r] = { x: 0, y: 0, status: 1, type: Math.random() > 0.8 ? 2 : 1 }; // Randomly assign brick types
//         }
//     }
//     return newBricks;
// }

// function drawBall() {
//     context.beginPath();
//     context.arc(x, y, ballRadius, 0, Math.PI * 2);
//     context.fillStyle = '#0095DD';
//     context.fill();
//     context.closePath();
// }

// function drawPaddle() {
//     context.beginPath();
//     context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//     context.fillStyle = '#0095DD';
//     context.fill();
//     context.closePath();
// }

// function drawBricks() {
//     for (let c = 0; c < brickColumnCount + level; c++) {
//         for (let r = 0; r < brickRowCount + level; r++) {
//             if (bricks[c][r].status === 1) {
//                 const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
//                 const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
//                 bricks[c][r].x = brickX;
//                 bricks[c][r].y = brickY;
//                 context.beginPath();
//                 context.rect(brickX, brickY, brickWidth, brickHeight);
//                 context.fillStyle = bricks[c][r].type === 2 ? '#FF5733' : '#0095DD'; // Different color for different types
//                 context.fill();
//                 context.closePath();
//             }
//         }
//     }
// }

// function drawScore() {
//     context.font = '16px Arial';
//     context.fillStyle = '#0095DD';
//     context.fillText(`Score: ${score}`, 8, 20);
// }

// function drawLives() {
//     context.font = '16px Arial';
//     context.fillStyle = '#0095DD';
//     context.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
// }

// function collisionDetection() {
//     for (let c = 0; c < brickColumnCount + level; c++) {
//         for (let r = 0; r < brickRowCount + level; r++) {
//             const brick = bricks[c][r];
//             if (brick.status === 1) {
//                 if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
//                     dy = -dy;
//                     brick.status = 0;
//                     score++;
//                     if (score === (brickRowCount + level) * (brickColumnCount + level)) {
//                         level++;
//                         initGame();
//                     }
//                 }
//             }
//         }
//     }
// }

// function draw() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     drawBricks();
//     drawBall();
//     drawPaddle();
//     drawScore();
//     drawLives();
//     collisionDetection();

//     if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if (y + dy < ballRadius) {
//         dy = -dy;
//     } else if (y + dy > canvas.height - ballRadius) {
//         if (x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         } else {
//             lives--;
//             if (!lives) {
//                 alert('Game Over');
//                 window.parent.postMessage({ type: 'submit-score', score }, '*');
//                 gameStarted = false; // Set flag to false when game is over
//                 document.querySelector('.overlay').style.display = 'flex';
//             } else {
//                 x = canvas.width / 2;
//                 y = canvas.height - 30;
//                 dx = getBallSpeed();
//                 dy = -dx;
//                 paddleX = (canvas.width - paddleWidth) / 2;
//             }
//         }
//     }

//     if (rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += paddleSpeed;
//     } else if (leftPressed && paddleX > 0) {
//         paddleX -= paddleSpeed;
//     }

//     x += dx;
//     y += dy;
//     if (gameStarted) {
//         requestAnimationFrame(draw);
//     }
// }

// function keyDownHandler(e) {
//     if (e.key === 'Right' || e.key === 'ArrowRight') {
//         rightPressed = true;
//     } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if (e.key === 'Right' || e.key === 'ArrowRight') {
//         rightPressed = false;
//     } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//         leftPressed = false;
//     }
// }

// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);

// document.getElementById('playButton').addEventListener('click', () => {
//     initGame();
//     draw();
// });
const canvas = document.getElementById('breakout');
const context = canvas.getContext('2d');

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const paddleSpeed = 7;

let x, y, dx, dy, paddleX;
let rightPressed = false;
let leftPressed = false;
let bricks = [];
let score = 0;
let lives = 3;
let mode = 'easy';
let level = 1;
let gameStarted = false; // Track if the game has started

function initGame() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = getBallSpeed();
    dy = -dx;
    paddleX = (canvas.width - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    bricks = createBricks();
    // Do not reset score here
    lives = 3;
    gameStarted = true;
    document.querySelector('.overlay').style.display = 'none';
}

function getBallSpeed() {
    switch (mode) {
        case 'easy': return 2 + level * 0.5;
        case 'medium': return 3 + level * 0.5;
        case 'hard': return 4 + level * 0.5;
        case 'insane': return 5 + level * 0.5;
        case 'expert': return 6 + level * 0.5;
        default: return 2;
    }
}

function createBricks() {
    const newBricks = [];
    for (let c = 0; c < brickColumnCount + level; c++) { // Increase columns with levels
        newBricks[c] = [];
        for (let r = 0; r < brickRowCount + level; r++) { // Increase rows with levels
            newBricks[c][r] = { x: 0, y: 0, status: 1, type: Math.random() > 0.8 ? 2 : 1 }; // Randomly assign brick types
        }
    }
    return newBricks;
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount + level; c++) {
        for (let r = 0; r < brickRowCount + level; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = bricks[c][r].type === 2 ? '#FF5733' : '#0095DD'; // Different color for different types
                context.fill();
                context.closePath();
            }
        }
    }
}

function drawScore() {
    context.font = '16px Arial';
    context.fillStyle = '#0095DD';
    context.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
    context.font = '16px Arial';
    context.fillStyle = '#0095DD';
    context.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount + level; c++) {
        for (let r = 0; r < brickRowCount + level; r++) {
            const brick = bricks[c][r];
            if (brick.status === 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    score += brick.type === 2 ? 2 : 1; // Different score for different brick types
                    if (score === (brickRowCount + level) * (brickColumnCount + level)) {
                        level++;
                        initGame();
                    }
                }
            }
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert('Game Over');
                window.parent.postMessage({ type: 'submit-score', score }, '*');
                gameStarted = false; // Set flag to false when game is over
                document.querySelector('.overlay').style.display = 'flex';
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = getBallSpeed();
                dy = -dx;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    x += dx;
    y += dy;
    if (gameStarted) {
        requestAnimationFrame(draw);
    }
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

document.getElementById('playButton').addEventListener('click', () => {
    initGame();
    draw();
});
