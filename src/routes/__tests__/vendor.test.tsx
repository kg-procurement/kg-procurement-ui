import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

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
    const locationInput = screen.getByRole('combobox')

    expect(screen.getByText('Select Location...')).toBeInTheDocument()

    expect(productInput).toBeInTheDocument()
    expect(locationInput).toBeInTheDocument()
  })

  it('should show warning popover when no vendor selected', async () => {
    render(withWrappers(<VendorPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const blastButton = screen.getByText('Email Selected Vendor')

    await userEvent.click(blastButton)
    const warning = screen.getByText(
      'Please choose at leat one vendor to continue',
    )
    expect(warning).toBeInTheDocument()
  })

  it('should show dialog email compose after any vendor selected', async () => {
    render(withWrappers(<VendorPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const checkbox = screen.getAllByRole('checkbox', {})[0]

    await userEvent.click(checkbox)

    const blastButton = screen.getByText('Email Selected Vendor')

    await userEvent.click(blastButton)
    const formTitle = screen.getByText('Compose Email')
    expect(formTitle).toBeInTheDocument()
  })

  it('should select all vendor checkbox works properly', async () => {
    render(withWrappers(<VendorPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const checkbox = screen.getAllByRole('checkbox', {})[1]

    await userEvent.click(checkbox)
    await userEvent.click(checkbox)

    const blastButton = screen.getByText('Email Selected Vendor')

    await userEvent.click(blastButton)
    const warning = screen.getByText(
      'Please choose at leat one vendor to continue',
    )
    expect(warning).toBeInTheDocument()
  })

  it('should select a vendor checkbox works properly', async () => {
    render(withWrappers(<VendorPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const checkbox = screen.getAllByRole('checkbox', {})[0]

    await userEvent.click(checkbox)
    await userEvent.click(checkbox)

    const blastButton = screen.getByText('Email Selected Vendor')

    await userEvent.click(blastButton)
    const warning = screen.getByText(
      'Please choose at leat one vendor to continue',
    )
    expect(warning).toBeInTheDocument()
  })

  it('should select an option on dropdown', async () => {
    mswServer.use(
      http.get(`${API_BASE_URL}/vendor/location`, () =>
        HttpResponse.json(
          {
            locations: ['Jakarta', 'Surabaya', 'Bali'],
          },
          { status: 200 },
        ),
      ),
    )

    render(withWrappers(<VendorPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const dropdownButton = screen.getByText('Select Location...')
    await userEvent.click(dropdownButton)

    const optionJakarta = await waitFor(() => screen.getByText('Jakarta'))
    await userEvent.click(optionJakarta)
  })
})
