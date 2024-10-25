import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import VendorPage from '../vendor.tsx'

describe('<VendorPage/>', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<VendorPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

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

  it('should handle email blast and show success toast when success', async () => {
    render(withWrappers(<VendorPage />))

    const blastButton = await waitFor(() => screen.getByRole('button', { name: 'Email Selected Vendor' }))
    await userEvent.click(blastButton)

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Success')
      expect(toast.innerText).includes('Email blast has successfully executed')
    })
  })

  it('should handle email blast and show error toast when error', async () => {
    mswServer.use(http.post(`${API_BASE_URL}/vendor/blast`, () => HttpResponse.json({}, { status: 500 })))

    render(withWrappers(<VendorPage />))

    const blastButton = await waitFor(() => screen.getByRole('button', { name: 'Email Selected Vendor' }))
    await userEvent.click(blastButton)

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Error')
      expect(toast.innerText).includes('Email blast failed to be executed')
    })
  })
})
