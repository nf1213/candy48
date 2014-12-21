function Shape(size, shape) {
  this.shape = shape;
  this.size = size;
  this.radius = this.size / 2;

  this.equals = function(shape) {
    if(this.shape == shape.shape) {
      return true;
    }
    return false
  }
}

Shape.prototype.xlocation = function(x,y) {
  return (x * this.size)
};

Shape.prototype.ylocation = function(x,y) {
  return (y * this.size)
};
