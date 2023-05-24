// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/** realizando uma customização para o email gerando email automático*/
/** esta comando ira gerar o token conforme as informações necessiras da api */

Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        //url base esta configurado no cypress.config.js
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
        //primeira validação status code 200
    }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Login realizado com sucesso')
        //cy log método que ira retorna o que for solicitado
        //cy.log('Teste passou até aqui!!! ')
        //pegamos o valor que esta no Yielded -> body -> authorization
        return response.body.authorization
    })
})

/** otimizando o cadastrar produtos */
Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
    cy.request({
        method: 'POST',
        url: 'produtos',
        //subistituindo pela variável token
        headers: { authorization: token },
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        //para que a mensagem não estoure, ao tentar cadastrar um produto que já existe
        failOnStatusCode: false
    })
})