angular.module('servicos', [])

.factory('loginUrl', function() {
    return 'http://localhost:8080/resources/autenticacao/'
})

.factory('operadoresUrl', function() {
    return 'http://localhost:8080/resources/operadores/'
})

.factory('pessoasUrl', function() {
    return 'http://localhost:8080/resources/pessoas/'
})

.factory('telefonesUrl', function() {
    return 'http://localhost:8080/resources/telefones/'
});