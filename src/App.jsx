import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    'title': '',
    'author': '',
    'url': ''
  })
  const [notification, setNotification] = useState({
    'content': null,
    'type': null
  })

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

  const validate = () => {
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

  const addBlog = async (event) => {
    event.preventDefault()
    if (validate(newBlog)) {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({title:'', author:'', url:''})
      setNotification({
        'content': `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'type': 'success'
      })
    } catch (error) {
      console.log('error')
      setNotification({
        'content': `Error adding blog: ${error}`,
        'type': 'error'
      })
      notificationTimeout()
    }}
    }

  const createBlogForm = () => {
    return(
      <div>
        <h3>create new</h3>
        <Notification notification={notification}/>
        <form onSubmit={addBlog}>
          <div>
            title
            <input
            type='text'
            value={newBlog.title}
            onChange={({ target }) => 
              setNewBlog({...newBlog, title: target.value})
            }
            />
          </div>
          <div>
            author
            <input
            type='text'
            value={newBlog.author}
            onChange={({target}) => 
              setNewBlog({...newBlog, author: target.value})
            }
            />
          </div>
          <div>
            url
            <input
            type='text'
            value={newBlog.url}
            onChange={({target}) =>
              setNewBlog({...newBlog, url: target.value})
            }
            />
          </div>
          <button type='submit'>save</button>
        </form>
      </div>
    )
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

  const blogList = () => {
    return(
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const info = () => {
    return(
      <div>
        <h2>blogs</h2>
        <h3>{user.name} logged in</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

return (
  <div>
    {user && 
      <div>
      {info()}
      {createBlogForm()}
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