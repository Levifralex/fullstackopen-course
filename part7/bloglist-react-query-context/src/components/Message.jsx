import PropTypes from 'prop-types'

const Message = ({ isSuccess, body }) => {
  if (body === null) {
    return null
  }

  return <div className={isSuccess ? 'success' : 'error'}>{body}</div>
}

Message.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  body: PropTypes.string,
}

export default Message
