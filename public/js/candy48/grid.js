function Grid(size) {
  this.size = size;
  this.cell_size = 100;
  this.cells = this.initial();

  this.generate_new_shape = function() {
    var available = this.available_cells()
    var space = available[getRandomInt(0, available.length - 1)];
    this.cells[space.i][space.j] = new Shape(this.cell_size)
  }
}

Grid.prototype.initial = function() {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }

  cells[0][0] = (new Shape(this.cell_size));
  cells[0][1] = (new Shape(this.cell_size));

  return cells;
};

Grid.prototype.available_cells = function() {
  var available = [];
  for(var i = 0; i < this.size; i++) {
    for(var j = 0; j < this.size; j++) {
      if(!this.cells[i][j]) {
        available.push({i: i, j: j});
      }
    }
  }
  return available;
}
