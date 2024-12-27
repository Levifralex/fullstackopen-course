import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm event receives data correctly from form', async() => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  //get form inputs by id
  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  //get submit form button
  const sendButton = screen.getByText('create')

  //fill inputs and submit form
  await user.type(titleInput, 'Ut viverra, urna vel commodo accumsan')
  await user.type(authorInput, 'June Hood')
  await user.type(urlInput, 'https://example.com/php-rails-ppc')
  await user.click(sendButton)

  //validate data
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Ut viverra, urna vel commodo accumsan')
  expect(createBlog.mock.calls[0][0].author).toBe('June Hood')
  expect(createBlog.mock.calls[0][0].url).toBe('https://example.com/php-rails-ppc')

})