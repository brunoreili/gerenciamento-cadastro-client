angular.module('gerenciamentocadastro').controller('OperadoresController', function($scope, $http) {

    $scope.operadores = [];
    $scope.mensagem = '';

    $http.get('http://localhost:8080/resources/operadores')
    .success(function(operadores) {
        $scope.operadores = operadores;
    })
    .error(function(error) {
        $scope.mensagem = 'Não foi possível listar os operadores!';
        console.log(error);
    });
});