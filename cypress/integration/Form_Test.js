describe('form test', function() {
    it('visit site', function() {
        cy.visit('http://localhost:3000/pizza')
      })
      it('test name input', function() {
        cy.get('[data-cy=name]').type('Brandon').should('have.value', 'Brandon')
      })
      it('test onion toppings', function() {
        cy.get('[data-cy=onions]').check().should('be.checked')
      })
      it('test pepperoni', function() {
        cy.get('[data-cy=pepperoni]').check().should('be.checked')
      })
      it('test pepperoni', function() {
        cy.get('[data-cy=peppers]').check().should('be.checked')
      })
      it('test submit', function() {
        cy.get('[data-cy=submit]').submit()
      })

})