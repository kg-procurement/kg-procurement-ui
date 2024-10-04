import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import { Button } from './index.tsx'

describe('<Button />', () => {
  it('should render correctly with correct children', () => {
    const { container } = render(withWrappers(<Button>Sample Text</Button>))
    expect(container.textContent).toMatchInlineSnapshot(`"Sample Text"`)
  })

  it('should forward ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Click Me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current?.textContent).toBe('Click Me')
  })

  it('should render with a custom className', () => {
    const { container } = render(
      <Button className="custom-button-class">Click Me</Button>,
    )
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass('custom-button-class')
  })

  it('should apply the correct class for the "default" variant', () => {
    const { container } = render(
      <Button variant="default">Default Button</Button>,
    )
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass(
      'bg-primary',
      'text-primary-foreground',
      'hover:bg-primary/90',
    )
  })

  it('should apply the correct class for the "ghost" variant', () => {
    const { container } = render(
      <Button variant="ghost">Default Button</Button>,
    )
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass(
      'hover:bg-accent',
      'hover:text-accent-foreground',
    )
  })

  it('should apply the correct class for the "outline" variant', () => {
    const { container } = render(
      <Button variant="outline">Default Button</Button>,
    )
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass(
      'border',
      'border-input',
      'bg-background',
      'hover:bg-accent',
      'hover:text-accent-foreground',
    )
  })

  it('should apply the correct class for the "default" size', () => {
    const { container } = render(
      <Button size="default">Default Size Button</Button>,
    )
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass('h-10', 'py-2', 'px-4')
  })

  it('should be disabled when isLoading is true', () => {
    const { getByRole } = render(<Button isLoading>Loading</Button>)
    const buttonElement = getByRole('button')
    expect(buttonElement).toBeDisabled()
  })

  it('should display a spinner when isLoading is true', () => {
    const { container, getByText } = render(
      <Button isLoading>Loading...</Button>,
    )

    const spinner = container.querySelector('svg')
    expect(spinner).toBeInTheDocument()

    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('should apply additional props to the component', () => {
    const { container } = render(
      <Button id="test-id" data-testid="button-element">
        Sample Text
      </Button>,
    )

    const element = container.querySelector('button')

    expect(element).toHaveAttribute('id', 'test-id')
    expect(element).toHaveAttribute('data-testid', 'button-element')
  })

  it('should call onClick handler when clicked', () => {
    const handleClick = vitest.fn()

    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    )
    const buttonElement = getByRole('button')
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick handler when disabled', () => {
    const handleClick = vitest.fn()

    const { getByRole } = render(
      <Button isLoading onClick={handleClick}>
        Click Me
      </Button>,
    )
    const buttonElement = getByRole('button')
    fireEvent.click(buttonElement)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
