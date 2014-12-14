function Grid(size) {
  this.size = size;
  this.cell_size = 100;
  this.cells = this.initial();
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
