import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import userListReducer from './userListReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: userListReducer,
  },
})

export default store
