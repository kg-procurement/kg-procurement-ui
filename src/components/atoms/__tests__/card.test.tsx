import { render, screen } from '@testing-library/react'
import { createRef } from 'react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card.tsx'

describe('<Card />', () => {
  it('should render correctly with correct children', () => {
    const { container } = render(
      withWrappers(
        <Card>
          <CardHeader>
            <CardTitle>Sample Title</CardTitle>
            <CardDescription>Sample Description</CardDescription>
          </CardHeader>
          <CardContent>Sample Content</CardContent>
          <CardFooter>Sample Footer</CardFooter>
        </Card>,
      ),
    )
    expect(container.textContent).toMatchInlineSnapshot(`"Sample TitleSample DescriptionSample ContentSample Footer"`)
  })

  it('should forward ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Card ref={ref}></Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should render with a custom className', () => {
    const { container } = render(
      <Card className="custom-card-class">Click Me</Card>,
    )
    expect(
      container.querySelector('div.custom-card-class'),
    ).toBeInTheDocument()
  })

  it('should apply additional props to the component', () => {
    render(
      <Card id="test-id" data-testid="card-element">
        Sample Text
      </Card>,
    )

    const element = screen.getByTestId('card-element')

    expect(element).toHaveAttribute('id', 'test-id')
    expect(element).toHaveAttribute('data-testid', 'card-element')
  })
})
