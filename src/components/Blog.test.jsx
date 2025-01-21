import { render, screen } from '@testing-library/react'
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