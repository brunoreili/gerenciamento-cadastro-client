angular.module('gerenciamentocadastro').controller('OperadoresController', function($scope, $http, operadoresUrl) {

    $scope.operadores = [];
    $scope.mensagem = '';
    $scope.countErros = 0;

    $http.get(operadoresUrl)
    .success(function(operadores) {
        $scope.operadores = operadores;
    })
    .error(function(error) {
        console.log(error);
        $scope.countErros++;
        $scope.mensagem = 'Não foi possível listar os operadores!';
    });

    $scope.excluir = function(operador) {
        
        $http.delete(operadoresUrl + operador.id)
        .success(function() {
            var indiceOperador = $scope.operadores.indexOf(operador);
            $scope.operadores.splice(indiceOperador, 1);
            $scope.mensagem = 'Operador foi removido com sucesso!';
        })
        .error(function(error) {
            console.log(error);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível excluir o operador!';
        });
    }

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    }
});