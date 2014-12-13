function Shape(x, y) {
  var colors = ['red', 'blue', 'green', 'yellow', 'magenta'];

  var rand = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

  this.color = colors[rand];
  this.radius = 50;
  this.x = x + this.radius;
  this.y = y + this.radius;
}

function drawRect(x, y, w, h, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, radius, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var SCREEN_WIDTH = ctx.canvas.width;
var SCREEN_HEIGHT = ctx.canvas.height;

var shapes = []
shapes.push(new Shape(0, 0))
//shapes.push(new Shape(100, 0))

function draw() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  for(var i = 0; i < shapes.length; i++) {
    var shape = shapes[i]
    drawCircle(shape.x, shape.y, shape.radius, shape.color)
  }
  // Draw elements of the game here.
  // Can use `drawRect` and `drawCircle` function.
  // e.g. draw the ball colored green
}

function tick() {
  // Update game logic here.
  // e.g. moving a ball back and forth across the screen
}

function loop(time) {
  tick();
  draw();

  window.requestAnimationFrame(function(time) {
    loop(time);
  });
}

function move(dir){
  var right = SCREEN_WIDTH - 50;
  var left = 50;
  var top = 50;
  var bottom = SCREEN_HEIGHT - 50;
  for(var i = 0; i < shapes.length; i++) {
    var shape = shapes[i]
    switch(dir) {

    case 'r':
      shape.x = right;
      break;
    case 'l':
      shape.x = left;
      break;
    case 'u':
      shape.y = top;
      break;
    case 'd':
      shape.y = bottom;
      break;
    default:
      break;
    }
  }
}

function keyDown(event) {
  var handled = true;

  switch (event.keyCode) {

  case RIGHT_KEY:
    move('r');
    break;
  case LEFT_KEY:
    move('l')
    break;
  case UP_KEY:
    move('u')
    break;
  case DOWN_KEY:
    move('d')
    break;

  default:
    handled = false;
    break;
  }

  if (handled) {
    event.preventDefault();
  }
}

function keyUp(event) {
  var handled = true;

  switch (event.keyCode) {

// Handle user input here when a key is released.
// A few key constants are defined in /js/key_codes.js
// e.g. starts the ball moving again when releasing space bar

  case SPACE_KEY:
    ball.isStopped = false;
    break;

  default:
    handled = false;
    break;
  }

  if (handled) {
    event.preventDefault();
  }
}

function run() {
  window.onkeydown = keyDown;
  window.onkeyup = keyUp;

  window.requestAnimationFrame(function(time) {
    loop(time);
  });
}

run();
