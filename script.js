

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
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;

const BLOCK_SIZE = 10
const SPEED = 10

var spelStatus = SPELEN;
var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var speedX = 0;
var speedY = 0;

var img;

//plaatje
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler

  if (keyIsDown(65)) { // A
    speedX = -5;
    speedY = 0;
  }
  else if (keyIsDown(68)) { // D
    speedX = 5;
    speedY = 0;
  }
  else if (keyIsDown(87)) { // W
    speedY = -5;
    speedX = 0;
  }
  else if (keyIsDown(83)) { // S
    speedY = 5;
    speedX = 0;
  }

  spelerX = spelerX + speedX;
  spelerY = spelerY + speedY;

  if (spelerX < 0) {
    spelerX = 0;
  };






  // vijand


  // kogel

}

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("green")
  rect(0, 0, 1280, 720)
  // vijand

  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

function gameLoop() {
  ClearCanvas();
  drawAppple();
  moveSnake();
  collisionDetection();
  drawSnake();
}

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * preload
 * deze functie wordt 1x uitgevoerd voor de setup
 * we laden hier de plaatjes
 */

function preload() {
  img = loadImage('appel.jpg')
}



/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1200, 630);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('green');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
  }
}