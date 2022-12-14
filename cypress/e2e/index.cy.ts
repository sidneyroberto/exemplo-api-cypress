describe('Tests over API index', () => {
  it('should return welcome message', () => {
    cy.request({ method: 'GET', url: '/' }).then(({ body }) => {
      expect(body).to.eq('Exemplo de testes de API com Cypress')
    })
  })
})
