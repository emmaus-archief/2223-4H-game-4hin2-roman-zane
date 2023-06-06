"use strict";

const BLOCK_SIZE = 20;
const SPEED = 1;

var snake = [];
var food = { x: 0, y: 0 };
var direction = "right";
var gameStatus = "play";

function setup() {
  createCanvas(800, 600);
  frameRate(10);
  resetGame();
}

function draw() {
  background(0);

  if (gameStatus === "play") {
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();
  } else if (gameStatus === "gameOver") {
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
  }
}

function resetGame() {
  snake = [];
  snake.push(createVector(width / 2, height / 2));
  direction = "right";
  placeFood();
  gameStatus = "play";
}

function moveSnake() {
  var head = snake[0].copy();

  if (direction === "right") {
    head.x += BLOCK_SIZE;
  } else if (direction === "left") {
    head.x -= BLOCK_SIZE;
  } else if (direction === "up") {
    head.y -= BLOCK_SIZE;
  } else if (direction === "down") {
    head.y += BLOCK_SIZE;
  }

  snake.unshift(head);

  if (!isFoodEaten()) {
    snake.pop();
  }
}

function isFoodEaten() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    placeFood();
    return true;
  }
  return false;
}

function checkCollision() {
  var head = snake[0];

  if (
    head.x < 0 ||
    head.x >= width ||
    head.y < 0 ||
    head.y >= height ||
    isSnakeCollision()
  ) {
    gameStatus = "gameOver";
  }
}

function isSnakeCollision() {
  var head = snake[0];

  for (var i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function drawSnake() {
  for (var i = 0; i < snake.length; i++) {
    fill(255);
    rect(snake[i].x, snake[i].y, BLOCK_SIZE, BLOCK_SIZE);
  }
}

function drawFood() {
  fill(255, 0, 0);
  rect(food.x, food.y, BLOCK_SIZE, BLOCK_SIZE);
}

function placeFood() {
  var cols = floor(width / BLOCK_SIZE);
  var rows = floor(height / BLOCK_SIZE);
  food = createVector(
    floor(random(cols)) * BLOCK_SIZE,
    floor(random(rows)) * BLOCK_SIZE
  );

  for (var i = 0; i < snake.length; i++) {
    if (food.x === snake[i].x && food.y === snake[i].y) {
      placeFood();
      break;
    }
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && direction !== "left") {
    direction = "right";
  } else if (keyCode === LEFT_ARROW && direction !== "right") {
    direction = "left";
  } else if (keyCode === UP_ARROW && direction !== "down") {
    direction = "up";
  } else if (keyCode === DOWN_ARROW && direction !== "up") {
    direction = "down";
  } else if (keyCode === ENTER && gameStatus === "gameOver") {
    resetGame();
  }
}