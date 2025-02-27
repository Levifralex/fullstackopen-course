import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(clearUser())
    window.location.reload()
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={user.name + ' logged in'}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#" onClick={() => handleLogout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Menu
