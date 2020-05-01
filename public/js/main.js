angular.module('gerenciamentocadastro', ['ngRoute', 'servicos'])
.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
    });

    $routeProvider.when('/operador/listar', {
        templateUrl: 'partials/operadores.html',
        controller: 'OperadoresController'
    });

    $routeProvider.when('/operador/cadastrar', {
        templateUrl: 'partials/cadastroOperador.html',
        controller: 'CadastroOperadorController'
    });

    $routeProvider.when('/operador/editar/:operadorId', {
        templateUrl: 'partials/cadastroOperador.html',
        controller: 'CadastroOperadorController'
    });

    $routeProvider.when('/pessoa/listar', {
        templateUrl: 'partials/pessoas.html',
        controller: 'PessoasController'
    });

    $routeProvider.when('/pessoa/cadastrar', {
        templateUrl: 'partials/cadastroPessoa.html',
        controller: 'CadastroPessoaController'
    });

    $routeProvider.when('/pessoa/editar/:pessoaId', {
        templateUrl: 'partials/cadastroPessoa.html',
        controller: 'CadastroPessoaController'
    });
    
    $routeProvider.otherwise({ redirectTo: '/login' });
});