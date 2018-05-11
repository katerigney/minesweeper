const main = () => {
  document.querySelector('h1').textContent += '?'
}

const layMinefield = () => {
  var minefield = {};
    minefield.rows = [];
    
    for(var i = 0; i < 9; i++) {
        var row = {};
        row.cells = [];
        
        for(var j = 0; j < 9; j++) {
            var cell = {
              isCovered: true,
              hadBomb: false,
              count: 0
            };            
            row.cells.push(cell);
        }
        
        minefield.rows.push(row);
    }
    
    return minefield;
}


angular
  .module("minesweeperApp", [])
  .controller("mainController", ($scope) => {

    $scope.gameTitle = 'Minesweeper! in Angular'

    $scope.minefield = layMinefield();


  });





document.addEventListener('DOMContentLoaded', main)

