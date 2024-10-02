import { render } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import { Button } from './index.tsx'

describe('<Typography />', () => {
  it('should render correctly with correct children', () => {
    const { container } = render(
      withWrappers(<Button>Sample Text</Button>),
    )
    expect(container.textContent).toMatchInlineSnapshot(`"Sample Text"`)
  })
})
