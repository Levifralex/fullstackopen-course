import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification.length === 0) {
    return (<></>)
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
