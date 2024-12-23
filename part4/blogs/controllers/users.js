const usersRouter = require('express').Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  //validate password

  if(password.length < process.env.PASSWORD_LENGTH) {
    return response.status(400).json({ error: 'User validation failed: password: must have at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password: passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

module.exports = usersRouter