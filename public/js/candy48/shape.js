function Shape(size) {
  var colors = ['red', 'blue', 'green', 'yellow', 'magenta'];

  var rand = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

  this.color = colors[rand];
  this.size = size;
  this.radius = this.size / 2;
}

Shape.prototype.xlocation = function(x,y) {
  return (x * this.size) + this.radius;
};

Shape.prototype.ylocation = function(x,y) {
  return (y * this.size) + this.radius;
};
