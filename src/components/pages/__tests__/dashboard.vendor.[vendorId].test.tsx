import { render, screen, waitFor } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import VendorDashboardPage from '../dashboard/vendor/[vendorId].tsx'

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
    mockUseParams.mockReturnValue({ vendorId: '-1' })

    const { container } = render(
      withWrappers(<VendorDashboardPage />, { withRoot: true }),
    )

    await waitFor(async () => {
      screen.debug()
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    })
    // await waitForElementToBeRemoved(() => screen.queryByTestId('loading-overlay'))

    expect(container.innerText).toMatchSnapshot()
  })

  it('should render the header section with the logo', () => {
    render(withWrappers(<VendorDashboardPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Vendor A')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('should render the area chart with correct content', () => {
    render(withWrappers(<VendorDashboardPage />))

    expect(screen.getByText(/Showing vendor performance by/i)).toBeInTheDocument()

    expect(screen.getByRole('charts-content')).toBeInTheDocument()
  })

  it('should render the table content properly', async () => {
    const { container } = render(
      withWrappers(<VendorDashboardPage />, { withRoot: true }),
    )
    await waitFor(async () => {
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    })

    expect(container.innerText).toMatchSnapshot()
  })

  it('should render the footer', () => {
    render(withWrappers(<VendorDashboardPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should render icons in the header', () => {
    render(withWrappers(<VendorDashboardPage />))

    const icons = screen.getAllByRole('img')
    expect(icons).toHaveLength(2)
  })
})
