function checkSolution() {
    /*var gameBoardSolution = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [3, 1, 2, 8, 4, 5, 9, 6, 7],
        [6, 9, 7, 3, 1, 2, 8, 4, 5],
        [8, 4, 5, 6, 9, 7, 3, 1, 2],
        [2, 3, 1, 5, 7, 4, 6, 9, 8],
        [9, 6, 8, 2, 3, 1, 5, 7, 4],
        [5, 7, 4, 9, 6, 8, 2, 3, 1]
    ];
    
    // This whole comment block is used for filling in the game board
    // for testing purposes.

    for (let row = 0, fd = 1; row < 9; row++, fd++) {
        for (let col = 0, sd = 1; col < 9; col++, sd++) {
            let placement = fd.toString() + sd.toString();
            document.getElementById(placement).value = gameBoardSolution[row][col];
        }
    }*/

    var gameBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // Populate JavaScript Board with gameBoard.
    for (let row = 0, fd = 1; row < 9; row++, fd++) {
        for (let col = 0, sd = 1; col < 9; col++, sd++) {
            let placement = fd.toString() + sd.toString();
            gameBoard[row][col] = document.getElementById(placement).value;
        }
    }

    function checkRows(gameBoard) {
        for (var r = 0; r < 9; r++) {
            var row = [];
            for (var c = 0; c < 9; c++) {
                row.push(gameBoard[r][c]);
            }
            if (!isGroupingUnique(row)) {
                return false;
            }
        }
        return true;
    }

    function checkColumns(gameBoard) {
        for (var c = 0; c < 9; c++) {
            var col = [];
            for (var r = 0; r < 9; r++) {
                col.push(gameBoard[r][c]);
            }
            if (!isGroupingUnique(col)) {
                return false;
            }
        }
        return true;
    }

    function checkQuads(gameBoard) {  
        for (var q = 0; q < 9; q++) {
          var quadCords = getQuadCords(q);
          var quad = [];
      
          var x = quadCords[1];
          for (var currentQuadRowIdx = x; currentQuadRowIdx < x + 3; currentQuadRowIdx++) {
            var y = quadCords[0];
            for (var currentQuadColumnIdx = y; currentQuadColumnIdx < y + 3; currentQuadColumnIdx++) {
              quad.push(gameBoard[currentQuadRowIdx][currentQuadColumnIdx]);
            }
          }
    
          if (!isGroupingUnique(quad)) {
              return false;
          }
        }

        return true;
    }

    function checkBoard() {
        if (!checkRows(gameBoard)) {
            return false;
        }
        if (!checkColumns(gameBoard)) {
            return false;
        }
        if (!checkQuads(gameBoard)) {
            return false;
        }

        return true;
    }

    var isBoardUnique = checkBoard();

    alert("The fact the board is unique is: " + isBoardUnique);
}

function isGroupingUnique(group) {
    var sortedGroup = group.sort();
    var ansGroup = [1,2,3,4,5,6,7,8,9];
    if(!(sortedGroup.toString() === ansGroup.toString())) {
        return false;
    }
    return true;
}
  
function getQuadCords(quadIdx) {
  var quotient = quadIdx / 3;
  var row = Math.floor(quotient) * 3;
  var column = Math.floor((quotient % 1) / 0.33) * 3;
  return [column, row];
}
  
/** 7 bottom,middel
 * column 7/3 = 2.333 mod 1 = .333 / .33 == 1.01010101 floor incase extra decimal places
 * */