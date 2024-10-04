import { render } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import Page from '../index.tsx'

describe('<Page />', () => {
  it('should render correctly without crashing', () => {
    const { container } = render(withWrappers(<Page />))
    expect(container).toBeInTheDocument()
  })
})
