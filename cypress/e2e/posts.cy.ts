describe('Tests over /posts path', () => {
  beforeEach(() => {
    cy.fixture('invalid_content_post').as('invalidContentPost')
    cy.fixture('invalid_title_post').as('invalidTitlePost')
    cy.fixture('invalid_user_post').as('invalidUserPost')
    cy.fixture('post').as('post')
    cy.fixture('posts').as('posts')
    cy.fixture('user').as('user')
    cy.task('clearPosts')
    cy.task('clearUsers')
  })

  it('should save a valid post', function () {
    cy.task('saveUsers', [this.user])

    cy.request({ method: 'POST', url: '/posts', body: this.post }).then(
      ({ status, body }) => {
        expect(status).to.eq(201)
        cy.log(JSON.stringify(body))
      }
    )
  })

  it('should not save a post with invalid title', function () {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: this.invalidTitlePost,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })

  it('should not save a post with invalid content', function () {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: this.invalidContentPost,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })

  it('should not save a post with invalid user', function () {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: this.invalidUserPost,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })

  it('should not save a post with a nonexistent user', function () {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: this.post,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(403)
      cy.log(JSON.stringify(body))
    })
  })

  it('should return all posts of a given user', function () {
    cy.task('saveUsers', [this.user])

    this.posts.forEach((p: any) => {
      cy.request({ method: 'POST', url: '/posts', body: this.post })
    })

    cy.request({
      method: 'GET',
      url: `/posts/${this.user.email}`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      const { posts } = body
      expect(posts.length).to.eq(this.posts.length)
      cy.log(JSON.stringify(posts))
    })
  })

  it('should not return posts of nonexistent user', function () {
    cy.request({
      method: 'GET',
      url: '/posts/usuario@email.com',
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(404)
      cy.log(JSON.stringify(body))
    })
  })

  it('should not return posts when given an invalid user e-mail', function () {
    cy.request({
      method: 'GET',
      url: '/posts/usuario.email.com',
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      cy.log(JSON.stringify(body))
    })
  })
})
