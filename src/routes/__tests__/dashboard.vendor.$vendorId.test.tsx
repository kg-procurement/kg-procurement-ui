import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import VendorDetailPage from '../dashboard.vendor.$vendorId.tsx'

const { mockGetProductsByVendorUseParams } = vi.hoisted(() => ({
  mockGetProductsByVendorUseParams: vi.fn(() => ({ vendorId: '2508' })),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')

  return {
    ...actual,
    useParams: mockGetProductsByVendorUseParams,
    useNavigate: vi.fn(() => vi.fn()),
    useLocation: vi.fn(() => ({ href: '/vendor/detail' })),
  }
})

describe('<VendorDetailPage />', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<VendorDetailPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')
  })

  it('should render the area chart with correct content', () => {
    render(withWrappers(<VendorDetailPage />))

    expect(
      screen.getByText(/Showing vendor performance by/i),
    ).toBeInTheDocument()

    expect(screen.getByRole('charts-content')).toBeInTheDocument()
  })

  it('should render the table content properly', async () => {
    const { container } = render(withWrappers(<VendorDetailPage />))
    await waitForNoLoadingOverlay()

    expect(container.innerText).toMatchSnapshot()
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

  it('should open and close edit dialog properly', async () => {
    render(withWrappers(<VendorDetailPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()
    const firstEllipsisButton = screen.getAllByTestId('elip-button')[0]
    await userEvent.click(firstEllipsisButton)
    const editButton = screen.getAllByTestId('edit-button')[0]
    await userEvent.click(editButton)
    const closeButton = screen.getByText('Close')
    await userEvent.click(closeButton)
  })

  it('should handle null response in providesTags', async () => {
    mockGetProductsByVendorUseParams.mockReturnValueOnce({ vendorId: '-1' })
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

  it('should handle null response in update product providesTags', async () => {
    mswServer.use(
      http.get(`${API_BASE_URL}/product/vendor/:id`, () =>
        HttpResponse.json({
          product_vendors: [
            {
              id: '3',
              product: {
                id: '-1',
                product_category: {
                  id: '59',
                  category_name: 'Stationary',
                  description:
                    'Kertas, Amplot, Balpen, Ordner, Binder, Staple...',
                  modified_date: '2020-10-27T23:20:39Z',
                  modified_by: '0',
                },
                uom_id: '26',
                income_tax_id: '0',
                product_type_id: '3',
                name: 'Majalah',
                description: 'Majalah',
                modified_date: '2020-11-02T07:44:58Z',
                modified_by: '0',
              },
              price: {
                id: '3',
                price: 450000,
                currency_code: 'IDR',
                vendor_id: '3',
                modified_date: '2024-10-01T14:47:46Z',
                modified_by: '166',
              },
              code: '',
              name: 'Majalah',
              income_tax_id: '0',
              income_tax_name: '',
              income_tax_percentage: '0',
              description: 'Majalah',
              uom_id: '35',
              sap_code: '',
              modified_date: '2020-11-04T11:23:28Z',
              modified_by: '1',
            },
          ],
          metadata: {
            total_page: 1,
            current_page: 1,
            total_entries: 1,
          },
        }),
      ),
    )
    mswServer.use(
      http.put(`${API_BASE_URL}/product/:id`, () =>
        HttpResponse.json({ error: 'Id cannot be negative' }, { status: 500 }),
      ),
    )

    render(withWrappers(<VendorDetailPage />, { withRoot: true }))
    await waitFor(() => {
      expect(screen.queryByText('Id cannot be negative')).toBeInTheDocument()
    })
  })

  it('should handle when filter by product name returns null', async () => {
    render(withWrappers(<VendorDetailPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const nameFilterInput = screen.getByPlaceholderText(
      'Filter product name ...',
    )
    const mockNameFilter = 'keyboard'
    await userEvent.type(nameFilterInput, mockNameFilter)
    expect(nameFilterInput).toHaveValue(mockNameFilter)

    expect(screen.getByTestId('product-table').innerText).toMatchSnapshot()
  })
})
