import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import Page from '../index.tsx'

describe('<Page />', () => {
  it('should render correctly without crashing', () => {
    render(withWrappers(<Page />))
    expect(screen.getByText('Search Vendor')).toBeInTheDocument()
  })
})
