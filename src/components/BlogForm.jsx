import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    'title': '',
    'author': '',
    'url': ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      'title': '',
      'author': '',
      'url': ''
    }
    )
  }

  return(
    <div>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
            placeholder='title'
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
            placeholder='author'
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
            placeholder='url'
          />
        </div>
        <button id='submit-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm