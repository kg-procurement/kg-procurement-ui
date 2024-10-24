import { render, screen, waitFor } from '@testing-library/react'

// import { http, HttpResponse } from 'msw'
// import { API_BASE_URL } from '@/env.ts'
// import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import DashboardPage from '../[vendorId].tsx'

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

    // const errorHandler = http.get(`${API_BASE_URL}/product/vendor/:id`, (req) => {
    //   const { id } = req.params

    //   if (id === '-1') {
    //     return HttpResponse.json(null, { status: 200 })
    //   }
    //   return HttpResponse.json('Data found', { status: 200 })
    // })

    // mswServer.use(errorHandler)

    const { container } = render(
      withWrappers(<DashboardPage />, { withRoot: true }),
    )

    await waitFor(async () => {
      screen.debug()
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    })
    // await waitForElementToBeRemoved(() => screen.queryByTestId('loading-overlay'))

    expect(container.innerText).toMatchSnapshot()
  })

  it('should render the header section with the logo', () => {
    render(withWrappers(<DashboardPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Vendor A')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('should render the area chart with correct content', () => {
    render(withWrappers(<DashboardPage />))

    expect(screen.getByText(/Showing vendor performance by/i)).toBeInTheDocument()

    expect(screen.getByRole('charts-content')).toBeInTheDocument()
  })

  it('should render the table content properly', async () => {
    const { container } = render(
      withWrappers(<DashboardPage />, { withRoot: true }),
    )
    await waitFor(async () => {
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    })

    expect(container.innerText).toMatchSnapshot()
  })

  it('should render the footer', () => {
    render(withWrappers(<DashboardPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should render icons in the header', () => {
    render(withWrappers(<DashboardPage />))

    const icons = screen.getAllByRole('img')
    expect(icons).toHaveLength(2)
  })
})
