angular.module('servicos', [])

.factory('operadoresUrl', function() {
    return 'http://localhost:8080/resources/operadores/'
})

.factory('pessoasUrl', function() {
    return 'http://localhost:8080/resources/pessoas/'
});