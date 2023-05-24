///<reference types="cypress" />

describe('Login - Teste da API ServRest', () => {
    
    it.only('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                "email": "Samantha52@gmail.com",
                "password": "teste"
            } 
           //primeira validação status code 200
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            //cy log método que ira retorna o que for solicitado
            cy.log('Teste passou até aqui!!! ')
            //pegamos o valor que esta no Yielded -> body -> authorization
            cy.log(response.body.authorization)
        })
    });  
});