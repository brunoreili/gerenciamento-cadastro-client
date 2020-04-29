angular.module('gerenciamentocadastro').controller('CadastroOperadorController', function($scope, $http) {

    $scope.operador = {};

    $scope.submeter = function() {

        debugger;
        var objOperador = this.formatarObjOperador();
        console.log($scope.operador);

        $http.post('http://localhost:8080/resources/operadores', objOperador)
        .success(function() {
            alert("Operador cadastrado com sucesso!");
        })  
        .error(function(erro) {
            console.log(erro);
        });
    };

    $scope.formatarObjOperador = function() {
               
        var objOperador = {
            nome: $scope.operador.nome,
            login: $scope.operador.login,
            senha: $scope.operador.senha,
            perfil: $scope.operador.perfil
        };

        return objOperador;
    };
})