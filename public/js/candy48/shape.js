function Shape(size, color) {
  this.color = color;
  this.size = size;
  this.radius = this.size / 2;

  this.equals = function(shape) {
    if(this.color == shape.color) {
      return true;
    }
    return false
  }
}

Shape.prototype.xlocation = function(x,y) {
  return (x * this.size) + this.radius;
};

Shape.prototype.ylocation = function(x,y) {
  return (y * this.size) + this.radius;
};
