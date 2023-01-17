/// <reference types="cypress" />


describe('test with backend', () => {

    beforeEach('Login to the App',() => {
        //2.only
        cy.intercept('GET','https://api.realworld.io/api/tags',{fixture:'tags.json'})
        //
        cy.loginToApplication()
    })
    it('should log in ',() => {
        cy.log('All good maaate')
    })
    it('1.verify that add new article works ok',() => {

        cy.intercept('POST','https://api.realworld.io/api/articles/').as('postArticles')
        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('Example Title')
        cy.get('[formcontrolname="description"]').type('question')
        cy.get('[formcontrolname="body"]').type('Body')
        cy.get('[type="button"]').click()

        cy.wait('@postArticles').then(xhr=> {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('Body')
            expect(xhr.response.body.article.description).to.equal('question')
        })
    })
    it.only('2.verify popular tags are displayed', ()=>{
        console.log('we log in successfully')
        cy.get('.tag-list')
        .should('contain','Cypress')
        .and('contain','Json')
        .and('contain','Example')
        .and('contain','Mocking')
        .and('contain','items')
        .and('contain','request')

    })

    it.only('verify global feed article likes', () =>{
        cy.intercept('GET','https://api.realworld.io/api/articles/feed*',{"articles":[],"articlesCount":0})
        cy.intercept('GET','https://api.realworld.io/api/articles*',{fixture:'articles.json'})

        cy.contains('Global Feed').click()
        cy.get('app-article-list button').then(btnheartList =>{
            expect(btnheartList[0]).to.contain('1')
            expect(btnheartList[1]).to.contain('5')

        })
    })



})
