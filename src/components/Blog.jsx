import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [buttonLabel, setButtonLabel] = useState('view')
  const [opened, setOpened] = useState(false)

  const toggle = () => {
    if (opened) {
      setButtonLabel('view')
      setOpened(false)
    } else {
      setButtonLabel('hide')
      setOpened(true)
    }
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog)
    }
  }

  const userOwnsBlog = user.username === blog.user.username

  return(
    <div style={blogStyle}>
      {!opened &&
      <div>
        {blog.title} {blog.author} <button id='view-button' onClick={toggle}>{buttonLabel}</button>
      </div>}
      {opened &&
      <div>
        <div>
          {blog.title} {blog.author} <button onClick={toggle}>{buttonLabel}</button>
        </div>
        <div id='url'>{blog.url}</div>
        <div id='likes'>likes {blog.likes} <button id='like-button' onClick={like}>like</button></div>
        <div id='name'>{blog.user.name}</div>
        {userOwnsBlog && <div><button onClick={remove}>remove</button></div>}
      </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  updateBlog: propTypes.func.isRequired,
  removeBlog: propTypes.func.isRequired,
  user: propTypes.object.isRequired
}

export default Blog