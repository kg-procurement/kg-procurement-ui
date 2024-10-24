import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { act } from 'react'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import VendorDetailPage from '../dashboard.vendor.$vendorId.tsx'

const { mockUseParams } = vi.hoisted(() => ({
  mockUseParams: vi.fn(() => ({ vendorId: '2508' })),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')

  return {
    ...actual,
    useParams: mockUseParams,
  }
})

describe('<DashboardPage />', () => {
  it('should handle null response in providesTags', async () => {
    mockUseParams.mockReturnValueOnce({ vendorId: '-1' })
    mswServer.use(
      http.get(`${API_BASE_URL}/product/vendor/:id`, () =>
        HttpResponse.json({ error: 'Id cannot be negative' }, { status: 500 }),
      ),
    )

    render(withWrappers(<VendorDetailPage />, { withRoot: true }))
    await waitFor(() => {
      expect(screen.queryByText('Id cannot be negative')).toBeInTheDocument()
    })
  })

  it('should render the header section with the logo', () => {
    render(withWrappers(<VendorDetailPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Vendor A')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('should render the area chart with correct content', () => {
    render(withWrappers(<VendorDetailPage />))

    expect(
      screen.getByText(/Showing vendor performance by/i),
    ).toBeInTheDocument()

    expect(screen.getByRole('charts-content')).toBeInTheDocument()
  })

  it('should render the table content properly', async () => {
    render(withWrappers(<VendorDetailPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const table = screen.getByTestId('vendor-inventory-table')
    expect(table.innerText).toMatchSnapshot()
  })

  it('should render the footer', () => {
    render(withWrappers(<VendorDetailPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should render icons in the header', () => {
    render(withWrappers(<VendorDetailPage />))

    const icons = screen.getAllByRole('img')
    expect(icons).toHaveLength(2)
  })

  it('should refetch data when name filter is set', () => {
    render(withWrappers(<VendorDetailPage />))

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Filter vendor ...'), {
        target: { value: 'bumi' },
      })
    })

    const table = screen.getByTestId('vendor-inventory-table')
    expect(table.innerText).toMatchSnapshot()
  })
})
