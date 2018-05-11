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

  putMine(minefield);

  return minefield;


}

function getCellCoordinates(minefield, row, col) {
  return minefield.rows[row].cells[col];
}

function putMine(minefield) {
  for (var i = 0; i < 10; i++) {
    var row = Math.round(Math.random() * 8);
    var col = Math.round(Math.random() * 8);
    var cell = getCellCoordinates(minefield, row, col);
    cell.hasBomb = true;
    //BUG - ON THIRD OR SO REFRESH WILL LOOP 10X BUT WILL ONLY DISPLAY 9 BOMBS
    console.log(i);
  }
}

angular
  .module("minesweeperApp", [])
  .controller("mainController", ($scope) => {

    $scope.gameTitle = 'Minesweeper! in Angular!'

    $scope.minefield = layMinefield();


  });





document.addEventListener('DOMContentLoaded', main)

