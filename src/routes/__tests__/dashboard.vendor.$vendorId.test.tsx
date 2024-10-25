import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'

import CustomPagination from '@/components/molecules/custom-pagination.tsx'
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

describe('<VendorDetailPage />', () => {
  it('should render the table content properly', async () => {
    mswServer.use(http.get('product/vendor/:id', () => {

    }))
    const { container } = render(
      withWrappers(<VendorDetailPage />, { withRoot: true }),
    )
    await waitFor(async () => {
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    })

    expect(container.innerText).toMatchSnapshot()
  })

  it('should handle null response in providesTags', async () => {
    mockUseParams.mockReturnValueOnce({ vendorId: '-1' })

    const { container } = render(
      withWrappers(<VendorDetailPage />, { withRoot: true }),
    )

    await waitForNoLoadingOverlay()
    expect(container.innerText).toMatchSnapshot()
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

  it('should render the footer', () => {
    render(withWrappers(<VendorDetailPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should render icons in the header', () => {
    render(withWrappers(<VendorDetailPage />))

    const icons = screen.getAllByRole('img')
    expect(icons).toHaveLength(2)
  })

  it('should go to the next page', () => {
    const mockHandleSetPage = vi.fn()
    render(withWrappers(<CustomPagination current_page={1} total_page={5} setPage={mockHandleSetPage} />))
    const nextpage = screen.getByText('2')
    fireEvent.click(nextpage)
    expect(mockHandleSetPage).toHaveBeenCalledWith(2)
  })

  it('should go to the prev page', () => {
    const mockHandleSetPage = vi.fn()
    render(withWrappers(<CustomPagination current_page={2} total_page={5} setPage={mockHandleSetPage} />))
    const prevPage = screen.getByText('Previous')
    fireEvent.click(prevPage)
    expect(mockHandleSetPage).toHaveBeenCalledWith(1)
  })

  it('should mock onchange', async () => {
    // const mockOnChange = vi.fn()
    render(withWrappers(<VendorDetailPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()
    const firstEllipsisButton = screen.getAllByTestId('elip-button')[0]
    await userEvent.click(firstEllipsisButton)
    const editButton = screen.getAllByTestId('edit-button')[0]
    // expect(editButton).toBeInTheDocument()
    // console.log('VALENCIUS APRIADY:', editButton)
    await userEvent.click(editButton)
    const closeButton = screen.getByText('Close')
    await userEvent.click(closeButton)
    screen.debug(undefined, 100000)
    // const closeButton = await waitFor(() => screen.getByRole('button', { name: 'Close' }))
    // act(() => {
    //   userEvent.click(closeButton)
    // })
    // expect(mockOnChange).toHaveBeenCalledOnce()
  })
})
