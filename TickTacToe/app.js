var activeGame;

(function() {
  console.log("Hello From Tick Tack Toe!");

  var TickTackToe = function() {
    var game = {};
    game.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    game.player = "X";
    game.isOver = false;
    game.plays = 9;

    drawBoard = function() {
      var boardText = "";

      game.board.forEach(function(row) {
        row.forEach(function(column, index) {
          boardText += column;

          if (index != row.length - 1) {
            boardText += "|";
          }
        });

        boardText += "\r\n";
      });

      console.log(boardText);
      drawBoardHTML();
    };

    game.move = function(row, column) {
      if (game.isOver) {
        activeGame = new TickTackToe();
        return;
      }

      if (row < 0 || row > 2 || column < 0 || column > 2) {
        console.log("That square doen't exist.");
      } else {
        var boardPosition = game.board[row][column];

        if (boardPosition === " ") {
          game.board[row][column] = game.player;
          if (--game.plays === 0) {
            game.isOver = true;
          }
          if (!checkForWinner()) {
            game.player = game.player == "X" ? "O" : "X";
          }
        } else {
          console.log("Sorry that square is taken.");
        }
      }

      drawBoard();
    };

    drawBoardHTML = function() {
      var boardText = "<table>";

      game.board.forEach(function(row, rowIndex) {
        boardText += "<tr>";

        row.forEach(function(column, colIndex) {
          boardText +=
            "<td onClick='activeGame.move(" + rowIndex + "," + colIndex + ")'>";
          boardText += column;
          boardText += "</td>";
        });

        boardText += "</tr>";
      });

      boardText += "</table>";

      document.getElementById("boardDisplay").innerHTML = boardText;
    };

    checkForWinner = function() {
      var isWinner = false;

      for (var i = 0; i < 3; i++) {
        if (checkRow(i) || checkColumn(i)) {
          isWinner = true;
          break;
        }
      }

      if (isWinner || checkDiagnal()) {
        setTimeout(function() {
          alert("Player " + game.player + " WINS!");
        }, 25);

        game.isOver = true;
        return true;
      }

      return false;
    };

    checkRow = function(row) {
      if (
        game.board[row][0] == game.player &&
        game.board[row][1] == game.player &&
        game.board[row][2] == game.player
      ) {
        return true;
      }
    };

    checkColumn = function(column) {
      if (
        game.board[0][column] == game.player &&
        game.board[1][column] == game.player &&
        game.board[2][column] == game.player
      ) {
        return true;
      }
    };

    checkDiagnal = function() {
      if (
        game.board[0][0] == game.player &&
        game.board[1][1] == game.player &&
        game.board[2][2] == game.player
      ) {
        return true;
      }

      if (
        game.board[0][2] == game.player &&
        game.board[1][1] == game.player &&
        game.board[2][0] == game.player
      ) {
        return true;
      }
    };

    drawBoard();
    return game;
  };

  activeGame = new TickTackToe();
})();
