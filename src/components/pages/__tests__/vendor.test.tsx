import { render, screen, waitFor } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import VendorPage from '../vendor.tsx'

describe('<VendorPage/>', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<VendorPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Search Vendor')).toBeInTheDocument()
    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument()
  })

  it('should render the vendors table content properly', async () => {
    const { container } = render(
      withWrappers(<VendorPage />, { withRoot: true }),
    )
    await waitFor(async () => {
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    })
    expect(container.innerText.trim()).toMatchSnapshot()
  })

  it('should render the footer', () => {
    render(withWrappers(<VendorPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should render input boxes for filtering by product and location', () => {
    render(withWrappers(<VendorPage />))

    const productInput = screen.getByPlaceholderText('Filter by Product')
    const locationInput = screen.getByPlaceholderText('Filter by Location')

    expect(productInput).toBeInTheDocument()
    expect(locationInput).toBeInTheDocument()
  })
})
