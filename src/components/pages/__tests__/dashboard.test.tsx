import { configureStore } from '@reduxjs/toolkit'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { useGetProductsByVendorQuery } from '@/lib/redux/features/product/api.ts'
import { api } from '@/lib/redux/services/api.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import DashboardPage from '../dashboard.tsx'

describe('<DashboardPage />', () => {
  it('should handle null response in providesTags', async () => {
    const store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
    })

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
