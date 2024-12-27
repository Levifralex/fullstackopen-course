import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const textDetailStyle = {
    margin: 0
  }

  const [isShow, setIsShow] = useState(false)

  const showBlogDetail = (blog) => {
    blog.show = !blog.show
    setIsShow(blog.show)
  }

  const checkUser = (blog) => {
    return blog.user.username === currentUser.username
  }

  const changeBlogLikes = (blog) => {
    delete blog.user
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  const deleteBlog = (blog) => {
    removeBlog(blog)
  }

  const blogDetail = (blog) => (
    <div className='blogDetail'>
      <p style={textDetailStyle}>{blog.url}</p>
      <p style={textDetailStyle}>likes {blog.likes} <button onClick={() => changeBlogLikes(blog)}>like</button></p>
      <p style={textDetailStyle}>{blog.user.name}</p>
      {checkUser(blog) && deleteButton(blog)}
    </div>
  )

  const deleteButton = (blog) => (
    <>
      <p style={textDetailStyle}><button onClick={() => deleteBlog(blog)}>remove</button></p>
    </>
  )

  return (
    <div style={blogStyle} className='blogCard'>
      <div>
        {blog.title} {blog.author} <button onClick={() => showBlogDetail(blog)}>{isShow ? 'hide' : 'show'}</button>
        {isShow && blogDetail(blog)}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog