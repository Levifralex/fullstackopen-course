import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

const CommentForm = ({ createComment, blogId }) => {
  const [content, setContent] = useState('')

  const addComment = (event) => {
    event.preventDefault()

    const commentObject = {
      content,
      blog_id: blogId,
    }

    createComment(commentObject)

    setContent('')
  }

  return (
    <>
      <Form className='w-50' id="comment-form" data-testid="comment-form" onSubmit={addComment}>
        <InputGroup className="mb-3">
          <Form.Control
            data-testid="comment-input"
            type="text"
            name="comment-input"
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <Button id="comment-button" variant="primary" type="submit">
            add comment
          </Button>
        </InputGroup>
      </Form>
    </>
  )
}

export default CommentForm
