/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Teste da Funcionalidade Produtos', () => {
    //variável
    let token
    before(() => {
        //passando o email, e o token gerado para uma variável
        cy.token('Samantha52@gmail.com', 'teste').then(tkn => { token = tkn })
    });

    //validar contrato que esta em contracts
    it('Deve validar contrato de produtos', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            //usando o conceito de otimizar o teste passando somente o rescurso na url e no aquivo
            //cypress.config.js é passado o link inteiro
            url: 'produtos'
            //validando um produto da lista
        }).then((response) => {
            //caminho dentro do expect, produto um produto especifico
            //expect(response.body.produtos[5].nome).to.equal('Celular Xiaomi note 19')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            //uma validação não funcional, tempo de duração de uma request em ms
            expect(response.duration).to.be.lessThan(15)
        })
    });

    it('Cadastrar produto', () => {
        //criando variável para gerar um número random com java script, para usar no nome do produto 
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": produto,
                "preco": 500,
                "descricao": "produto novo..",
                "quantidade": 100
            },
            //subistituindo pela variável token
            headers: { authorization: token }
            //validando com uma mensagem de retorno do body
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        //usnado comando customizado que esta em commands.js
        cy.cadastrarProduto(token, "Produto EBAC 8482", 250, "Descrição do produto novo", 180)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
            });
        // COMANDO ESTA ESTAR CUSTOMIZADO OUTRA FORMA DE FAZER!     
        // cy.request({
        //    method: 'POST',
        //    url: 'produtos',
        //    headers: { authorization: token },
        //    body: {
        //        //produto que existe na base
        //        "nome": "Produto EBAC 9980",
        //        "preco": 200,
        //        "descricao": "Produto novo",
        //        "quantidade": 100
        //    },
        //    //para que a mensagem não estoure, ao tentar cadastrar um produto que já existe
        //    failOnStatusCode: false
    });

    it('Deve editar um produto já cadastrado', () => {
        //pegando um produto da lista, utilizando a url base 
        cy.request('produtos').then(response => {
            //verificando o primeiro produto da lista, depois pegando por variável
            cy.log(response.body.produtos[0]._id)
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                //passando o token na request
                headers: { authorization: token },
                body: {
                    //não passar o nome de outro produto já existente.. pois ira retornar err
                    "nome": "Produto EBAC alexxa",
                    "preco": 500,
                    "descricao": "Produto editado",
                    "quantidade": 100
                }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });

    it('Deve editar um produto cadastrado previamente', () => {
        //copiado a função para adicioar um número ao nome assim não ira retornar erro para cadastrar um novo produto
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000)}`
        cy.cadastrarProduto(token, produto, 250, "Celular Xiaomi note 10", 10)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    //passando o token na request
                    headers: { authorization: token },
                    body: {
                        //não passar o nome de outro produto já existente.. pois ira retornar err
                        "nome": produto,
                        "preco": 500,
                        "descricao": "Produto editado",
                        "quantidade": 100
                    }
                }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
            })
    });

    it('Deve deletar um produto cadastrado previamente', () => {
        //copiado a função para adicioar um número ao nome assim não ira retornar erro para cadastrar um novo produto
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000)}`
        cy.cadastrarProduto(token, produto, 250, "Celular Xiaomi note 10", 10)
            .then(response => {
                let id = response.body._id
                //deletar o produto que acabamos de cadastrar
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: { authorization: token }
                }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
                })
            })
    });
});