const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.post('/', async (request, response) => {
  const body = request.body

  body.blog = request.body.blog_id
  delete body.blog_id

  const comment = new Comment(body)

  const savedComment = await comment.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter