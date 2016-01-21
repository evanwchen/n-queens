// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      return this.rows()[rowIndex].reduce(function(sum, item) {
        return sum + item;
      }, 0) > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      return this.rows().reduce(function(hasConflict, _, i) {
        return hasConflict ? true : this.hasRowConflictAt.call(this, i);
      }.bind(this), false);
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return this.rows().reduce(function(sum, row) {
        return sum + row[colIndex];
      }, false) > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      return this.rows().reduce(function(hasConflict, _, i) {
        return hasConflict ? true : this.hasColConflictAt.call(this, i);
      }.bind(this), false);
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var total = 0;
      var rowIndex;
      
      // remember to come back and fix
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        return true;
      }
      //

      if (majorDiagonalColumnIndexAtFirstRow === 0) {
        for (var start = 0; start < this.rows().length; start++) {
          var rowIndex = start;
          for (var i = 0; i < this.rows().length - start; i++) {
            if (this.rows()[rowIndex][i]) {
              total++;
            }
            if (total > 1) {
              return true;
            }
            rowIndex++;
          }
          total = 0;
        }
      } else {
        rowIndex = 0;
        for (var j = majorDiagonalColumnIndexAtFirstRow; j < this.rows().length; j++) {

          if (this.rows()[rowIndex][j]) {
            total++;
          }
          if (total > 1) {
            return true;
          }
          rowIndex++;
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var total = 0;
      var rowIndex;
      
      // remember to come back and fix
      if (minorDiagonalColumnIndexAtFirstRow >= this.rows().length) {
        return true;
      }
      //
      
      if (minorDiagonalColumnIndexAtFirstRow === this.rows().length - 1) {
        for (var start = 0; start < this.rows().length; start++) {
          rowIndex = start;
          for (var i = minorDiagonalColumnIndexAtFirstRow; i >= 0 + start; i--) {
            if (this.rows()[rowIndex][i]) {
              total++;
            }
            if (total > 1) {
              return true;
            }
            rowIndex++;
          }
          total = 0;
        }
      } else {
        rowIndex = 0;
        for (var j = minorDiagonalColumnIndexAtFirstRow; j >= 0; j--) {
          if (this.rows()[rowIndex][j]) {
            total++;
          }
          if (total > 1) {
            return true;
          }
          rowIndex++;
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
