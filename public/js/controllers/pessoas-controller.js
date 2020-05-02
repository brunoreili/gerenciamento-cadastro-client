angular.module('gerenciamentocadastro')
    .controller('PessoasController', function($scope, $http, pessoasUrl) {

    $scope.countErros = 0;
    $scope.mensagem = '';
    $scope.pessoas = [];

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
        const vm = this;       
        $http.delete(pessoasUrl + pessoa.id)
        .success(function() {
            vm.removerPessoa(pessoa);
            $scope.mensagem = 'Pessoa foi removido com sucesso!';
        })
        .error(function(error) {
            console.log(error);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível excluir a pessoa!';
        });
    };

    $scope.removerPessoa = function(pessoa) {
        const indicePessoa = $scope.pessoas.indexOf(pessoa);
            $scope.pessoas.splice(indicePessoa, 1);
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    };

});