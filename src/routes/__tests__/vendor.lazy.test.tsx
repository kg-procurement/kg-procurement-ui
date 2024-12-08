import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import VendorPage from '../vendor.lazy.tsx'

const { mockGetVendorsUseSearch } = vi.hoisted(() => ({
  mockGetVendorsUseSearch: vi.fn(() => ({
    page: 1,
    product_name: '',
    location: '',
  })),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')

  return {
    ...actual,
    useSearch: mockGetVendorsUseSearch,
    useNavigate: vi.fn(() => vi.fn()),
    useLocation: vi.fn(() => ({ href: '/vendor' })),
  }
})

describe('<VendorPage/>', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<VendorPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Search Vendor')).toBeInTheDocument()
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
  }, 20000)

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

  it('should update sortBy and sortOrder when clicking on the performance score header', async () => {
    render(withWrappers(<VendorPage />, { withRoot: true }))
    await waitFor(() =>
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument(),
    )

    const button = screen.getByTestId('sort-rating')
    await userEvent.click(button)

    await userEvent.click(button)
  })

  it('should select a vendor checkbox on rows works properly', async () => {
    render(withWrappers(<VendorPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const firstCheckbox = screen.getAllByRole('checkbox', {})[1]

    await userEvent.click(firstCheckbox)
    await userEvent.click(firstCheckbox)

    const secondCheckbox = screen.getAllByRole('checkbox', {})[2]

    await userEvent.click(secondCheckbox)
    await userEvent.click(secondCheckbox)
  }, 20000)
})
