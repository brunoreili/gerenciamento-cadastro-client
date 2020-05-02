angular.module('gerenciamentocadastro').controller('CadastroPessoaController', function($scope, $http, $routeParams, pessoasUrl, telefonesUrl) {

    $scope.titulo = 'Cadastar Pessoa'
    $scope.pessoa = {};
    $scope.mensagem = '';
    $scope.countErros = 0;
    $scope.pessoaCadastrada = false;
    $scope.addTelefone = false;
    $scope.telefonesPendentes = false;
    $scope.telefones = [];

    if($routeParams.pessoaId) {
        $http.get(pessoasUrl + $routeParams.pessoaId)
        .success(function(pessoa) {
            $scope.pessoa = pessoa;
            $scope.pessoa.dataNascimento = new Date(pessoa.dataNascimento);
            $scope.titulo = 'Editar Pessoa'
        })
        .error(function(error) {
            console.log(error);
            window.location.href = "/pessoa/listar";
        });
    };

    $scope.submeter = function() {        
        if($scope.formulario.$valid) {
            
            const ObjPessoa = this.formatarObjPessoa($scope.pessoa);
            if(!$scope.pessoa.id && $scope.addTelefone) {           
                this.cadastrarPessoa(ObjPessoa, $scope.addTelefone);
                this.adicionarTelefone();
            }else if(!$scope.pessoa.id && !$scope.addTelefone) {
                this.cadastrarPessoa(ObjPessoa, $scope.addTelefone);
            }else if($scope.pessoa.id && !$scope.addTelefone) {
                this.editarPessoa(ObjPessoa);
            } else {
                this.adicionarTelefone();
            }        
        }
    };

    $scope.cadastrarPessoa = function(ObjPessoa, addTelefone) {
        $http({
            method: 'POST',
            url: pessoasUrl,
            data: ObjPessoa,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .success(function(idPessoa) {        
            if(addTelefone) {
                $scope.pessoa.id = idPessoa;
                $scope.pessoaCadastrada = true;
            } else {
                this.finalizarCadastro();
            }
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = "Não foi possível incluir a pessoa!";
        });
    };

    $scope.editarPessoa = function(ObjPessoa) {
        $http.put(pessoasUrl + $scope.pessoa.id, ObjPessoa)
        .success(function() {
            $scope.mensagem = "Pessoa editada com sucesso!";
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = "Não foi possível editar a pessoa!";
        });
    };

    $scope.voltarExcluindoPessoa = function() {      
        $http.delete(pessoasUrl + $scope.pessoa.id)
        .success(function() {
            window.location.href = "/pessoa/listar";
        })
        .error(function(error) {
            console.log(error);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível voltar!';
        });
    },

    $scope.cadastrarTelefone = function(objTelefone, posicaoTelefone) {
        $http({
            method: 'POST',
            url: telefonesUrl,
            data: objTelefone,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .success(function(idTelefone) {      
            $scope.telefones[posicaoTelefone].id = idTelefone;
            $scope.telefonesPendentes = false;
        })  
        .error(function(erro) {
            console.log(erro);
            $scope.countErros++;
            $scope.mensagem = "Não foi possível incluir o telefone!";
        });
    };

    $scope.excluirTelefone = function(telefone) {  
        const vm = this;
        $http.delete(telefonesUrl + telefone.id)
        .success(function() {
            vm.removerTelefone(telefone);
        })
        .error(function(error) {
            console.log(error);
            $scope.countErros++;
            $scope.mensagem = 'Não foi possível excluir o telefone!';
        });
    };

    $scope.adicionarTelefone = function() {
        const telefone = new Object({posicao: $scope.telefones.length, pendente: true});
        $scope.telefones.push(telefone);
        $scope.addTelefone = false;
        $scope.telefonesPendentes = true;
        $scope.formulario.$submitted = null;
    };

    $scope.incluirTelefone = function(telefone) {     
        telefone.pendente = false;

        const objTelefone = this.formatarObjTelefone(telefone);
        this.cadastrarTelefone(objTelefone, telefone.posicao);
    };

    $scope.removerTelefone = function(telefone) {
        const indiceTelefones = $scope.telefones.indexOf(telefone);
        $scope.telefonesPendentes = false;
        $scope.telefones[indiceTelefones].pendente = true;
        $scope.telefones.splice(indiceTelefones, 1);
    };

    $scope.finalizarCadastro = function() {
        $scope.pessoa = {};
        $scope.telefones = [];
        $scope.formulario.$submitted = null;
        $scope.mensagem = "Pessoa incluída com sucesso!";
    }

    $scope.formatarObjPessoa = function(pessoa) {               
        const ObjPessoa = {
            nome: pessoa.nome,
            documento: pessoa.documento,
            nomeMae: pessoa.nomeMae,
            nomePai: pessoa.nomePai,
            loginOperador: "Operador1",
            tipoPessoa: parseInt(pessoa.tipoPessoa),
            dataNascimento: pessoa.dataNascimento            
        };

        return ObjPessoa;
    };

    $scope.formatarObjTelefone = function(telefone) {               
        const ObjTelefone = {
            loginOperador: "operador1",
            ddd: "0" + telefone.ddd.toString(),
            numero: telefone.numero,
            tipo: parseInt(telefone.tipo),
            pessoaId: $scope.pessoa.id            
        };

        return ObjTelefone;
    };

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    };
})