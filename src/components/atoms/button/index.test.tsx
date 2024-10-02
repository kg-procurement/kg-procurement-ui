import { render } from '@testing-library/react'
import { createRef } from 'react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import { Button } from './index.tsx'

describe('<Button />', () => {
  it('should render correctly with correct children', () => {
    const { container } = render(
      withWrappers(<Button>Sample Text</Button>),
    )
    expect(container.textContent).toMatchInlineSnapshot(`"Sample Text"`)
  })

  it('should forward ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Click Me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current?.textContent).toBe('Click Me')
  })
})
