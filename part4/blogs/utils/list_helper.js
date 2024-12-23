const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

//total number of likes in all blog publications
const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  )
}

const favoriteBlog = (blogs) => {
  let blog = blogs.reduce(
    (accumulator, currentValue) =>
      currentValue.likes > accumulator.likes ? currentValue : accumulator,
    blogs[0]
  )

  delete blog._id
  delete blog.url
  delete blog.__v

  return blog
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, blogs: value.length }))
    .value()

  const authorMostBlogs = blogsByAuthor.reduce(
    (accumulator, currentValue) =>
      currentValue.blogs > accumulator.blogs ? currentValue : accumulator,
    blogsByAuthor[0]
  )

  return authorMostBlogs
}

const mostLikes = (blogs) => {
  const likesByAuthor = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      likes: totalLikes(value)
    }))
    .value()

  const authorMostLikes = likesByAuthor.reduce(
    (accumulator, currentValue) =>
      currentValue.likes > accumulator.likes ? currentValue : accumulator,
    likesByAuthor[0]
  )

  return authorMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
