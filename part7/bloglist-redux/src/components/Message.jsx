import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Message = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.body === null || notification.body === undefined) {
    return null
  }

  return (
    <Alert variant={notification.isSuccess ? 'success' : 'danger'}>
      {notification.body}
    </Alert>
  )
}

export default Message
