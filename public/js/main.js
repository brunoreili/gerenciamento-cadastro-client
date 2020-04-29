angular.module('gerenciamentocadastro', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
    });

    $routeProvider.when('/operadores', {
        templateUrl: 'partials/operadores.html',
        controller: 'OperadoresController'
    });

    $routeProvider.when('/operadores/new', {
        templateUrl: 'partials/cadastroOperador.html',
    });
    
    $routeProvider.otherwise({ redirectTo: '/login' });
});