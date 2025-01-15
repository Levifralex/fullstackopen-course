describe('Blog app', function() {
  beforeEach(function() {
    // vacía la base de datos aquí
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // crea un usuario para el backend aquí
    const firstUser = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, firstUser)

    const secondUser = {
      name: 'Jarvis Lara',
      username: 'jarvis',
      password: 'jarvis123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)

    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application').parent().as('loginForm')

    cy.get('@loginForm').should('contain', 'login')
    cy.get('@loginForm').should('contain', 'username')
    cy.get('@loginForm').should('contain', 'password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in to application').click()
      cy.get('[data-testid="username"]').type('mluukkai')
      cy.get('[data-testid="password"]').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in to application').click()
      cy.get('[data-testid="username"]').type('mluukkai')
      cy.get('[data-testid="password"]').type('incorrect')
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      
      cy.get('[data-testid="title"]').type('Ut nec ullamcorper ligula')
      cy.get('[data-testid="author"]').type('Ernestine Ponce')
      cy.get('[data-testid="url"]').type('https://example.com/azure-vue-ppc')
      cy.get('#blog-button').click()

      cy.get('.success')
        .should('contain', 'a new blog Ut nec ullamcorper ligula by Ernestine Ponce added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

    })

    it('A user can like a blog', function(){

      cy.contains('new blog').click()
      
      cy.get('[data-testid="title"]').type('Nam finibus - to edit')
      cy.get('[data-testid="author"]').type('Norman Holland')
      cy.get('[data-testid="url"]').type('https://example.com/flask-symfony-gitlab')
      cy.get('#blog-button').click()

      cy.get('.blogCard').as('blog')
      cy.get('@blog').contains('show').click()
      cy.get('@blog').contains('like').click()
      cy.get('@blog').contains('likes 1')

    })

    it('A user can delete a blog', function(){

      cy.contains('new blog').click()
      
      cy.get('[data-testid="title"]').type('Nam finibus - to delete')
      cy.get('[data-testid="author"]').type('Norman Holland')
      cy.get('[data-testid="url"]').type('https://example.com/flask-symfony-gitlab')
      cy.get('#blog-button').click()

      cy.on('window:confirm', (str) => {
        return true
      })

      cy.get('.blogCard').as('blog')
      cy.get('@blog').contains('show').click()
      cy.get('@blog').contains('remove').click()

      cy.get('html').should('not.contain', 'Nam finibus - to delete Norman Holland')
    })

    describe('Delete button visibility', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
      
        cy.get('[data-testid="title"]').type('Nam finibus - to view delete button')
        cy.get('[data-testid="author"]').type('Norman Holland')
        cy.get('[data-testid="url"]').type('https://example.com/flask-symfony-gitlab')
        cy.get('#blog-button').click()
      })

      it('Delete button is only visible to the user that created the blog', function(){
        //check if button is visible for current authenticated user
        cy.get('.blogCard').as('blog')
        cy.get('@blog').contains('show').click()
        cy.contains('remove')

        //logout
        cy.contains('logout').click()

        //login with other user
        cy.login({ username: 'jarvis', password: 'jarvis123' })

        //check if button is not visible for new user
        cy.get('.blogCard').as('blog')
        cy.get('@blog').contains('show').click()
        cy.get('@blog').should('not.contain', 'remove')
      })
    })

    describe('Blogs sorted', () => {
      beforeEach(function () {
        //first blog
        cy.createBlog({ 
          title: 'Etiam vel viverra eros', 
          author: 'Joel Edwards',
          url: 'https://example.com/ux-azure-jenkins'
        })
       
        //second blog
        cy.createBlog({ 
          title: 'Quisque ut ligula in erat',
          author: 'Zack Jacobson',
          url: 'https://example.com/web-development-joomla-travis'
        })

        //third blog
        cy.createBlog({ 
          title: 'Nulla mattis cursus pellentesque',
          author: 'Daren Washington',
          url: 'https://example.com/flask-symfony-gitlab'
        })

      })

      it('Blogs are sorted in descending order of likes', function(){
        
        cy.get('.blogCard').contains('Nulla mattis cursus pellentesque Daren Washington').as('thirdBlog')
        cy.get('@thirdBlog').contains('show').click()
        cy.get('@thirdBlog').contains('like').click()
        cy.get('@thirdBlog').contains('likes 1')

        cy.get('.blogCard').contains('Quisque ut ligula in erat Zack Jacobson').as('secondBlog')
        cy.get('@secondBlog').contains('show').click()
        cy.get('@secondBlog').contains('like').click()
        cy.get('@secondBlog').contains('likes 1')

        cy.get('@thirdBlog').contains('like').click()
        cy.get('@thirdBlog').contains('likes 2')

        cy.get('.blogCard').contains('Etiam vel viverra eros Joel Edwards').as('firstBlog')
        cy.get('@firstBlog').contains('show').click()

        cy.get('.blogCard').eq(0).should('contain', 'Nulla mattis cursus pellentesque Daren Washington')
        cy.get('.blogCard').eq(1).should('contain', 'Quisque ut ligula in erat Zack Jacobson')
        cy.get('.blogCard').eq(2).should('contain', 'Etiam vel viverra eros Joel Edwards')

      })
    })
  })
})