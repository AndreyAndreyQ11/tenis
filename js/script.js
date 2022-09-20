
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
  tempY: -10,
  resistAir: 1,
  freeFallSpeed: -2,
}
const speedGame = 35;
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
// clearTimeout(qq1)


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
  if (enemyValue.x > 10 && enemyValue.x < 490) {
    enemy.style.bottom = enemyValue.y + 'px';
    enemy.style.left = enemyValue.x + 'px';
    // enemyValue.tempY += enemyValue.resistAir;
    // enemyValue.tempX = (enemyValue.tempX > -enemyValue.resistAir) ? enemyValue.tempX + enemyValue.resistAir :
    //   (enemyValue.tempX < enemyValue.resistAir) ? enemyValue.tempX - enemyValue.resistAir : enemyValue.tempX = 0;
    // enemyValue.tempX = (enemyValue.tempX > -enemyValue.resistAir) ? enemyValue.tempX + enemyValue.resistAir :
    //   (enemyValue.tempX < enemyValue.resistAir) ? enemyValue.tempX - enemyValue.resistAir : enemyValue.tempX = 0;
  } else {
    enemyValue.tempX = -enemyValue.tempX;
  }
};
function divergence() {
  enemyValue.y += enemyValue.tempY;
  enemyValue.x += enemyValue.tempX;
  if (enemyValue.x > 10 && enemyValue.x < 490) {
    enemy.style.left = enemyValue.x + 'px';
    enemy.style.bottom = enemyValue.y + 'px';
    // console.log('1', enemyValue.tempY);
    // enemyValue.tempY = (enemyValue.tempY = enemyValue.freeFallSpeed) ? enemyValue.tempY :
    //   (enemyValue.tempY > enemyValue.freeFallSpeed) ? enemyValue.tempY - enemyValue.resistAir - enemyValue.freeFallSpeed :
    //     enemyValue.tempY + enemyValue.resistAir;
    enemyValue.tempY = (enemyValue.tempY > enemyValue.freeFallSpeed) ? enemyValue.tempY - enemyValue.resistAir :
      (enemyValue.tempY < enemyValue.freeFallSpeed) ? enemyValue.tempY + enemyValue.resistAir :
        enemyValue.tempY + enemyValue.resistAir;
    // console.log('2', enemyValue.tempY);
    enemyValue.tempX = (enemyValue.tempX > 0) ? enemyValue.tempX - enemyValue.resistAir / 4 :
      (enemyValue.tempX < 0) ? enemyValue.tempX + enemyValue.resistAir / 4 : enemyValue.tempX = 0;
  } else {
    enemyValue.tempX = -enemyValue.tempX;
  }
}

