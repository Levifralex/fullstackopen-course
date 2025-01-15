import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h1>create new</h1>
      <form data-testid='blog-form' onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
          />
        </div>
        <div>
          author
          <input
            data-testid='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
          />
        </div>
        <div>
          url
          <input
            data-testid='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
          />
        </div>
        <br/>
        <button id="blog-button" type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
