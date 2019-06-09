function solveBoard() {
    var gameBoard = [
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
            let numsUnique = true;
            for (let j = col + 1; j < 9; j++) {
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

    function checkColumn(colNumber) {
        var colUnique = true;
        for (let row = 0; row < 9; row++) {
            if (!checkNumInRange(gameBoard[row][colNumber])) {
                colUnique = false;
                alert("Number not in range");
                break;
            }

            let numsUnique = true;
            for (let j = row + 1; j < 9; j++) {
                if (checkNumMatch(gameBoard[row][colNumber], gameBoard[j][colNumber])) {
                    numsUnique = false;
                    alert("Row " + row + " is equal to " + j);
                    break;
                }
            }
            if(!numsUnique) {
                colUnique = false;
                break;
            }
        }

        return colUnique;
    }

    function checkBoard() {
        for (let x = 0; x < 9; x++) {
            if (!checkRow(x)) {
                return false;
            }
            if (!checkColumn(x)) {
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