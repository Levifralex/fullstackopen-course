import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload

      const blogToChange = state.find((n) => n.id === id)

      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }

      const blogs = state.map((element) =>
        element.id !== id ? element : changedBlog
      )

      return [...blogs].sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((element) => element.id !== id)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      newBlog.user = {
        username: user.username,
        name: user.name,
      }
      dispatch(appendBlog(newBlog))
      blogService.setError(false)
    } catch (exception) {
      blogService.setError(true)
      dispatch(
        showNotification(
          {
            body: `Oops, something went wrong. Error: ${exception.response.data.error}`,
            isSuccess: false,
          },
          5
        )
      )
    }
  }
}

export const increaseLike = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch(updateBlog(updatedBlog.id))
      blogService.setError(false)
    } catch (exception) {
      blogService.setError(true)
      dispatch(
        showNotification(
          {
            body: `Oops, something went wrong. Error: ${exception.response.data.error}`,
            isSuccess: false,
          },
          5
        )
      )
    }
  }
}

export const deleteBlogx = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)

      dispatch(removeBlog(blog.id))
      blogService.setError(false)
    } catch (exception) {
      blogService.setError(true)
      dispatch(
        showNotification(
          {
            body: `Oops, something went wrong. Error: ${exception.response.data.error}`,
            isSuccess: false,
          },
          5
        )
      )
    }
  }
}

export default blogSlice.reducer
