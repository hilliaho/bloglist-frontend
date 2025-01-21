import { useState } from "react"

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
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    removeBlog(blog)
  }

  const userOwnsBlog = user.username === blog.user.username

  return(
    <div style={blogStyle}>
    {!opened &&
  <div>
    {blog.title} {blog.author} <button onClick={toggle}>{buttonLabel}</button>
  </div>}
  {opened &&
  <div>
    <div>
      {blog.title} {blog.author} <button onClick={toggle}>{buttonLabel}</button>
    </div>
    <div>{blog.url}</div>
    <div>likes {blog.likes} <button onClick={like}>like</button></div>
    <div>{blog.user.name}</div>
    {userOwnsBlog && <div><button onClick={remove}>remove</button></div>}
  </div>}
  </div>
    ) 
}

export default Blog