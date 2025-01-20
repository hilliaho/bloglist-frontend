import { useState } from "react"

const Blog = ({ blog }) => {
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
    console.log('liked')
  }

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
    <div>{blog.likes} <button onClick={like}>like</button></div>
    <div>{blog.user.name}</div>
  </div>}
  </div>
    ) 
}

export default Blog