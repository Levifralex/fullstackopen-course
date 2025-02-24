import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    createComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setComments, createComment } = commentSlice.actions

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await blogService.getBlogComments(blogId)
    dispatch(setComments(comments))
  }
}

export const createCommentx = (blog, comment) => {
  return async (dispatch) => {
    try {
      const newComment = await commentService.createComment(comment)
      dispatch(createComment(newComment))
    } catch (exception) {
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

export default commentSlice.reducer