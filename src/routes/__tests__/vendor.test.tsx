import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import Page from '../vendor.tsx'

describe('<VendorPage />', () => {
  it('should render correctly without crashing', () => {
    render(withWrappers(<Page />))
    expect(screen.getByText('Search Vendor')).toBeInTheDocument()
  })
})
