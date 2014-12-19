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

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var SCREEN_WIDTH = ctx.canvas.width;
var SCREEN_HEIGHT = ctx.canvas.height;

var shapes = new Grid(5);

function draw() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  for(var i = 0; i < shapes.cells.length; i++) {
    for(var j = 0; j < shapes.cells[i].length; j++) {
      if (shapes.cells[i][j]) {
        var shape = shapes.cells[i][j];
        drawCircle(shape.xlocation(j,i), shape.ylocation(j,i), shape.radius, shape.color);
      }
    }
  }
}

function tick() {

  shapes.threes();

  if(shapes.available_cells().length === 0){
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black';
    drawTextCentered(ctx, "Game Over! Score: " + shapes.score, SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 50, 'Ariel');
    //alert("Score: " + shapes.score);

    return false;
  }
  return true;
}

function loop(time) {
  draw();

  if (tick()) {
    window.requestAnimationFrame(function(time) {
      loop(time);
    });
  }
}

function moveRight () {
  var size = shapes.cells.length;
  for(var i = 0; i < size; i++) {
    var arr1 = [];
    var arr2 = [];
    for(var j = 0; j < size; j++) {
      s = shapes.cells[i].pop()
      if(!s){
        arr1.push(null);
      }
      else {
        arr2.push(s);
      }
    }
    shapes.cells[i] = arr1.concat(arr2.reverse());
  }
  shapes.generate_new_shape();
}

function moveLeft() {
  var size = shapes.cells.length;
  for(var i = 0; i < size; i++) {
    var arr1 = [];
    var arr2 = [];
    for(var j = 0; j < size; j++) {
      s = shapes.cells[i].pop()
      if(!s){
        arr1.push(null);
      }
      else {
        arr2.push(s);
      }
    }
    shapes.cells[i] = arr2.reverse().concat(arr1);
  }
  shapes.generate_new_shape();
}

function moveUp() {
  var size = shapes.cells.length;
  for(var i = 0; i < size; i++) {
    arr1 = [];
    for(var j = 0; j < size; j++) {
      s = shapes.cells[j][i];
      shapes.cells[j][i] = null;
      if(s) {
        arr1.push(s);
      }
    }
    arr1 = arr1.reverse();
    for(var j = 0; j < size; j++) {
      if(arr1.length > 0) {
        shapes.cells[j][i] = arr1.pop();
      }
    }
  }
  shapes.generate_new_shape();
}

function moveDown() {
  var size = shapes.cells.length;
  for(var i = 0; i < size; i++) {
    arr1 = [];
    arr2 = [];
    for(var j = 0; j < size; j++) {
      s = shapes.cells[j][i];
      shapes.cells[j][i] = null;
      if(s) {
        arr1.push(s);
      }
      else {
        arr2.push(null)
      }
    }
    arr1 = arr1.reverse();
    for(var j = 0; j < size; j++) {
      if(arr2.length > 0) {
        shapes.cells[j][i] = arr2.pop();
      }
      else {
        shapes.cells[j][i] = arr1.pop()
      }
    }
  }
  shapes.generate_new_shape();
}


function keyDown(event) {
  var handled = true;

  switch (event.keyCode) {

  case RIGHT_KEY:
    moveRight();
    break;
  case LEFT_KEY:
    moveLeft()
    break;
  case UP_KEY:
    moveUp()
    break;
  case DOWN_KEY:
    moveDown()
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

  default:

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
