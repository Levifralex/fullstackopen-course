import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, updateBlog, removeBlog }) => {
  const blogStyle = {
    marginBottom: 15,
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  }

  const textDetailStyle = {
    margin: 0,
  }

  const deleteBlog = (blog) => {
    removeBlog(blog)
  }

  const deleteButton = (blog) => (
    <>
      <p style={textDetailStyle}>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </p>
    </>
  )

  return (
    <Card style={blogStyle}>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>Author: {blog.author}</Card.Text>
        <Button variant="primary">
          <Link to={`/notes/${blog.id}`} style={linkStyle}>
            Go to blog
          </Link>
        </Button>
      </Card.Body>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
