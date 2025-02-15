import { useSelector } from 'react-redux'

const Message = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.body === null || notification.body === undefined) {
    return null
  }

  return (
    <div className={notification.isSuccess ? 'success' : 'error'}>
      {notification.body}
    </div>
  )
}

export default Message
