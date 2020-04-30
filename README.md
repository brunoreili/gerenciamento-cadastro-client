# PROJETO: gerenciamento-cadastro-client (avaliacao-mirante)
 Projeto realizado para a avaliação da Mirante

## Configurações iniciais

### Front-end
1. O front está num projeto separado da API do back-end, portanto é necessário rodar a aplicação em um outro servidor.

2. Está sendo utilizado um servidor local Node, para tanto, é nessecário a instalação do Node.js, que pode ser baixado através do site: https://nodejs.org/en/

3. Após a instalação do node.js é necessário baixar as dependências do projeto, no terminal, dentro da pasta do projeto basta executar o comando:
		npm install

4. Após baixar todas as dependências basta iniciar o servidor executando o comando:
		npm start

### OBSERVAÇÕES IMPORTANTES

1. #### CORS
- Na integração com o back-end, o sitema apresenta um bloqueio devido às políticas do CORS. 
Apensar de algumas tentativas com filtro ou passando Access-Control pelo header da requisição o problema persiste.
A solução paleativa (e temporárioa) foi utlizar uma extensão no navegador para evitar o bloqueio quando ativada.
Ex de extensão: "Allow CORS: Access-Control-Allow-Origin" podendo ser baixada pelo site: 
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf