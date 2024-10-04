import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'

import { Checkbox } from '../checkbox.tsx'

describe('<Checkbox />', () => {
  it('should render the checkbox', () => {
    render(<Checkbox />)
    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).toBeInTheDocument()
  })

  it('should render the indicator when checked', () => {
    render(<Checkbox />)

    expect(
      screen.queryByRole('checkbox', { checked: true }),
    ).not.toBeInTheDocument()

    const checkboxElement = screen.getByRole('checkbox')
    fireEvent.click(checkboxElement)

    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument()

    expect(
      screen.getByRole('checkbox').querySelector('svg.h-4.w-4'),
    ).toBeInTheDocument()
  })

  it('should forward ref to the underlying element', () => {
    const ref = createRef<HTMLButtonElement>()

    render(<Checkbox ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('should apply className prop', () => {
    render(<Checkbox className="custom-class" />)
    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).toHaveClass('custom-class')
  })

  it('should apply additional props to the component', () => {
    render(<Checkbox id="test-id" />)

    const element = screen.getByRole('checkbox')

    expect(element).toHaveAttribute('id', 'test-id')
  })
})
