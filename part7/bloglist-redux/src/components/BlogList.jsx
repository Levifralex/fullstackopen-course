import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import Message from './Message'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'
import { createBlog, increaseLike, deleteBlogx } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

import { Page } from '../styled-components'

const BlogList = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  const blogsList = useSelector((state) =>
    state.blogs
      .map((element) => ({
        ...element,
        show: false,
      }))
      .sort((a, b) => b.likes - a.likes)
  )

  const increaseBlogLikes = async (blogObject) => {
    try {
      dispatch(increaseLike(blogObject))

      const isError = await blogService.getError()

      if (!isError) {
        dispatch(
          showNotification(
            {
              body: `The blog '${blogObject.title}' by ${blogObject.author} increased likes`,
              isSuccess: true,
            },
            5
          )
        )
      }
    } catch (exception) {
      console.error('exception :>> ', exception)
    }
  }

  const confirmDeleteBlog = async (blogObject) => {
    if (
      window.confirm(
        `Remove blog '${blogObject.title}' by ${blogObject.author}`
      )
    ) {
      deleteBlog(blogObject)
      return
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      dispatch(deleteBlogx(blogObject))

      const isError = await blogService.getError()

      if (!isError) {
        dispatch(
          showNotification(
            {
              body: `The blog '${blogObject.title}' by ${blogObject.author} was deleted successfully`,
              isSuccess: true,
            },
            5
          )
        )
      }
    } catch (exception) {
      console.error('exception :>> ', exception)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject, user))

      const isError = await blogService.getError()

      if (!isError) {
        blogFormRef.current.toggleVisibility()
        dispatch(
          showNotification(
            {
              body: `a new blog ${blogObject.title} by ${blogObject.author} added`,
              isSuccess: true,
            },
            5
          )
        )
      }
    } catch (exception) {
      console.error('exception :>> ', exception)
    }
  }

  return (
    <>
      <Page>
        <h1>blogs</h1>

        <Message />

        {
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} currentUser={user} />
          </Togglable>
        }

        {blogsList.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={increaseBlogLikes}
            removeBlog={confirmDeleteBlog}
            currentUser={user}
          />
        ))}
      </Page>
    </>
  )
}

export default BlogList
