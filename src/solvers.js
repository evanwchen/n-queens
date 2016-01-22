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

  var recurse = function(row) {
    // BASE CASE
    // if row === n, then return;
    if (row === n) {
      solutionCount++;
      return;
    }

    // RECURSIVE CALL
    // loop through each column (i) in row
    for (var col = 0; col < n; col++) {
      // add a rook
      board.togglePiece(row,col);
      // if no conflicts:
      if (!board.hasAnyRooksConflicts()) {
        // recurse (row + 1);
        recurse(row+1);
      }
      // remove rook
      board.togglePiece(row,col);      
    }
  };

  var board = new Board({n:n});
  recurse(0);

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
  var solutionCount = 0;

  var recurse = function(row) {
    // BASE CASE
    // if row === n, then return;
    if (row === n) {
      solutionCount++;
      return;
    }

    // RECURSIVE CALL
    // loop through each column (i) in row
    for (var col = 0; col < n; col++) {
      // add a rook
      board.togglePiece(row,col);
      // if no conflicts:
      if (!board.hasAnyQueensConflicts()) {
        // recurse (row + 1);
        recurse(row+1);
      }
      // remove rook
      board.togglePiece(row,col);      
    }
  };

  var board = new Board({n:n});
  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};