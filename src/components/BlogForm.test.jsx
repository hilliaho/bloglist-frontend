import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form handler is called with correct blog data when the form is submitted', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<BlogForm createBlog={mockHandler} />)

  const testUser = userEvent.setup()
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = container.querySelector('#submit-button')

  await testUser.type(titleInput, 'How to test a form')
  await testUser.type(authorInput, 'Author Test')
  await testUser.type(urlInput, 'www.test.com')

  await testUser.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)

  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: 'How to test a form',
    author: 'Author Test',
    url: 'www.test.com',
  })
})
