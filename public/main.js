const main = () => {
  document.querySelector('h1').textContent += '?'
}

angular
.module("minesweeperApp", [])
.controller("mainController", ($scope) => {

  $scope.greeting = 'Hello, World!'

});





document.addEventListener('DOMContentLoaded', main)

