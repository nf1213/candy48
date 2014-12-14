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

shapes = new Grid(6);

function draw() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  for(var i = 0; i < shapes.cells.length; i++) {
    for(var j = 0; j < shapes.cells[i].length; j++) {
      if (shapes.cells[i][j]) {
        var shape = shapes.cells[i][j];
        drawCircle(shape.xlocation(i,j), shape.ylocation(i,j), shape.radius, shape.color);
      }
    }
  }
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
  for(var i = 0; i < shapes.cells.length; i++) {
    for(var j = 0; j < shapes[i].cellse.length; j++) {
    var shape = shapes.cells[i][j]
      switch(dir) {

      case 'r':

        break;
      case 'l':

        break;
      case 'u':

        break;
      case 'd':

        break;
      default:
        break;
      }
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
