const main = () => {
  document.querySelector('h1').textContent += '?'
}

angular
.module("minesweeperApp", [])
.controller("mainController", ($scope) => {

  $scope.layMinefield = () => {
    //for 9x make a row array?
      //nested for 9x make a cell array?
        var cell = {
          hasBomb: false,
          isRevealed: false,
          count: 0
        };
  }

  //$scope.gameBoard = layMinefield();
    $scope.greeting = 'Hello, World!'

});





document.addEventListener('DOMContentLoaded', main)

