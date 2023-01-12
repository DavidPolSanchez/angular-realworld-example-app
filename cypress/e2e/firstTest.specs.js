/// <reference types="cypress" />


describe('test with backend', () => {

    beforeEach('Login to the App',() => {

        cy.loginToApplication()
    })
    it('should log in ',() => {
        cy.log('All good maaate')
    })
    it.only('verify that add new article works ok',() => {

        cy.intercept('POST','https://api.realworld.io/api/articles/').as('postArticles')
        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('Example Title')
        cy.get('[formcontrolname="description"]').type('question')
        cy.get('[formcontrolname="body"]').type('Body')
        cy.get('[type="button"]').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then(xhr=> {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('Body')
            expect(xhr.response.body.article.description).to.equal('question')
        })
    })



})