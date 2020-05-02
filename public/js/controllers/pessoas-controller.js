angular.module('gerenciamentocadastro').controller('PessoasController', function($scope, $http, pessoasUrl) {

    $scope.pessoas = [];
    $scope.mensagem = '';
    $scope.countErros = 0;

    $http.get(pessoasUrl)
    .success(function(pessoas) {
        $scope.pessoas = pessoas;
    })
    .error(function(error) {
        console.log(error);
        $scope.countErros++;
        $scope.mensagem = 'Não foi possível listar as pessoas!';
    });

    $scope.excluir = function(pessoa) {        
        $http.delete(pessoasUrl + pessoa.id)
        .success(function() {
            var indicePessoa = $scope.pessoas.indexOf(pessoa);
            $scope.pessoas.splice(indicePessoa, 1);
            $scope.mensagem = 'Pessoa foi removido com sucesso!';
        })
        .error(function(error) {
            console.log(error);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível excluir a pessoa!';
        });
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    };

});