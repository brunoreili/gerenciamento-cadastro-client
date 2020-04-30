angular.module('gerenciamentocadastro').controller('CadastroOperadorController', function($scope, $http) {

    $scope.operador = {};
    $scope.mensagem = '';
    $scope.countErros = 0;

    $scope.submeter = function() {        
        if($scope.formulario.$valid) {            
            const objOperador = this.formatarObjOperador();
            $http.post('http://localhost:8080/resources/operadoress', objOperador)
            .success(function() {
                $scope.operador = {};
                $scope.formulario.$submitted = null;
                $scope.mensagem = "Operador incluído com sucesso!";
            })  
            .error(function(erro) {
                debugger;
                console.log(erro);
                $scope.countErros++;
                $scope.mensagem = "Não foi possível incluir o operador!";
            });
        }
    };

    $scope.formatarObjOperador = function() {
               
        const objOperador = {
            nome: $scope.operador.nome,
            login: $scope.operador.login,
            senha: $scope.operador.senha,
            perfil: $scope.operador.perfil
        };

        return objOperador;
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    }
})