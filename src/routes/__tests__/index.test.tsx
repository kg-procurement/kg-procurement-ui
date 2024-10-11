import { render } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import IndexPage from '../index.tsx'

describe('<IndexPage />', () => {
  it('should render correctly without crashing', () => {
    render(withWrappers(<IndexPage />))
  })
})
