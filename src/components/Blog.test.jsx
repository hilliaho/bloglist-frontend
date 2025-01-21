import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const user = {
    username: 'test username'
  }

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: user
  }

  render(<Blog blog={blog} user={user}/>)

  const element = screen.getByText((content) => content.includes('test title'))
  expect(element).toBeDefined()
})

test('doesnt render url', () => {
  const user = {
    username: 'test username'
  }

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user}/>)
  const url = container.querySelector('#url')
  expect(url).toBeNull()
})

test('doesnt render likes', () => {
  const user = {
    username: 'test username'
  }

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user}/>)
  const likes = container.querySelector('#likes')
  expect(likes).toBeNull()
})

test('url is visible after clicking the view-button', async () => {
  const user = {
    username: 'test username'
  }

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user}/>)

  const testUser = userEvent.setup()
  const button = container.querySelector('#view-button')
  await testUser.click(button)
  const url = container.querySelector('#url')
  expect(url).toBeDefined()
})

test('likes are visible after clicking the view-button', async () => {
  const user = {
    username: 'test username'
  }

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user}/>)

  const testUser = userEvent.setup()
  const button = container.querySelector('#view-button')
  await testUser.click(button)
  const likes = container.querySelector('#likes')
  expect(likes).toBeDefined()
})

test('user is visible after clicking the view-button', async () => {
  const user = {
    username: 'test username'
  }

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user}/>)

  const testUser = userEvent.setup()
  const button = container.querySelector('#view-button')
  await testUser.click(button)
  const userName = container.querySelector('#name')
  expect(userName).toBeDefined()
})

test('like handler gets two calls when user clicks like-button two times', async () => {
  const user = {
    username: 'test username'
  }

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: user
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} user={user}/>)

  const testUser = userEvent.setup()
  const viewButton = container.querySelector('#view-button')
  await testUser.click(viewButton)
  const likeButton = container.querySelector('#like-button')
  await testUser.click(likeButton)
  await testUser.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})