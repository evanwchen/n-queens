/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
Board.prototype.toggle = function(y, x) {
  this.attributes[y][x] = !this.attributes[y][x] * 1;
};

window.findNRooksSolution = function(n) {
  var countRooks = 0;

  var solution = new Board({n:n}); //matrix of one solution
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      solution.toggle(i,j);
      if (solution.hasAnyRowConflicts() || solution.hasAnyColConflicts()) {
        solution.toggle(i,j);
      } else {
        countRooks++;
      }
      if (countRooks >= n) {
        return solution.rows();
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var matrix = [];
  var solution = new Board({n:n});
  for (var i = 0; i < n; i++) {
    var matrixRow = []; 
    for (var j = 0; j < n; j++) {
      matrixRow.push(0);
    }
    matrix.push(matrixRow);
  }

  var checkRemaining = function(boardMatrix, startX, startY, countRooks) {
    var matrix1 = boardMatrix.map(function(arr) {
     return arr.slice();
    }).slice();
    var matrix2 = boardMatrix.map(function(arr) {
     return arr.slice();
    }).slice();

    var board1 = new Board(matrix1);
    
    if (startX === n-1 && startY === n-1) {
      board1.togglePiece(startY, startX);
      countRooks++;
      if (board1.hasAnyRowConflicts() || board1.hasAnyColConflicts()) {
        return;
      } else if (countRooks === n) { 
        solutionCount++;
        return;
      } else {
        return;
      }
    }
    board1.togglePiece(startY, startX); 
    countRooks++; 
    if (board1.hasAnyRowConflicts() || board1.hasAnyColConflicts()) {
      board1.togglePiece(startY, startX); 
      countRooks--;
      if (startX === n-1) {
        checkRemaining(board1.rows(), 0, startY + 1, countRooks);
      } else {
        checkRemaining(board1.rows(), startX + 1, startY, countRooks);
      }
    }
    else {
      if (countRooks === n) {
        solutionCount++;
        return;
      }
      if (startX === n-1) {
        var newX = 0;
        var newY = startY+1;
      } else {
        var newX = startX+1;
        var newY = startY;
      }
      var newBoardMatrix1 = board1.rows();

      checkRemaining(newBoardMatrix1, newX, newY, countRooks);
      checkRemaining(matrix2, newX, newY, countRooks-1);
    }
  };

  checkRemaining(matrix, 0, 0, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
  
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};