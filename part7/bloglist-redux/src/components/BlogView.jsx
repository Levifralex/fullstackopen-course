import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { increaseLike } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { initializeComments, createComment } from '../reducers/commentReducer'

import blogService from '../services/blogs'
import commentService from '../services/comments'

import CommentForm from './CommentForm'

import { Button } from 'react-bootstrap'

import { Page } from '../styled-components'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (blog) {
      dispatch(initializeComments(blog.id))
    }
  }, [blog, dispatch])

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
      dispatch(createComment(commentObject))

      const isError = await commentService.getError()

      if (!isError) {
        dispatch(
          showNotification(
            {
              body: `a new comment added to the blog '${blog.title}' by ${blog.author}`,
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
        <h1>
          {blog.title} {blog.author}{' '}
        </h1>
        <br />
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes{' '}
          <Button
            variant="primary"
            size="sm"
            onClick={() => changeBlogLikes(blog)}
          >
            like
          </Button>
        </div>
        <div>added by {blog.user.name}</div>

        <br />
        <h2>comments</h2>
        <CommentForm createComment={addComment} blogId={blog.id} />
        {commentList.length > 0 ? (
          <ul>
            {commentList.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </Page>
    </>
  )
}

export default BlogView
