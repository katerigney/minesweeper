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
        isCovered: true,
        hasBomb: false,
        count: 0,
      };
      row.cells.push(cell);
    }
    minefield.rows.push(row);
  }
  putMines(minefield);
  getNumbers(minefield)
  return minefield;
}

const getCellCoordinates = (minefield, row, col) => {
  return minefield.rows[row].cells[col];
}

const putMines = (minefield) => {
  for (var i = 0; i < 10; i++) {
    var row = Math.round(Math.random() * 8);
    var col = Math.round(Math.random() * 8);
    var cell = getCellCoordinates(minefield, row, col);
    cell.hasBomb = true;
    //is it picking a cell that already has one? I am not taking redundant randoms into account 
    //BUG - SOMETIMES WILL SOMETIMES WON'T DISPLAY 10 - usually between 8-10
  }
}

const calculate = (minefield, row, col) => {
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

//APPROACH 1 FOR CLEARING EMPTY CELLS

// const clearEmptyCells = (minefield, row, col) => {

//   for (var newRow = row - 1; newRow <= row + 1; newRow++) {

//     for (var newCol = col - 1; newCol <= col + 1; newCol++) {

//       if (newRow >= 0 && newCol >= 0 && newRow < minefield.rows.length && newCol < minefield.rows[newRow].cells.length) {

//         var cellToCheck = getCellCoordinates(minefield, newRow, newCol);

//         if (cellToCheck.count > 0) {
//           cellToCheck.isCovered = false;
//         }
//         // // THIS WILL AT LEAST CLEAR FIRST ADJACENT CELLS
//         // if (cellToCheck.count == 0){
//         //   cellToCheck.isCovered = false;
//         // }
//         if (cellToCheck.count == 0){
//           cellToCheck.isCovered = false;
//           clearEmptyCells(minefield, newRow, newCol);
//         }
//       }
//     }
//   }
// }


//APPROACH 2 FOR CLEARING EMPTY CELLS - isn't getting error but still not clearing everything

const clearEmptyCells = (minefield, row, col) => {

  var closeCells = [];

  for (var newRow = row - 1; newRow <= row + 1; newRow++) {

    for (var newCol = col - 1; newCol <= col + 1; newCol++) {

      if (newRow >= 0 && newCol >= 0 && newRow < minefield.rows.length && newCol < minefield.rows[newRow].cells.length) {

        var cellToCheck = getCellCoordinates(minefield, newRow, newCol);
        closeCells.push(cellToCheck);
      }
    }
  }

  for (var i = 0; i < closeCells.length; i++) {
    if (closeCells[i].count == 0 || !closeCells[i].hasBomb) {
      closeCells[i].isCovered = false;
      clearEmptyCells(minefield, newRow, newCol)
      //THIS REVEALS BOMBS -WHAAAT?
    }
  }
}


const getNumbers = (minefield) => {
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

    $scope.showCellContent = (cell, row, col) => {
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
          clearEmptyCells($scope.minefield, row, col);
        }
        if ($scope.clickCount == 71) {
          $scope.playerWon = true;
        }
      }
    };

    $scope.resetGame = () => {
      location.reload();
      //want a better solution for this...not sure how to call layMinefield here but then $scope.minefield would not have content
    }

  });

document.addEventListener('DOMContentLoaded', main)

