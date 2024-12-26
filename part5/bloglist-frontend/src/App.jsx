import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Message from './components/Message'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  
  //login form fields
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  //blog form fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h1>log in to application</h1>

      <Message isSuccess={isSuccess} body={message} />

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageValues(false, 'Wrong credentials')
    }
  }

  const blogList = () => (
    <>
      <h1>blogs</h1>
      
      <Message isSuccess={isSuccess} body={message} />
      
      <p>{user.name} logged-in <button type='button' onClick={() => handleLogout()}>logout</button></p>

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const blogForm = () => (
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
      <br/>
    </>
  )

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      
      const blogObject = {
        title,
        author,
        url
      }

      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

      //set message ok
      setMessageValues(true, `a new blog ${title} by ${author} added`)

    } catch (exception) {
      setMessageValues(false, 'Wrong credentials')
    }
  }

  function setMessageValues(type, message) {
    setMessage(message);
    setIsSuccess(type);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  return (
    <div>
      {user === null ? loginForm() : blogList() }
    </div>
  )
}

export default App