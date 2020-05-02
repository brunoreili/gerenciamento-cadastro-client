angular.module('gerenciamentocadastro')
    .controller('CadastroOperadorController', function($scope, $http, $routeParams, $location, operadoresUrl) {

    $scope.countErros = 0;
    $scope.mensagem = '';
    $scope.titulo = 'Cadastar Operador'
    $scope.operador = {};

    $scope.msgValidacaoNome = 'O campo "Nome" é obrigatório';
    $scope.msgValidacaoLogin = 'O campo "Login" é obrigatório';
    $scope.msgValidacaoSenha = 'O campo "Senha" é obrigatório';
    $scope.msgValidacaoConfirmacao = 'O campo "Confirmação" é obrigatório';
    $scope.msgValidacaoPerfil = 'O campo "Perfil" é obrigatório';

    if($routeParams.operadorId) {
        $http.get(operadoresUrl + $routeParams.operadorId)
        .success(function(operador) {
            $scope.operador = operador;
            $scope.titulo = 'Editar Operador'
        })
        .error(function(error) {
            console.log(error);
            $location.path('/operador/listar');
        });
    };

    $scope.submeter = function() {
        if($scope.operador.confirmarSenha != ""  && $scope.operador.confirmarSenha != $scope.operador.senha) {
            $scope.operador.confirmarSenha = "";
            $scope.formulario.$valid = false;
            $scope.msgValidacaoConfirmacao = 'Campo "Confirmar Senha" e "Senha" são diferentes';           
        }
        
        if($scope.formulario.$valid) {            
            const objOperador = this.formatarObjOperador();
            if(!$scope.operador.id) {           
                this.incluirOperador(objOperador);
            } else {
                this.editarOperador(objOperador);
            }
        }
    };

    $scope.incluirOperador = function(objOperador) {
        $http({
            method: 'POST',
            url: operadoresUrl,
            data: objOperador,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .success(function() {
            $scope.operador = {};
            $scope.formulario.$submitted = null;
            $scope.mensagem = 'Operador incluído com sucesso!';
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível incluir o operador!';
        });
    };

    $scope.editarOperador = function(objOperador) {
        $http.put(operadoresUrl + $scope.operador.id, objOperador)
        .success(function() {
            $scope.mensagem = 'Operador editado com sucesso!';
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível editar o operador!';
        });
    };

    $scope.formatarObjOperador = function() {               
        const objOperador = {
            nome: $scope.operador.nome,
            login: $scope.operador.login,
            senha: $scope.operador.senha,
            perfil: parseInt($scope.operador.perfil)
        };

        return objOperador;
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    };

    $("#nome").on("input", function(){
        var regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if(!this.value.match(regex)) $scope.msgValidacaoNome = 'O campo "Nome" não deve possuir apenas números';
        if(this.value == "") $scope.msgValidacaoNome = 'O campo "Nome" é obrigatório';
    });

    $("#login").on("input", function(){
        var regex = /^[A-Za-z_-]+$/;
        if(!this.value.match(regex)) $scope.msgValidacaoLogin = 'O campo "Login" deve conter apenas "Letras", "-" ou "_"';
        if(this.value == "") $scope.msgValidacaoLogin = 'O campo "Login" é obrigatório';
    });

    $("#senha").on("input", function(){
        var regex = /^[^\ ]+$/;
        if(String(this.value).length) $scope.msgValidacaoSenha = 'O campo "Senha" deve conter de 6 a 15 caracteres';
        if(!this.value.match(regex)) $scope.msgValidacaoSenha = 'O campo "Senha" não deve conter espaços em branco';
        if(this.value == "") $scope.msgValidacaoSenha = 'O campo "Senha" é obrigatório';
    });

    $("#confirmar-senha").on("input", function(){
        var regex = /^[^\ ]+$/;
        if(String(this.value).length < 6) $scope.msgValidacaoConfirmacao = 'O campo "Confirmar Senha" deve conter de 6 a 15 caracteres';
        if(!this.value.match(regex)) $scope.msgValidacaoConfirmacao = 'O campo "Confirmar Senha" não deve conter espaços em branco';
        if(this.value == "") $scope.msgValidacaoConfirmacao = 'O campo "campo" é obrigatório';
    });
});