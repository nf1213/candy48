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

shapes = new Grid(6);

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
  var size = shapes.cells.length;
  switch(dir) {
  case 'r':
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
    break;
  case 'l':
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
    break;
  case 'u':
    for(var i = 0; i < size; i++) {
      arr1 = [];
      arr2 = [];
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

    break;
  case 'd':
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

    break;
  default:
    break;
  }
  shapes.generate_new_shape();
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

  case SPACE_KEY:

    break;

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
