 /* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
//"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

// SNAKE GAME 

// Canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;



const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 100, y: 100 }];
let dx = gridSize;
let dy = 0;
let food = { x: gridSize * 5, y: gridSize * 5 };
let score = 0;


function gameLoop() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  drawScore();

  if (isGameOver()) {
    endGame();
    return;
  }

  setTimeout(gameLoop, 100);
}


function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// snake laten bewegen
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // controleerd of de snake het eten heeft gegeten
  if (head.x === food.x && head.y === food.y) {
    generateFood();
    score++;
  } else {
    snake.pop();
  }
}

// tekent snake 
function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// spawnt het eten op een random plek
function generateFood() {
  const maxPos = tileCount - 1;
  food = {
    x: Math.floor(Math.random() * maxPos) * gridSize,
    y: Math.floor(Math.random() * maxPos) * gridSize
  };
}


//tekent het eten
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

//score
function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 25);
}

// CheckGameOver
function isGameOver() {
  const head = snake[0];

  // Checkt of de snake tegen de muur aangaat
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    return true;
  }

  // Checkt of de snake tegen zich zelf aankomt
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Game over
function endGame() {
  ctx.fillStyle = 'white';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over', 120, canvas.height / 2);
}


document.addEventListener('keydown', handleArrowKeys);

function handleArrowKeys(event) {
  const key = event.key;
  if (key === 'ArrowUp' && dy !== gridSize) {
    dx = 0; // pijltje omhoog
    dy = -gridSize;
  } else if (key === 'ArrowDown' && dy !== -gridSize) {
    dx = 0; // pijltje omlaag
    dy = gridSize;
  } else if (key === 'ArrowLeft' && dx !== gridSize) {
    dx = -gridSize;// pijltje naar links
    dy = 0;
  } else if (key === 'ArrowRight' && dx !== -gridSize) {
    dx = gridSize;// pijltje naar rechts
    dy = 0;
  }
}

// Start het spel
gameLoop();
generateFood();