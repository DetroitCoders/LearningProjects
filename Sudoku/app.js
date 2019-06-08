function solveBoard() {
    var gameBoard = new Array(9);

    for (let row = 0; row < 9; row++) {
        gameBoard[row] = new Array(9);
        for (let col = 0; col < 9; col++) {
            gameBoard[row][col] = col + 1;
        }
    }

    for (let row = 0, fd = 1; row < 9; row++, fd++) {
        for (let col = 0, sd = 1; col < 9; col++, sd++) {
            let placement = fd.toString() + sd.toString();
            document.getElementById(placement).value = gameBoard[row][col];
        }
    }

    function checkRow(rowNumber) {
        var rowUnique = true;
        for (let col = 0; col < 9; col++) {
            // Check if number is in range.
            if (!checkNumInRange(gameBoard[rowNumber][col])) {
                rowUnique = false;
                break;
            }
    
            // Check if number is unique compared to the others.
            var numsUnique = true;
            for (let j = col + 1; (j + col) < 9; j++) {
                if (checkNumMatch(gameBoard[rowNumber][col], gameBoard[rowNumber][j])) {
                    numsUnique = false;
                    break;
                }
            }
            if(!numsUnique) {
                rowUnique = false;
                break;
            }
        }
    
        return rowUnique;
    }

    function checkBoard() {
        for (let row = 0; row < 9; row++) {
            if (!checkRow(row)) {
                return false;
            }
        }
        
        return true;
    }

    var isBoardUnique = checkBoard();

    alert("The fact the board is unique is: " + isBoardUnique);
}

function checkNumInRange(x) {
    if ((x > 9) || (x < 1)) {
        return false;
    }
    return true;
}

function checkNumMatch(x, y) {
    if (x === y) {
        return true;
    }
    return false;
}