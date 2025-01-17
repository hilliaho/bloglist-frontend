import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({title:'', author:'', url:''})
    } catch (error) {
      console.error('Error adding blog: ', error)
    }
  }

  const createBlogForm = () => {
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
    {!user && loginForm()}
    {user && info()}
    {user && createBlogForm()}
    {user && blogList()}
  </div>
)
}

export default App