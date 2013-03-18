/*
c = new Conway([3,3])
c.setBoard([ [ true, false, false ],
     [ true, true, false ],
     [ false, true, true ] ])
 */

function Conway(dimensions) {
  /* public variables */
  this.board = []

  /* private variables */
  var dimensions = typeof dimensions !== 'undefined' ? dimensions : [25,25]
  var neighborRanges = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]

  /* public methods */
  this.populateBoard = function() {
    this.board = populateBoard(dimensions[0], dimensions[1])
    printBoard(this.board)
  }

  this.nextGeneration = function () {
    var newBoard = deepCopy(this.board)
    for (var x = 0; x < dimensions[0]; x++) {
      for (var y = 0; y < dimensions[1]; y++) {
        var n = aliveNeighborCount(this.board, x, y)
        var alive = this.board[x][y]
        if (alive) {
          if (n === 2 || n === 3) {
            newBoard[x][y] = true
          }
          else {
            newBoard[x][y] = false
          }
        }
        else {
          if (n === 3) {
            newBoard[x][y] = true
          }
        }
      }
    }
    this.board = newBoard
    printBoard(this.board)
  }

  this.setBoard = function(board) {
    this.board = board
    printBoard(this.board)
  }

  var printBoard = function(board) {
    for (var i = 0, bl = board.length; i < bl; i++) {
      var printString = ["|"]
      var row = board[i]
      for (var j = 0, rl = row.length; j < rl; j++) {
        if (row[j]) {
          printString.push("*|")
        }
        else {
          printString.push(" |")
        }
      }
      console.log(printString.join(""))
    }
  }

  /* http://james.padolsey.com/javascript/deep-copying-of-objects-and-arrays/ */
  var deepCopy = function (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}

  var aliveNeighborCount = function(board, x, y) {
    var n = 0;
    var neighborsCoords = neighbors(x, y)
    for (var i = 0, ncl = neighborsCoords.length; i < ncl; i++) {
      var neighborCoords = neighborsCoords[i]
      if (board[neighborCoords[0]][neighborCoords[1]]) {
        n++
      }
    }
    return n;
  }

  var neighbors = function(x, y) {
    var neighborsCoords = []
    for (var i = 0, nrl = neighborRanges.length; i < nrl; i++) {
      var neighborRange = neighborRanges[i]
      var neighborCoords = [x+neighborRange[0], y+neighborRange[1]]
      if (withInDimensions(neighborCoords[0], neighborCoords[1])) {
        neighborsCoords.push(neighborCoords)
      }
    }
    return neighborsCoords
  }

  var withInDimensions = function (x, y) {
    if ((x >= 0 && x < dimensions[0]) && (y >= 0 && y < dimensions[1])) {
      return true
    }
    return false
  }

  /* private methods */
  var populateBoard = function(rows, columns) {
    var bools = [true,false]
    var board = []
    for (var x = 0; x < rows; x++) {
      board[x] = [];
      for (var y = 0; y < columns; y++) {
        board[x][y] = bools[Math.floor(Math.random()*bools.length)]
      }
    }
    return board
  }
}
