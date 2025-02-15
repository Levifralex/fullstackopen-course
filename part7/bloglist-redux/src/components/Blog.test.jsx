import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog component />', () => {
  test('show only title and author but not url and likes', () => {
    const blog = {
      title: 'Donec ultrices semper lectus ut imperdiet',
      author: 'Odessa Crane',
      url: 'https://example.com/svn-ux-mvc',
      likes: 6,
      user: {
        username: 'levifralex',
        name: 'Leonardo Villegas',
      },
    }

    const authenticatedUser = {
      username: 'levifralex',
      name: 'Leonardo Villegas',
    }

    const { container } = render(
      <Blog blog={blog} currentUser={authenticatedUser} />
    )

    const div = container.querySelector('.blogCard')

    expect(div).toHaveTextContent('Donec ultrices semper lectus ut imperdiet')
    expect(div).toHaveTextContent('Odessa Crane')
    expect(div).not.toHaveTextContent('https://example.com/svn-ux-mvc')
    expect(div).not.toHaveTextContent('likes 6')
  })

  test('show url and likes only when click show button', async () => {
    const blog = {
      title: 'Donec ultrices semper lectus ut imperdiet',
      author: 'Odessa Crane',
      url: 'https://example.com/svn-ux-mvc',
      likes: 6,
      user: {
        username: 'levifralex',
        name: 'Leonardo Villegas',
      },
    }

    const authenticatedUser = {
      username: 'levifralex',
      name: 'Leonardo Villegas',
    }

    const { container } = render(
      <Blog blog={blog} currentUser={authenticatedUser} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.blogDetail')

    expect(div).toHaveTextContent('https://example.com/svn-ux-mvc')
    expect(div).toHaveTextContent('likes 6')
  })

  test('validate if like button is clicked twice the function is called twice', async () => {
    const blog = {
      title: 'Donec ultrices semper lectus ut imperdiet',
      author: 'Odessa Crane',
      url: 'https://example.com/svn-ux-mvc',
      likes: 6,
      user: {
        username: 'levifralex',
        name: 'Leonardo Villegas',
      },
    }

    const authenticatedUser = {
      username: 'levifralex',
      name: 'Leonardo Villegas',
    }

    const mockHandler = vi.fn()

    render(
      <Blog
        blog={blog}
        currentUser={authenticatedUser}
        updateBlog={mockHandler}
      />
    )

    //click button to show detail
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    //click like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
