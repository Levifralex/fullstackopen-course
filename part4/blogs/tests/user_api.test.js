const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
/* const bcrypt = require('bcrypt')
const User = require('../models/user') */

describe('verify that invalid users are not created and return appropriate status code', () => {

  beforeEach(async () => {
    /* await User.deleteMany({})

    const password = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', password })
    await user.save() */
  })

  test('creation fails with proper statuscode and message if username have incorrect length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'yo',
      name: 'Leonardo',
      password: 'levifralex',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    console.log('usersAtStart.length :>> ', usersAtStart.length)
    console.log('usersAtEnd.length :>> ', usersAtEnd.length)

    assert(result.body.error.includes('User validation failed: username:'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('password have incorrect length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jair',
      name: 'Jair',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    console.log('usersAtStart.length :>> ', usersAtStart.length)
    console.log('usersAtEnd.length :>> ', usersAtEnd.length)

    assert(result.body.error.includes('User validation failed: password:'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})