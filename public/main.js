const main = () => {
  document.querySelector('h1').textContent += '?'
}

const layMinefield = () => {
  var minefield = {};
  minefield.rows = [];

  for (var i = 0; i < 9; i++) {
    var row = {};
    row.cells = [];

    for (var j = 0; j < 9; j++) {
      var cell = {
        // CHANGE IS COVERED BACK TO TRUE!
        isCovered: true,
        hasBomb: false,
        count: 0
      };
      row.cells.push(cell);
    }
    minefield.rows.push(row);
  }
  putMines(minefield);
  getNumbers(minefield)
  return minefield;
}

//change function type
function getCellCoordinates(minefield, row, col) {
  return minefield.rows[row].cells[col];
}

//change function type
function putMines(minefield) {
  for (var i = 0; i < 10; i++) {
    var row = Math.round(Math.random() * 8);
    var col = Math.round(Math.random() * 8);
    var cell = getCellCoordinates(minefield, row, col);
    cell.hasBomb = true;
    //is it picking a cell that already has one? I am not taking redundant randoms into account 
    //BUG - SOMETIMES WILL SOMETIMES WON'T DISPLAY 10 - usually between 8-10
  }
}

//change function type
function calculate(minefield, row, col) {
  var currentCell = getCellCoordinates(minefield, row, col);
  if (currentCell.hasBomb == false) {

    for (var newRow = row - 1; newRow <= row + 1; newRow++) {

      for (var newCol = col - 1; newCol <= col + 1; newCol++) {

        if (newRow >= 0 && newCol >= 0 && newRow < minefield.rows.length && newCol < minefield.rows[newRow].cells.length) {

          var cellToCheck = getCellCoordinates(minefield, newRow, newCol);

          if (cellToCheck.hasBomb) {
            currentCell.count++;
          }
        }
      }
    }
  }
}

//change function type
function getNumbers(minefield) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      calculate(minefield, i, j);
    }
  }
}

const getBombs = (minefield) => {
  var bombs = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var cellToCheck = getCellCoordinates(minefield, i, j);
      if (cellToCheck.hasBomb) {
        bombs.push(cellToCheck);
      }
    }
  }
  return bombs;
}

angular
  .module("minesweeperApp", [])
  .controller("mainController", ($scope) => {

    $scope.gameTitle = 'Minesweeper! in Angular!'

    $scope.minefield = layMinefield();

    $scope.clickCount = 0;

    $scope.showCellContent = (cell) => {
      cell.isCovered = false;

      if (cell.hasBomb) {
        $scope.playerLost = true;
        var bombs = getBombs($scope.minefield);
        for (var i = 0; i < bombs.length; i++) {
          bombs[i].isCovered = false;
        }
      } else {
        $scope.clickCount++;
        if (cell.count == 0) {
          //do something cool with recursion
        }
        if ($scope.clickCount == 71) {
          $scope.playerWon = true;
        }
      }
    };

  });





document.addEventListener('DOMContentLoaded', main)

