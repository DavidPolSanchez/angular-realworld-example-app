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
    it('2.verify popular tags are displayed', ()=>{
        console.log('we log in successfully')
        cy.get('.tag-list')
        .should('contain','Cypress')
        .and('contain','Json')
        .and('contain','Example')
        .and('contain','Mocking')
        .and('contain','items')
        .and('contain','request')

    })

    it('verify global feed article likes', () =>{
        cy.intercept('GET','https://api.realworld.io/api/articles/feed*',{"articles":[],"articlesCount":0})
        cy.intercept('GET','https://api.realworld.io/api/articles*',{fixture:'articles.json'})

        cy.contains('Global Feed').click()
        cy.get('app-article-list button').then(btnheartList =>{
            expect(btnheartList[0]).to.contain('1')
            expect(btnheartList[1]).to.contain('5')

        })

        cy.fixture('articles.json').then( file => {
            const articleLink= file.articles[1].slug
            file.articles[1].favoritesCount = 6 
            cy.intercept('POST','https://api.realworld.io/api/articles/'+articleLink+'/favorite',file)
            
        })

        cy.get('app-article-list button').eq(1).click().should('contain','6')
        
    })

    it.only('delete new artcile on global (feed insert data)',()=>{
        
        const bodyRequest  = {
            "article": {
                "tagList": [],
                "title": "Hola campeon",
                "description": "ieieie",
                "body": "funcioné"
            }
        }

        cy.get('@token').then( token => {
            cy.request({
                url: 'https://conduit.productionready.io/api/articles/',
                headers: {'Authorization': 'Token ' + token},
                method:'POST',
                body:bodyRequest
            }).then(response=>{
                expect(response.status).to.equal(200)
            })
            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().click()
            cy.get('.article-actions').contains('Delete Article').click()

            cy.request({
                url: 'https://conduit.productionready.io/api/articles/',
                headers: {'Authorization': 'Token ' + token},
                method:'GET',
                

            }).its('body').then(bodyResponse=>{
                expect(bodyResponse.articles[0].title).not.to.equal('Hola campeon')

            })
        })
    })

})