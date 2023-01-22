describe('Test log out',()=>{
    beforeEach('',()=>{
        cy.loginToApplication()
    })

    it('verify can log out corectly',()=>{
        cy.contains('Settings').click()
        cy.contains('Or click here to log out').click()
        cy.get('.navbar-nav').should('contain','Sign up')
    })
})