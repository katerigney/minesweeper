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
        isCovered: false,
        hasBomb: false,
        count: 0
      };
      row.cells.push(cell);
    }
    minefield.rows.push(row);
  }
  putMines(minefield);
  getNumbers(minefield)
  console.log(minefield);
  return minefield;
}

function getCellCoordinates(minefield, row, col) {
  return minefield.rows[row].cells[col];
}

function putMines(minefield) {
  for (var i = 0; i < 10; i++) {
    var row = Math.round(Math.random() * 8);
    var col = Math.round(Math.random() * 8);
    var cell = getCellCoordinates(minefield, row, col);
    cell.hasBomb = true;
    //BUG - ON THIRD OR SO REFRESH WILL LOOP 10X BUT WILL ONLY DISPLAY 9 BOMBS
  }
}

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

function getNumbers(minefield) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      calculate(minefield, i, j);
    }
  }
}

angular
  .module("minesweeperApp", [])
  .controller("mainController", ($scope) => {

    $scope.gameTitle = 'Minesweeper! in Angular!'

    $scope.minefield = layMinefield();

    $scope.clickCount = 0;

    $scope.showCellContent = (cell) => {
      //cell.isCovered = false;
      
      if(cell.hasBomb) {
          $scope.playerLost = true; 
          //display all cells hasBomb
      } else {
          $scope.clickCount++;
          console.log($scope.clickCount);
          if($scope.clickCount == 71) {
              $scope.playerWon = true;
          }
      } 
  };

  });





document.addEventListener('DOMContentLoaded', main)

