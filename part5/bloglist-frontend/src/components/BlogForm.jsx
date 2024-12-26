import { useState } from 'react'

const BlogForm = ({ createBlog, currentUser }) => {
  
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

    createBlog(blogObject, currentUser)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br/>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
