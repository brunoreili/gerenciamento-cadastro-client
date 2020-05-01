angular.module('gerenciamentocadastro').controller('CadastroPessoaController', function($scope, $http, $routeParams, pessoasUrl) {

    $scope.titulo = 'Cadastar Pessoa'
    $scope.pessoa = {};
    $scope.mensagem = '';
    $scope.countErros = 0;

    if($routeParams.pessoaId) {
        $http.get(pessoasUrl + $routeParams.pessoaId)
        .success(function(pessoa) {
            $scope.pessoa = pessoa;
            $scope.pessoa.dataNascimento = new Date(pessoa.dataNascimento);
            $scope.titulo = 'Editar Pessoa'
        })
        .error(function(error) {
            console.log(error);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível buscar a pessoa para edição!';
        });
    };

    $scope.submeter = function() {        
        if($scope.formulario.$valid) {
            
            var ObjPessoa = this.formatarObjPessoa();
            if(!$scope.pessoa.id) {           
                this.incluirPessoa(ObjPessoa);
            } else {
                this.editarPessoa(ObjPessoa);
            }
        
        }
    };

    $scope.incluirPessoa = function(ObjPessoa) {
        $http({
            method: 'POST',
            url: pessoasUrl,
            data: ObjPessoa,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .success(function() {
            $scope.pessoa = {};
            $scope.formulario.$submitted = null;
            $scope.mensagem = "Pessoa incluída com sucesso!";
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = "Não foi possível incluir a pessoa!";
        });
    };

    $scope.editarPessoa = function(ObjPessoa) {
        $http.put(pessoasUrl + $scope.pessoa.id, ObjPessoa)
        .success(function() {
            $scope.mensagem = "Pessoa editada com sucesso!";
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = "Não foi possível editar a pessoa!";
        });
    };

    $scope.formatarObjPessoa = function() {               
        var ObjPessoa = {
            nome: $scope.pessoa.nome,
            documento: $scope.pessoa.documento,
            nomeMae: $scope.pessoa.nomeMae,
            nomePai: $scope.pessoa.nomePai,
            loginOperador: "Operador1",
            tipoPessoa: parseInt($scope.pessoa.tipoPessoa),
            dataNascimento: $scope.pessoa.dataNascimento            
        };

        return ObjPessoa;
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    }
})