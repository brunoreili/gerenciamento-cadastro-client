angular.module('gerenciamentocadastro')
    .controller('CadastroOperadorController', function($scope, $http, $routeParams, $location, operadoresUrl) {

    $scope.countErros = 0;
    $scope.mensagem = '';
    $scope.titulo = 'Cadastar Operador'
    $scope.operador = {};

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
});