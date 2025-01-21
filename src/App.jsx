import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    'content': null,
    'type': null
  })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON =
    window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      window.location.reload()
    } catch (exception) {
      setNotification({
        'content': 'wrong credentials',
        'type': 'error'
      })
      notificationTimeout()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const notificationTimeout = () => {
    setTimeout(() => {
      setNotification({
        'content': null,
        'type': null
      })
    }, 5000)
  }

  const validate = (newBlog) => {
    if (!newBlog.title) {
      setNotification({
        'content': 'Title is required',
        'type': 'error'
      })
      notificationTimeout()
      return false
    } else if (!newBlog.author) {
      setNotification({
        'content': 'Author is required',
        'type': 'error'
      })
      notificationTimeout()
      return false
    } else if (newBlog.author.length < 2) {
      setNotification({
        'content': 'Minimum length for author is 2',
        'type': 'error'
      })
      notificationTimeout()
      return false
    } else if (newBlog.url.length < 4) {
      setNotification({
        'content': 'Minimum length for url is 4',
        'type': 'error'
      })
      notificationTimeout()
      return false
    }
    return true
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    if (validate(newBlog)) {
      try {
        const returnedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(returnedBlog))
        setNotification({
          'content': `a new blog ${newBlog.title} by ${newBlog.author} added`,
          'type': 'success'
        })
        notificationTimeout()
      } catch (error) {
        setNotification({
          'content': `Error adding blog: ${error}`,
          'type': 'error'
        })
        notificationTimeout()
      }
    }
  }

  const updateBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog)
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
    } catch (error) {
      setNotification({
        'content': `Error updating blog: ${error}`,
        'type': 'error'
      })
      notificationTimeout()
    }
  }

  const removeBlog = async (blog) => {
    try {
      blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      setNotification({
        'content': `Error deleting blog: ${error}`,
        'type': 'error'
      })
      notificationTimeout()
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const compareLikes = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) {
      return 1
    } else if (blog2.likes < blog1.likes) {
      return -1
    }
    return 0
  }

  const blogList = () => {
    return(
      <div>
        {blogs.sort(compareLikes).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
        )}
      </div>
    )
  }

  const info = () => {
    return(
      <div>
        <h2>blogs</h2>
        <span>{user.name} logged in </span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      {user &&
        <div>
          {info()}
          {<Notification notification={notification}/>}
          {
            <Togglable buttonLabel='add blog' ref={blogFormRef}>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
          }
          {blogList()}
        </div>
      }
      {!user &&
        <div>
          {loginForm()}
        </div>
      }
    </div>
  )
}

export default App