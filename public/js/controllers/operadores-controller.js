angular.module('gerenciamentocadastro').controller('OperadoresController', function($scope, $http) {

    $scope.operadores = [];

    $http.get('http://localhost:8080/gerenciamentocadastro-0.0.1-SNAPSHOT/resources/operadores')
    .success(function(operadores) {
        $scope.operadores = operadores;
    })
    .catch(function(error) {
        console.log(error);
    });

});