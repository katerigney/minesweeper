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
    console.log(i);
  }
}

function calculate(minefield, row, col) {

  var currentCell = getCellCoordinates(minefield, row, col);

  if (currentCell.hasBomb == false) {
    //find the cells in the row -1 / +1 and the cells in the col -1 / +1
    for (var newRow = row - 1; newRow < row + 2; newRow++) {
      for (var newCol = col - 1; newCol < col + 2; newCol++) {
        if (newRow != row && newCol != col) {
          if (newRow >= 0 && newCol >= 0 && newRow < minefield.rows.length && newCol < minefield.rows[newRow].cells.length){
            
            var cellToCheck = getCellCoordinates(minefield, newRow, newCol);
            console.log({m:"checking", newRow, newCol, cellToCheck})
            if (cellToCheck.hasBomb) {
              currentCell.count++;
            }
          }
        }
      }
    }
  }
  //return currentCell.count;
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


  });





document.addEventListener('DOMContentLoaded', main)

