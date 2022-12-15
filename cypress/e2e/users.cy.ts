describe('Tests over /users path', () => {
  beforeEach(() => {
    cy.fixture('invalid_birthday_user1').as('invalidBirthdayUser1')
    cy.fixture('invalid_birthday_user2').as('invalidBirthdayUser2')
    cy.fixture('invalid_email_user').as('invalidEmailUser')
    cy.fixture('invalid_name_user').as('invalidNameUser')
    cy.fixture('user').as('user')
    cy.fixture('users').as('users')
    cy.task('clearUsers')
  })

  it('should save a valid user', function () {
    cy.request({ method: 'POST', url: '/users', body: this.user }).then(
      ({ status, body }) => {
        expect(status).to.eq(201)
        cy.log(JSON.stringify(body))
      }
    )
  })

  it('should not save an user with an invalid name', function () {
    cy.request({
      method: 'POST',
      url: '/users',
      body: this.invalidNameUser,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })

  it('should not save an user with an invalid e-mail', function () {
    cy.request({
      method: 'POST',
      url: '/users',
      body: this.invalidEmailUser,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })

  it('should not save an user with a future birthday', function () {
    cy.request({
      method: 'POST',
      url: '/users',
      body: this.invalidBirthdayUser1,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })

  it('should not save an user with an invalid birthday format', function () {
    cy.request({
      method: 'POST',
      url: '/users',
      body: this.invalidBirthdayUser2,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })

  it('should return all saved users', async function () {
    cy.task('saveUsers', this.users)
    cy.request({ method: 'GET', url: '/users' }).then(({ status, body }) => {
      expect(status).to.eq(200)
      const { users } = body
      expect(users.length).to.eq(4)
      cy.log(JSON.stringify(users))
    })
  })
})
