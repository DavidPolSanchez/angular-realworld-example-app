describe('Test log out',()=>{
    beforeEach('',()=>{
        cy.loginToApplication()
    })

    it('verify can log out corectly',{retries:2},()=>{
        cy.contains('Settings').click()
        cy.contains('Or click here to logout').click()
        cy.get('.navbar-nav').should('contain','Sign up')
    })
})