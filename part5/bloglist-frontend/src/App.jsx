import { useState, useEffect, useRef } from 'react'
import Message from './components/Message'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState(null)

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  //login form fields
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const blogsWithFlag = blogs.map(element => {
        return {
          ...element,
          show: false
        }
      })

      //order blogs by likes
      blogsWithFlag.sort((a, b) => b.likes - a.likes)

      setBlogs(blogsWithFlag)
    })
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

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} currentUser={user} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={increaseBlogLikes} removeBlog={confirmDeleteBlog} currentUser={user} />
      )}
    </>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)

      createdBlog.user = {
        username: user.username,
        name: user.name
      }

      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))

      //set message ok
      setMessageValues(true, `a new blog ${createdBlog.title} by ${createdBlog.author} added`)

    } catch (exception) {
      setMessageValues(false, exception.response.data.error)
    }
  }

  const increaseBlogLikes = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)

      //modify blog list
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog).sort((a, b) => b.likes - a.likes))

      //set message ok
      setMessageValues(true, `The blog '${updatedBlog.title}' by ${updatedBlog.author} increased likes`)

    } catch (exception) {
      setMessageValues(false, exception.response.data.error)
    }
  }

  const confirmDeleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog '${blogObject.title}' by ${blogObject.author}`)) {
      deleteBlog(blogObject)
      return
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)

      //remove blog from list
      setBlogs(blogs.filter(element => element.id !== blogObject.id).sort((a, b) => b.likes - a.likes))

      setMessageValues(true, `The blog '${blogObject.title}' by ${blogObject.author} was deleted successfully`)
    } catch (exception) {
      setMessageValues(false, exception.response.data.error)
    }
  }

  function setMessageValues(type, message) {
    setMessage(message)
    setIsSuccess(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {user === null ? loginForm() : blogList() }
    </div>
  )
}

export default App