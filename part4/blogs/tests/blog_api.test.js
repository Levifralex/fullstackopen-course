const { test, describe, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  /* let users = await helper.usersInDb()
  console.log('users :>> ', users)
  let user = users[0] */

  const password = await bcrypt.hash('1234', 10)
  const user = new User({ username: 'demo', password })
  await user.save()

  for (let blog of helper.initialBlogs) {
    blog.user = user.id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})

/*const generateToken = async () => {

  const responseAuthentication = await api
    .post('/api/login')
    .send(helper.loginUser)

  console.log('responseAuthentication :>> ', responseAuthentication.body)

  return responseAuthentication.body.token
}*/

describe('blog api', () => {

  describe('list blogs', () => {

    test('verify application returns the correct number of blogs', async () => {
      const blogs = await helper.blogsInDb()
      console.log('blogs.length :>> ', blogs.length)
      console.log('helper.initialBlogs.length :>> ', helper.initialBlogs.length)
      assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })

    test('gives each blog an "id" field', async () => {
      const blogs = await helper.blogsInDb()

      blogs.forEach(blog => {
        assert('id' in blog)
      })
    })

  })

  describe('addition of a new blog', async () => {

    //const token = await generateToken()

    test('a valid blog can be added ', async () => {

      const loggedInUser = await api
        .post('/api/login')
        .send(helper.loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const token = loggedInUser.body.token

      const newBlog = {
        'title': 'Dummy title',
        'author': 'Leonardo Villegas',
        'url': 'https://fullstackopen.com/es/part4/probando_el_backend',
        'likes': 2
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const authors = blogsAtEnd.map(n => n.author)

      assert(authors.includes('Leonardo Villegas'))
    })

    test('blog without likes on request', async () => {

      const loggedInUser = await api
        .post('/api/login')
        .send(helper.loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const token = loggedInUser.body.token

      const newBlog = {
        'title': 'Dummy title',
        'author': 'Dummy author',
        'url': 'https://fullstackopen.com/es/part4/probando_el_backend',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const blogWithoutLikes = blogsAtEnd.find(
        (blog) => blog.title === 'Dummy title' && blog.author === 'Dummy author'
      )

      assert.strictEqual(blogWithoutLikes.likes, 0)

    })

    test('blog without title & url is not added', async () => {

      const loggedInUser = await api
        .post('/api/login')
        .send(helper.loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const token = loggedInUser.body.token

      const newBlog = {
        'author': 'levifralex',
        'likes': 10
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })

  })

  test('delete a blog', async () => {
    //const token = await generateToken()
    const loggedInUser = await api
      .post('/api/login')
      .send(helper.loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = loggedInUser.body.token

    const blogsStartList = await helper.blogsInDb()
    const blogToDelete = blogsStartList[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsFinalList = await helper.blogsInDb()

    assert.strictEqual(blogsFinalList.length, helper.initialBlogs.length - 1)

    const ids = blogsFinalList.map(r => r.id)
    assert(!ids.includes(blogToDelete.id))

  })

  test('update a blog', async () => {
    const blogsStartList = await helper.blogsInDb()
    const blogToUpdate = blogsStartList[0]

    const updateBlog = {
      title: 'Prueba',
      author: 'Prueba',
      url: 'http://prueba.html',
      likes: 10
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const blogUpdated = blogsAtEnd.find(
      (blog) => blog.title === updateBlog.title && blog.author === updateBlog.author
    )

    assert.strictEqual(blogUpdated.likes, updateBlog.likes)

  })

})

after(async () => {
  await mongoose.connection.close()
})