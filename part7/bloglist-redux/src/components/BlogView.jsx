import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { increaseLike } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { initializeComments } from '../reducers/commentReducer'

import blogService from '../services/blogs'

import CommentForm from './CommentForm'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if(blog) {
      dispatch(initializeComments(blog.id))
    }
  }, [])

  const commentList = useSelector((state) => state.comments)

  if (!blog) {
    return null
  }

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

  const addComment = async (commentObject) => {
    try {
      console.log('commentObject :>> ', commentObject)
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

      <br />
      <h2>comments</h2>
      <CommentForm createComment={addComment} blogId={blog.id} />
      <ul>
        {commentList.map((comment) => (
          <li key={comment.id}>
            {comment.content}
          </li>
        ))}
      </ul>
    </>
  )
}

export default BlogView
