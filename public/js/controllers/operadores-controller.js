angular.module('gerenciamentocadastro').controller('OperadoresController', function($scope, $http) {

    $scope.operadores = [];

    $http.get('http://localhost:8080/resources/operadores')
    .success(function(operadores) {
        $scope.operadores = operadores;
    })
    .error(function(error) {
        console.log(error);
    });
});