angular.module('gerenciamentocadastro')
    .controller('OperadoresController', function($scope, $http, operadoresUrl) {

    $scope.countErros = 0;
    $scope.mensagem = '';
    $scope.operadores = [];

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
        const vm = this;       
        $http.delete(operadoresUrl + operador.id)
        .success(function() {
            vm.removerOperadores(operador);
            $scope.mensagem = 'Operador foi removido com sucesso!';
        })
        .error(function(error) {
            console.log(error);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível excluir o operador!';
        });
    };

    $scope.removerOperadores = function(operador) {
        const indiceOperador = $scope.operadores.indexOf(operador);
        $scope.operadores.splice(indiceOperador, 1);
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    };
    
});