import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Page } from '../styled-components'

const UserList = () => {
  const usersList = useSelector((state) => state.users)

  return (
    <>
      <Page>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <strong>blogs created</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </>
  )
}

export default UserList
