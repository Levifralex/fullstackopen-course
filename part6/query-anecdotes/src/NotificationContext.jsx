/* eslint-disable react/prop-types */
import  { createContext, useReducer, useContext } from 'react'

/**
 * "reducer"
 */
const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET":
          return action.payload
      case "CLEAR":
          return ""
      default:
          return state
    }
}

const NotificationContext = createContext()

/**
 * notification provider
 */
export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "")
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}
  
// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
  }

export default NotificationContext