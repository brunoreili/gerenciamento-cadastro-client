angular.module('gerenciamentocadastro').controller('CadastroOperadorController', function($scope, $http) {

    $scope.operador = {};
    $scope.mensagem = '';
    $scope.countErros = 0;

    $scope.submeter = function() {        
        if($scope.formulario.$valid) {            
            var objOperador = this.formatarObjOperador();
            // $http.post('http://localhost:8080/resources/operadores', objOperador)
            $http({
                method: 'POST',
                url: 'http://localhost:8080/resources/operadores',
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
                $scope.mensagem = "Operador incluído com sucesso!";
            })  
            .error(function(erro) {
                console.log(erro);
                $scope.countErros++;
                $scope.mensagem = "Não foi possível incluir o operador!";
            });
        }
    };

    $scope.formatarObjOperador = function() {
               
        var objOperador = {
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
    }
})