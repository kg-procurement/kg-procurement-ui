import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'

import { Input } from '../input.tsx'

describe('<Input />', () => {
  it('should render the input field', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  it('should support placeholder', () => {
    render(<Input placeholder="Enter your name" />)
    const inputElement = screen.getByPlaceholderText('Enter your name')
    expect(inputElement).toBeInTheDocument()
  })

  it('should update value when typing', async () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    await userEvent.type(inputElement, 'John Doe')
    expect(inputElement).toHaveValue('John Doe')
  })

  it('should apply className prop', () => {
    render(<Input className="custom-class" />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('custom-class')
  })

  it('should forward ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should toggle password visibility when the eye icon is clicked', async () => {
    render(<Input type="password" placeholder="Password" />)
    const passwordInput = screen.getByPlaceholderText('Password')
    const toggleButton = screen
      .getAllByRole('button')
      .find(button => button.querySelector('svg'))
    expect(toggleButton).toBeInTheDocument()

    // Initially, the password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Click to show the password
    if (toggleButton) {
      await userEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'text')

      // Click again to hide the password
      await userEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'password')
    }
  })
})
