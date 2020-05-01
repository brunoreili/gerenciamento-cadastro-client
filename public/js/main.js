angular.module('gerenciamentocadastro', ['ngRoute', 'servicos'])
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
        controller: 'CadastroOperadorController'
    });

    $routeProvider.when('/operadores/edit/:operadorId', {
        templateUrl: 'partials/cadastroOperador.html',
        controller: 'CadastroOperadorController'
    });

    $routeProvider.when('/pessoas', {
        templateUrl: 'partials/pessoas.html',
        controller: 'PessoasController'
    });

    $routeProvider.when('/pessoas/new', {
        templateUrl: 'partials/cadastroPessoa.html',
        controller: 'CadastroPessoaController'
    });

    $routeProvider.when('/pessoas/edit/:pessoaId', {
        templateUrl: 'partials/cadastroPessoa.html',
        controller: 'CadastroPessoaController'
    });
    
    $routeProvider.otherwise({ redirectTo: '/login' });
});