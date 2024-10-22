import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { Provider } from 'react-redux'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { useGetProductsByVendorQuery } from '@/lib/redux/features/product/api.ts'
import { configureAppStore } from '@/lib/redux/store.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import DashboardPage from '../dashboard.tsx'

describe('<DashboardPage />', () => {
  it('should handle null response in providesTags', async () => {
    const errorHandler = http.get(`${API_BASE_URL}/product/vendor/:id`, () => {
      return HttpResponse.json(null, { status: 200 })
    })

    mswServer.use(errorHandler)

    const store = configureAppStore()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() =>
      useGetProductsByVendorQuery({ id: '-1' }), { wrapper },
    )

    await waitFor(() => expect(result.current.isFetching).toBe(false))
    expect(result.current.data).toBeNull()
  })

  it('should render the header section with the logo', () => {
    render(withWrappers(<DashboardPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'kompas-gramedia-logo-bg.svg')

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
