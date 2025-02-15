import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5,
  }

  const logoutButton = {
    marginLeft: 5,
  }

  const menuStyle = {
    backgroundColor: '#d3d3d3',
    padding: 4,
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(clearUser())
    window.location.reload()
  }

  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} logged in
      <button style={logoutButton} type="button" onClick={() => handleLogout()}>
        logout
      </button>
    </div>
  )
}

export default Menu
