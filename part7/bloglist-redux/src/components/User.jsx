import { Page } from '../styled-components'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <Page>
        {<h2>{user.name}</h2>}

        <h3>added blogs</h3>

        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </Page>
    </>
  )
}

export default User
