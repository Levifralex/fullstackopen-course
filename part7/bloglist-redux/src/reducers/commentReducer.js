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
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setComments, appendComment } = commentSlice.actions

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await blogService.getBlogComments(blogId)
    dispatch(setComments(comments))
  }
}

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      const newComment = await commentService.createComment(comment)
      dispatch(appendComment(newComment))
      commentService.setError(false)
    } catch (exception) {
      commentService.setError(true)
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