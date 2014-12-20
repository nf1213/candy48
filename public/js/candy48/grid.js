function Grid(size) {
  this.size = size;
  this.cell_size = 100;
  this.score = 0;

  this.pickColor = function() {
    var colors = [];
    if(this.score > 300 && this.score < 700) {
      colors =  ['red', 'blue', 'yellow'];
    }
    else if (this.score > 700 && this.score < 1000){
      colors = ['red', 'blue', 'yellow', 'orange']
    }
    else if(this.score > 1000) {
      colors = ['red', 'blue', 'yellow', 'orange', 'magenta']
    }
    else {
      colors = ['red', 'blue']
    }
    var rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
  }

  this.generate_new_shape = function() {
    var available = this.available_cells();
    var space = available[getRandomInt(0, available.length - 1)];
    shape = new Shape(this.cell_size, this.pickColor());
    this.cells[space.i][space.j] = shape;
  }

  this.threes = function() {
    this.cells = this.findThrees(this.cells);
    this.cells = this.transform(this.cells);
  }

  this.initial = function() {
    var cells = [];

    for (var x = 0; x < this.size; x++) {
      var row = cells[x] = [];

      for (var y = 0; y < this.size; y++) {
        row.push(null);
      }
    }

    cells[0][0] = (new Shape(this.cell_size, 'red'));
    cells[0][1] = (new Shape(this.cell_size, 'blue'));

    return cells;
  }

  this.cells = this.initial();

  this.available_cells = function() {
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

  this.transform = function(array) {
    cellArray = array;
    for(var i=0; i < this.size; i++) {
      for(var j=0; j < this.size; j++) {
        try {
          left = j - 1;
          right = j + 1;
          if(cellArray[j][i].equals(cellArray[left][i]) && cellArray[j][i].equals(cellArray[right][i])) {
            cellArray[j][i] = null;
            cellArray[right][i] = null;
            cellArray[left][i] = null;
            this.score = this.score + 100;
          }
        }
        catch(err) {

        }
      }
    }

    return cellArray;
  }

  this.findThrees = function(array) {
    cellArray = array;
    for(var i=0; i < this.size; i++) {
      for(var j=0; j < this.size; j++) {
        try {
          left = j - 1;
          right = j + 1;
          if(cellArray[i][j].equals(cellArray[i][left]) && cellArray[i][j].equals(cellArray[i][right])) {
            cellArray[i][j] = null;
            cellArray[i][right] = null;
            cellArray[i][left] = null;
            this.score = this.score + 100;
          }
        }
        catch(err) {

        }
      }
    }

    return cellArray;
  }
}
