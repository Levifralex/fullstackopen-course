import { useState, useEffect, useRef } from 'react'
import Menu from './components/Menu'
import Message from './components/Message'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/userListReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const user = useSelector((state) => state.user)
  const userList = useSelector((state) => state.users)
  const blogList = useSelector((state) => state.blogs)

  //login form fields
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h1>log in to application</h1>

      <Message />

      <form id="login-form" onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        showNotification(
          {
            body: 'Wrong credentials',
            isSuccess: false,
          },
          5
        )
      )
    }
  }

  const matchUser = useMatch('/users/:id')

  const selectedUser = matchUser
    ? userList.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/notes/:id')
  const selectedBlog = matchBlog
    ? blogList.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <>
      {user === null ? (
        loginForm()
      ) : (
        <>
          <Menu />

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User user={selectedUser} />} />
            <Route
              path="/notes/:id"
              element={<BlogView blog={selectedBlog} />}
            />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
