import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
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

  it('should update value when typing', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'John Doe' } })
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

  it('should render a password input field', () => {
    render(<Input isPassword placeholder="Enter your password" />)
    const inputElement = screen.getByPlaceholderText('Enter your password')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'password')
  })

  it('should toggle password visibility', () => {
    render(<Input isPassword placeholder="Password" />)
    const inputElement = screen.getByPlaceholderText('Password')
    const toggleButton = screen.getByRole('button')

    expect(inputElement).toHaveAttribute('type', 'password')

    fireEvent.click(toggleButton)
    expect(inputElement).toHaveAttribute('type', 'text')

    fireEvent.click(toggleButton)
    expect(inputElement).toHaveAttribute('type', 'password')
  })

  it('should show the password visibility toggle button when isPassword is true', () => {
    render(<Input isPassword placeholder="Password" />)
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()
  })
})
