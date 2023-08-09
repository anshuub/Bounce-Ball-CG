// Game settings
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 80;
const paddleHeight = 10;
const paddleSpeed = 8;
const ballRadius = 5;
const ballSpeedX = 2;
const ballSpeedY = -2;

// Paddle properties
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = ballSpeedX;
let ballDY = ballSpeedY;

// Variable to keep track of game over state
let gameOver = false;

// Function to start the game when the "Start Game" button is clicked
function startGame() {
    // Hide the start screen
    document.getElementById('startScreen').style.display = 'none';

    // Display the canvas
    document.getElementById('canvas').style.display = 'block';

    // Set game over state to false
    gameOver = false;

    // Start the game loop
    gameLoop();
}

// Check if the game is over
function checkGameOver() {
    // Check if ball falls off the bottom of the canvas
    if (ballY + ballDY > canvas.height - ballRadius) {
        // Check if ball hits the paddle
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
        } else {
            // Game over
            gameOver = true;
            alert('Game Over');
            document.location.reload();
        }
    }
}

// Update paddle position
function updatePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
}

// Update ball position
function updateBall() {
    // Bounce off walls
    if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > canvas.height - ballRadius) {
        // Check if ball hits the paddle
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
        } else {
            // Game over (handled in checkGameOver function)
        }
    }

    ballX += ballDX;
    ballY += ballDY;
}

// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
}

// Main game loop
function gameLoop() {
    if (!gameOver) {
        updatePaddle();
        updateBall();
        draw();
        checkGameOver();
        requestAnimationFrame(gameLoop);
    }
}

// Event listeners for paddle movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
});

// Event listener for the "Start Game" button click
document.getElementById('startButton').addEventListener('click', startGame);