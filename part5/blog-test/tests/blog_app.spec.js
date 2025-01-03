const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, showBlogDetail } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty database here
    await request.post('/api/testing/reset')

    // create two users for the backend here
    await request.post('/api/users', {
        data: {
            name: 'Leonardo Villegas',
            username: 'levifralex',
            password: 'levifralex123'
        }
    })
    await request.post('/api/users', {
      data: {
          name: 'Jarvis Lara',
          username: 'jarvis',
          password: 'jarvis123'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = await page.locator('#login-form')

    await expect(loginForm.getByText('login')).toBeVisible()
    await expect(loginForm.getByTestId('username')).toBeVisible()
    await expect(loginForm.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'levifralex', 'levifralex123')

      await expect(page.getByText('Leonardo Villegas logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'levifralex', 'incorrecto')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Leonardo Villegas logged-in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'levifralex', 'levifralex123')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page, 
        'Ut nec ullamcorper ligula', 
        'Ernestine Ponce', 
        'https://example.com/azure-vue-ppc'
      )

      const errorDiv = await page.locator('.success')
      await expect(errorDiv).toContainText('a new blog Ut nec ullamcorper ligula by Ernestine Ponce added')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await expect(page.getByText('Ut nec ullamcorper ligula Ernestine Ponce')).toBeVisible()

    })

    describe('edit a blog', () => {
      beforeEach(async ({ page }) => {
        //add a new blog initialized with 0 likes
        await createBlog(
          page, 
          'Nam finibus - to edit', 
          'Norman Holland', 
          'https://example.com/flask-symfony-gitlab'
        )
      })

      test('a blog can be edited', async ({ page }) => {
  
        const blogCard = await page.locator('.blogCard')
  
        await blogCard.getByRole('button', { name: 'show' }).click()
  
        await blogCard.getByRole('button', { name: 'like' }).click()

        await expect(blogCard.getByText('likes 1')).toBeVisible()
  
      })
    })

    describe('delete a blog', () => {
      beforeEach(async ({ page }) => {
        //first add a new blog
        await createBlog(
          page, 
          'Nam finibus - to delete', 
          'Norman Holland', 
          'https://example.com/flask-symfony-gitlab'
        )
      })

      test('a blog can be deleted', async ({ page }) => {
        const blogCard = await page.locator('.blogCard')
  
        await blogCard.getByRole('button', { name: 'show' }).click()

        //first declare haddling for dialog
        page.on('dialog', async dialog => {
          //click OK button of confirm dialog
          await dialog.accept()
        })

        //click button that shows confirm dialog
        await blogCard.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Nam finibus - to delete Norman Holland')).not.toBeVisible()
        
      })
    })

    describe('delete button visibility', () => {
      beforeEach(async ({ page }) => {
        //first add a new blog
        await createBlog(
          page, 
          'Nam finibus - to view delete button', 
          'Norman Holland', 
          'https://example.com/flask-symfony-gitlab'
        )
      })

      test('delete button is only visible to the user that created the blog', async ({ page }) => {
        await showBlogDetail(page)
        await expect(page.getByText('remove')).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()

        //login with other user
        await loginWith(page, 'jarvis', 'jarvis123')
        await page.getByText(`Jarvis Lara logged-in`).waitFor()

        await showBlogDetail(page)
        await expect(page.getByText('remove')).not.toBeVisible()
      })
    })
    
    describe('blogs sorted', () => {
      beforeEach(async ({ page }) => {
        //first blog
        await createBlog(
          page, 
          'Etiam vel viverra eros', 
          'Joel Edwards', 
          'https://example.com/ux-azure-jenkins'
        )
        //second blog
        await createBlog(
          page, 
          'Quisque ut ligula in erat', 
          'Zack Jacobson', 
          'https://example.com/web-development-joomla-travis'
        )
        //third blog
        await createBlog(
          page, 
          'Nulla mattis cursus pellentesque', 
          'Daren Washington', 
          'https://example.com/flask-symfony-gitlab'
        )
      })
      
      test('blogs are sorted in descending order of likes', async ({ page }) => {
        const thirdBlog = await page.getByText('Nulla mattis cursus pellentesque Daren Washington')
        await thirdBlog.getByRole('button', { name: 'show' }).click()
        await thirdBlog.getByRole('button', { name: 'like' }).click()
        await thirdBlog.getByText('likes 1').waitFor()

        const secondBlog = await page.getByText('Quisque ut ligula in erat Zack Jacobson')
        await secondBlog.getByRole('button', { name: 'show' }).click()
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await secondBlog.getByText('likes 1').waitFor()

        await thirdBlog.getByRole('button', { name: 'like' }).click()
        await thirdBlog.getByText('likes 2').waitFor()

        //show all blogs with details
        const firstBlog = await page.getByText('Etiam vel viverra eros Joel Edwards')
        await firstBlog.getByRole('button', { name: 'show' }).click()

        //get all elements by testid (all blogs)
        const blogs = page.getByTestId('blogItem')

        //must be 3 blogs
        const blogCount = await blogs.count()
        expect(blogCount).toBe(3)

        //validate first one the most likes (2)
        expect(await blogs.nth(0).innerText()).toContain("Nulla mattis cursus pellentesque Daren Washington")

        //validate second one has 1 like
        expect(await blogs.nth(1).innerText()).toContain("Quisque ut ligula in erat Zack Jacobson")

        //validate third one has 0 likes
        expect(await blogs.nth(2).innerText()).toContain("Etiam vel viverra eros Joel Edwards")
      })
    })
  })


})