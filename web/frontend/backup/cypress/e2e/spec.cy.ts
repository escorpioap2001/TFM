describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/inicio')
    cy.contains('DiscoEstu')
  })
})
