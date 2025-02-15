import { useDispatch, useSelector } from 'react-redux'
import { increaseLike } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

import blogService from '../services/blogs'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  //const changeBlogLikes = (blog) => {
  /* const tempBlog = {
      ...blog,
    }
    delete tempBlog.user
    console.log('tempBlog :>> ', tempBlog) */
  /* console.log('blog :>> ', blog)
    blog.user = undefined
    console.log('blog :>> ', blog) */
  /* delete blog.user
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    } */

  /* console.log('updatedBlog :>> ', updatedBlog) */
  //updateBlog(updatedBlog)
  //}

  const changeBlogLikes = async (blogObject) => {
    try {
      const tempBlog = {
        ...blog,
      }
      delete tempBlog.user
      dispatch(increaseLike(tempBlog))

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

  return (
    <>
      <h1>
        {blog.title} {blog.author}{' '}
      </h1>
      <br />
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => changeBlogLikes(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </>
  )
}

export default BlogView
