angular.module('gerenciamentocadastro')
    .controller('LoginController', function($scope, $http, $location, loginUrl) {

    $scope.countErros = 0;
    $scope.mensagem = '';
    $scope.usuario = {};

    $scope.autenticar = function() {
        $http({
            method: 'POST',
            url: loginUrl,
            data: $scope.usuario,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .success(function() {
            $location.path('/');
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = "Não foi possível realizar o login!";
        });
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    };
});