// Easy Sudoku puzzle - 0 represents empty cells
var easyPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Initialize board with easy puzzle
function initializeBoard() {
    for (let row = 0, fd = 1; row < 9; row++, fd++) {
        for (let col = 0, sd = 1; col < 9; col++, sd++) {
            let placement = fd.toString() + sd.toString();
            let inputElement = document.getElementById(placement);
            let value = easyPuzzle[row][col];
            
            if (value !== 0) {
                // Set clue value and make it readonly
                inputElement.value = value;
                inputElement.readOnly = true;
                inputElement.classList.add('clue');
            }
        }
    }
}

// Check if a number is valid at a given position
function isValid(board, row, col, num) {
    // Check row
    for (let c = 0; c < 9; c++) {
        if (board[row][c] === num) {
            return false;
        }
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
        if (board[r][col] === num) {
            return false;
        }
    }
    
    // Check 3x3 box
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (board[r][c] === num) {
                return false;
            }
        }
    }
    
    return true;
}

// Solve the board using backtracking algorithm
function solveSudoku(board) {
    // Find next empty cell
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                // Try each number 1-9
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        
                        // Recursively solve the rest
                        if (solveSudoku(board)) {
                            return true;
                        }
                        
                        // Backtrack if no solution found
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    // All cells filled - puzzle solved
    return true;
}

// Solve the board dynamically and populate the UI
function solveBoard() {
    // Create a copy of the puzzle to solve
    let boardToSolve = easyPuzzle.map(row => [...row]);
    
    // Solve the puzzle
    if (solveSudoku(boardToSolve)) {
        // Populate the board with the solution
        for (let row = 0, fd = 1; row < 9; row++, fd++) {
            for (let col = 0, sd = 1; col < 9; col++, sd++) {
                let placement = fd.toString() + sd.toString();
                let inputElement = document.getElementById(placement);
                
                // Only fill empty cells (those not already readonly)
                if (!inputElement.readOnly) {
                    inputElement.value = boardToSolve[row][col];
                }
            }
        }
    } else {
        alert("Could not solve the puzzle!");
    }
}

// Initialize board when page loads
document.addEventListener('DOMContentLoaded', initializeBoard);

function checkSolution() {
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