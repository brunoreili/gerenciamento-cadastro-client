angular.module('gerenciamentocadastro').controller('PessoasController', function($scope, $http, pessoasUrl) {

    $scope.pessoas = [];
    $scope.mensagem = '';
    $scope.countErros = 0;

    $http.get(pessoasUrl)
    .success(function(pessoas) {
        $scope.pessoas = pessoas;
        console.log($scope.pessoas);
    })
    .error(function(error) {
        console.log(error);
        $scope.countErros++;
        $scope.mensagem = 'Não foi possível listar as pessoas!';
    });

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    }

});