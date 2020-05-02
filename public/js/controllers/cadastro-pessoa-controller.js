angular.module('gerenciamentocadastro')
    .controller('CadastroPessoaController', function($scope, $http, $routeParams, $location, pessoasUrl, telefonesUrl) {

    $scope.countErros = 0;
    $scope.mensagem = '';
    $scope.titulo = 'Cadastar Pessoa'
    $scope.pessoa = {};
    $scope.telefones = [];
    $scope.pessoaCadastrada = false;
    $scope.addTelefone = false;
    $scope.telefonesPendentes = false;

    $scope.msgValidacaoNome = 'O campo "Nome" é obrigatório';
    $scope.msgValidacaoTipoPessoa = 'O campo "Tipo de Pessoa" é obrigatório';
    $scope.msgValidacaoDocumento = 'O campo "Documento" é obrigatório';
    $scope.msgValidacaoDataNascimento = 'O campo "Data de Nascimento" é obrigatório';
    $scope.msgValidacaoPai = '';
    $scope.msgValidacaoMae = '';

    if($routeParams.pessoaId) {
        $http.get(pessoasUrl + $routeParams.pessoaId)
        .success(function(pessoa) {
            $scope.pessoa = pessoa;
            $scope.pessoa.dataNascimento = new Date(pessoa.dataNascimento);
            $scope.telefones = pessoa.telefones;
            $scope.titulo = 'Editar Pessoa'
        })
        .error(function(error) {
            console.log(error);
            $location.path('/pessoa/listar');
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
            $location.path('/pessoa/listar');
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

    $scope.verificarRegrasEspeciais = function() {
        $scope.formulario.$valid = $scope.msgValidacaoPai ? false : true;
        $scope.formulario.$valid = $scope.msgValidacaoMae ? false : true;
        this.submeter();
    }

    $scope.fecharAlerta = function() {
        $scope.mensagem = '';
        $scope.countErros = 0;
    };

    $('#fisica').mask('000.000.000-00');
    $('#juridica').mask('000.000.000/0000-00');

    $('[type="date"]#data-nascimento').prop('max', function(){
        return new Date().toJSON().split('T')[0];
    });
    
    $("#nome").on("input", function(){
        var regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if(!this.value.match(regex)) $scope.msgValidacaoNome = 'O campo "Nome" não deve conter números';
        if(this.value == "") $scope.msgValidacaoNome = 'O campo "Nome" é obrigatório';
    });

    $("#nome-pai").on("input", function(){
        var regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if(!this.value.match(regex)) $scope.msgValidacaoPai = 'O campo "Nome do Pai" não deve conter números';
        if(this.value == "") $scope.msgValidacaoPai = '';
    });

    $("#nome-mae").on("input", function(){
        var regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if(!this.value.match(regex)) $scope.msgValidacaoMae = 'O campo "Nome da Mãe" não deve conter números';
        if(this.value == "") $scope.msgValidacaoMae = '';
    });
});