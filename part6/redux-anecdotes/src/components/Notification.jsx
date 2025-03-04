import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: '2%',
    borderWidth: 1
  }

  if(notification.length === 0) {
    return (<></>)
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification;