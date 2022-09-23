
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
  freeFallSpeed: -6,
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

  // if (enemyValue.y > 20) {

  let vektorX = (enemyValue.x - unitValue.x);
  let vektorY = (enemyValue.y - unitValue.y);
  let vector = Math.round(Math.sqrt(vektorX * vektorX + vektorY * vektorY));

  if (vector <= 40) {
    intersection(vektorX, vektorY, vector);
    return;
  }

  divergence();
  //   return;
  // }
  // clearInterval(interval);
}

function intersection(vektorX, vektorY, vector) {
  enemyValue.tempX += Math.round(vektorX * 10 / vector);
  enemyValue.tempY += Math.round(vektorY * 10 / vector);

  moveEnemy();
};

function divergence() {
  moveEnemy();
}


function moveEnemy() {
  enemyValue.y += enemyValue.tempY;
  enemyValue.x += enemyValue.tempX;
  if (enemyValue.x > 20 && enemyValue.x < 480) {
    if (enemyValue.y > 20 && enemyValue.y < 480) {
      enemy.style.bottom = enemyValue.y + 'px';
      enemy.style.left = enemyValue.x + 'px';

      enemyValue.tempY = (enemyValue.tempY >= enemyValue.freeFallSpeed) ?
        enemyValue.tempY - Math.abs(enemyValue.resistAir * (enemyValue.tempY - enemyValue.freeFallSpeed) * 0.1) :
        enemyValue.tempY + Math.abs(enemyValue.resistAir * (enemyValue.tempY + enemyValue.freeFallSpeed) * 0.1);
      // console.log('y', enemyValue.tempY);

      // console.time('#1')
      enemyValue.tempX = (enemyValue.tempX > enemyValue.resistAir * 0.1) ? (enemyValue.tempX - (enemyValue.resistAir * enemyValue.tempX * 0.1)) :
        (enemyValue.tempX < -enemyValue.resistAir * 0.1) ? enemyValue.tempX - (enemyValue.resistAir * enemyValue.tempX * 0.1) : enemyValue.tempX = 0;


      // console.timeEnd('#1')


    } else {
      reversesY();
    }
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

function reversesY() {
  if (enemyValue.y <= 20) {
    enemy.style.bottom = 20 + 'px';
    enemy.style.left = enemyValue.x + 'px';
    enemyValue.tempY = -enemyValue.tempY;
  } else {
    enemy.style.bottom = 480 + 'px';
    enemy.style.left = enemyValue.x + 'px';
    enemyValue.tempY = -enemyValue.tempY;
  }
};

// console.time('#1')
// setTimeout(foo1, 500)
// console.timeEnd('#1')

// console.time('#2')
// setTimeout(foo2, 500)
// console.timeEnd('#2')

// console.time('#3')
// let b = 0;
// for (let i = 0; i < 10; i++) {
//   b += i;
// };
// console.log(b);
// console.timeEnd('#3')

// console.time('#4')
// let c = 0;
// for (let i = 0; i < 100; i++) {
//   c += i;
// };
// console.log(c);
// console.timeEnd('#4')

