
"use strict"
const fild = document.querySelector('.fild');
const unit = document.querySelector('.unit');
const X = document.querySelector('.X');
const Y = document.querySelector('.Y');
const fild_mous = document.querySelector('.fild_mous');

const enemy = document.querySelector('.enemy');
const enemyValue = {
  x: 0,
  y: 0,
  tempX: 0,
  tempY: 0,
  resistAir: 0.25,
  freeFallSpeed: -3,
}
const speedGame = 20;
const unitValue = {
  x: 0,
  y: 0,
}
fild_mous.addEventListener('mousemove', move);


function move(event) {
  unitValue.x = event.offsetX;
  unitValue.y = 500 - event.offsetY;

  unit.style.left = unitValue.x + 'px';
  unit.style.bottom = unitValue.y + 'px';

  X.value = unitValue.x;
  Y.value = unitValue.y;
}
let click = 0;
fild_mous.addEventListener('click', start);
let interval;

function start() {

  if (click % 2 == 0) {
    enemyValue.x = 150;
    enemyValue.y = 400;
    enemy.style.bottom = enemyValue.y + 'px';
    enemy.style.left = enemyValue.x + 'px';

    interval = setInterval(physics, speedGame);
  } else {
    clearInterval(interval);
  }
  click++;
}

function physics() {

  if (enemyValue.y > -2) {

    let vektorX = (enemyValue.x - unitValue.x);
    let vektorY = (enemyValue.y - unitValue.y);
    let vector = Math.round(Math.sqrt(vektorX * vektorX + vektorY * vektorY));

    if (vector <= 40) {
      intersection(vektorX, vektorY, vector);
      return;
    }

    divergence();
    return;
  }
  clearInterval(interval);
}

function intersection(vektorX, vektorY, vector) {
  enemyValue.tempX += Math.round(vektorX * 10 / vector);
  enemyValue.tempY += Math.round(vektorY * 10 / vector);
  enemyValue.y += enemyValue.tempY;
  enemyValue.x += enemyValue.tempX;
  if (enemyValue.x > 20 && enemyValue.x < 480) {
    enemy.style.bottom = enemyValue.y + 'px';
    enemy.style.left = enemyValue.x + 'px';
    // enemyValue.tempY += enemyValue.resistAir;
    // enemyValue.tempX = (enemyValue.tempX > -enemyValue.resistAir) ? enemyValue.tempX + enemyValue.resistAir :
    //   (enemyValue.tempX < enemyValue.resistAir) ? enemyValue.tempX - enemyValue.resistAir : enemyValue.tempX = 0;
    // enemyValue.tempX = (enemyValue.tempX > -enemyValue.resistAir) ? enemyValue.tempX + enemyValue.resistAir :
    //   (enemyValue.tempX < enemyValue.resistAir) ? enemyValue.tempX - enemyValue.resistAir : enemyValue.tempX = 0;
  } else {
    reversesX();
  }
};

function divergence() {
  enemyValue.y += enemyValue.tempY;
  enemyValue.x += enemyValue.tempX;
  if (enemyValue.x > 20 && enemyValue.x < 480) {
    enemy.style.left = enemyValue.x + 'px';
    enemy.style.bottom = enemyValue.y + 'px';

    // enemyValue.tempY = (enemyValue.tempY > enemyValue.freeFallSpeed) ? enemyValue.tempY - enemyValue.resistAir :
    //   (enemyValue.tempY < enemyValue.freeFallSpeed) ? enemyValue.tempY + enemyValue.resistAir :
    //     enemyValue.tempY + enemyValue.resistAir;
    enemyValue.tempY = (enemyValue.tempY >= enemyValue.freeFallSpeed) ?
      enemyValue.tempY - Math.abs(Math.round(enemyValue.resistAir * enemyValue.tempY * 10) / 100) + enemyValue.freeFallSpeed * 0.1 :
      enemyValue.tempY + Math.abs(Math.round(enemyValue.resistAir * enemyValue.tempY * 10)) / 100 - enemyValue.freeFallSpeed * 0.1;


    enemyValue.tempX = (enemyValue.tempX > 0) ? enemyValue.tempX - Math.round(enemyValue.resistAir * enemyValue.tempX * 10) / 100 :
      (enemyValue.tempX < 0) ? enemyValue.tempX - Math.round(enemyValue.resistAir * enemyValue.tempX * 10) / 100 : enemyValue.tempX = 0;

  } else {
    reversesX();
  }
}

function reversesX() {
  if (enemyValue.x <= 20) {
    enemy.style.bottom = enemyValue.y + 'px';
    enemy.style.left = 20 + 'px';
    enemyValue.tempX = -enemyValue.tempX;
  } else {
    enemy.style.bottom = enemyValue.y + 'px';
    enemy.style.left = 480 + 'px';
    enemyValue.tempX = -enemyValue.tempX;
  }
};