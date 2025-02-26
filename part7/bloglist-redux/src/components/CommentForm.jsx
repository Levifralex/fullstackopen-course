import { useState } from 'react'

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
      <form data-testid="comment-form" onSubmit={addComment}>
        <input
          data-testid="comment-input"
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </>
  )
}

export default CommentForm