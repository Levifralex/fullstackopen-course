import { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import { Form, Button, Row, Col } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url,
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <h1>create new</h1>

        <Form id="blog-form" data-testid="blog-form" onSubmit={addBlog}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>title:</Form.Label>
                <Form.Control
                  data-testid="title"
                  id="title-input"
                  type="text"
                  name="title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>author:</Form.Label>
                <Form.Control
                  data-testid="author"
                  id="author-input"
                  type="author"
                  name="author"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>url:</Form.Label>
                <Form.Control
                  data-testid="url"
                  id="url-input"
                  type="url"
                  name="url"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <br />
          <Button id="blog-button" variant="primary" type="submit">
            create
          </Button>
        </Form>
      </div>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
