const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

  const body = request.body

  const user = request.user
  body.user = user.id

  const blog = new Blog(body)

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user

  const blog = await Blog.findById(request.params.id)
  /* console.log('blog :>> ', blog) */

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'token invalid for this user' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedNote)

})

module.exports = blogsRouter
