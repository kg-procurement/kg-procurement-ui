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
})
