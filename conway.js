/*
Conway's Game of Life.
Default board size is 25x25 or you can passing an array to specify the dimensions of the board.

e.g.
c = new Conway([3,3])

You can randomly generate the board:
c.populateBoard()

or you can set the board explicitly:
c.setBoard([[ true, false, false ],
            [ true, true, false ],
            [ false, true, true ]])

To progress the board to the next generation
c.nextGeneration()

Easiest way to run this is just to copy and execute the contents of this script in browser console like Chrome or
Firefox. You can also execute this in NodeJS.
*/
function Conway(dimensions) {
  var board = []
  var dimensions = typeof dimensions !== 'undefined' ? dimensions : [25,25]
  var neighborRanges = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]

  /* Randomly generates the board */
  this.populateBoard = function() {
    board = populateBoard(dimensions[0], dimensions[1])
    this.printBoard(board)
  }

  /* Set the board explicitly so we can do repeat runs
   * newBoard - 2d array of booleans at indexes
   * e.g. [[ true, false, false ],
   *       [ true, true, false ],
   *       [ false, true, true ]]
   */
  this.setBoard = function(newBoard) {
    board = newBoard
    this.printBoard(newBoard)
  }

  /* Progress the board to the next generation */
  this.nextGeneration = function () {
    var newBoard = new Array(dimensions[0])
    for (var x = 0; x < dimensions[0]; x++) {
      newBoard[x] = new Array(dimensions[1])
      for (var y = 0; y < dimensions[1]; y++) {
        var n = aliveNeighborCount(x, y)
        var alive = board[x][y]
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
    board = newBoard
    this.printBoard()
  }

  /* Displays the current board in ascii */
  this.printBoard = function() {
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

  /* private - returns the number of live neighbors for the given x,y */
  var aliveNeighborCount = function(x, y) {
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

  /* private - return a list of neighbor coordinates for the given x, y
   * with in the boundaries of the board.
   * e.g. for [0,0] returns [[0,1],[1,0],[1,1]]
   */
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

  /* private - returns a boolean indicating whether the given x, y
   * falls within the boundaries of board
   */
  var withInDimensions = function (x, y) {
    if ((x >= 0 && x < dimensions[0]) && (y >= 0 && y < dimensions[1])) {
      return true
    }
    return false
  }

  /* private - returns a randomly generated board for the number of given rows and columns */
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
