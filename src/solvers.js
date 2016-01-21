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



window.findNRooksSolution = function(n) {
  var countRooks = 0;

  var solution = new Board({n:n}); //matrix of one solution
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      solution.togglePiece(i,j);
      if (solution.hasAnyRowConflicts() || solution.hasAnyColConflicts()) {
        solution.togglePiece(i,j);
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
  if (n==2) debugger;
  // total solutions count
  var solutionCount = 0;

  // create an empty board
  var solution = new Board({n:n});

  var checkRemaining = function(board, startX, startY, countRooks) {
    // base case is if startX and startY both equal n-1
    if (startX === n-1 && startY === n-1) {
      // add rook at startX, startY
      board.togglePiece(startY, startX);
      countRooks++;
      // If there are conflicts
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        // return
        return;
      } else if (countRooks === n) { // else if countRooks == n
        // solutionCount++
        solutionCount++;
        // return;
        return;
      } else {
        return;
      }
    }
    // add rook at startX, startY
    board.togglePiece(startY, startX); 
    countRooks++; 
    // if there are conflicts
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      // remove rook
      board.togglePiece(startY, startX); 
      countRooks--;
      // increase startX/startY; 
      if (startX === n-1) {
        checkRemaining(board, 0, startY + 1, countRooks);
      } else {
        checkRemaining(board, startX + 1, startY, countRooks);
      }
    }
    // else if no conflicts
    else {
      // if rooksCount === n
      if (countRooks === n) {
        solutionCount++;
        // return
        return;
      }
      // increase startX/startY
      if (startX === n-1) {
        var newX = 0;
        var newY = startY+1;
      } else {
        var newX = startX+1;
        var newY = startY;
      }
      // create newBoard(board.rows())
      var newBoard = new Board(board.rows());
      var newBoard2 = new Board(board.rows());
      newBoard2.togglePiece(startY, startX);
      // recurse with (newBoard, newStartX/StartY, countRooks)
      checkRemaining(newBoard, newX, newY, countRooks);
      // remove the most recent rook from startX, startY
      debugger;
      // recurse with (board, newStartX/startY, countRooks);
      checkRemaining(newBoard2, newX, newY, countRooks-1);
    }
  };

  checkRemaining(solution, 0, 0, 0);

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
