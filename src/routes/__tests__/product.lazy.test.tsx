import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import ProductPage from '../product.lazy.tsx'

describe('<ProductPage />', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<ProductPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Search Product')).toBeInTheDocument()
  })

  it('should render inputs for filtering products', () => {
    render(withWrappers(<ProductPage />))

    const productNameInput = screen.getByPlaceholderText('Filter by Product')

    expect(productNameInput).toBeInTheDocument()
  })

  it('should correctly render table header content ', async () => {
    render(withWrappers(<ProductPage />))
    await waitForNoLoadingOverlay()

    const productTable = screen.getByTestId('product-vendors-table')
    expect(productTable).toBeInTheDocument()

    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Last Modified')).toBeInTheDocument()
  })

  it('should correctly render table header content ', async () => {
    render(withWrappers(<ProductPage />))
    await waitForNoLoadingOverlay()

    const productTable = screen.getByTestId('product-vendors-table')
    expect(productTable).toBeInTheDocument()

    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Last Modified')).toBeInTheDocument()
  })

  it('should correctly handle choose all product by checkbox on table header and choosing a product by checkbox on table row', async () => {
    render(withWrappers(<ProductPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const checkboxAll = screen.getAllByRole('checkbox')[0]
    await userEvent.click(checkboxAll)
    await userEvent.click(checkboxAll)

    const checkbox = screen.getAllByRole('checkbox')[1]
    await userEvent.click(checkbox)
    await userEvent.click(checkbox)
  })

  it('should render the product vendors table content properly', async () => {
    render(withWrappers(<ProductPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()
  })

  it('should filter by product name is filled successfully', async () => {
    render(withWrappers(<ProductPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const nameFilterInput = screen.getByPlaceholderText('Filter by Product')
    const mockNameFilter = 'buku'
    await userEvent.type(nameFilterInput, mockNameFilter)
    expect(nameFilterInput).toHaveValue(mockNameFilter)

    expect(
      screen.getByTestId('product-vendors-table').innerText,
    ).toMatchSnapshot()
  })

  it('should handle when filter by product name returns null', async () => {
    render(withWrappers(<ProductPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const nameFilterInput = screen.getByPlaceholderText('Filter by Product')
    const mockNameFilter = 'keyboard'
    await userEvent.type(nameFilterInput, mockNameFilter)
    expect(nameFilterInput).toHaveValue(mockNameFilter)

    expect(
      screen.getByTestId('product-vendors-table').innerText,
    ).toMatchSnapshot()
  })

  it('should handle null response in providesTags', async () => {
    mswServer.use(
      http.get(`${API_BASE_URL}/product/vendor`, () =>
        HttpResponse.json(
          { error: 'pq: OFFSET must not be negative' },
          { status: 500 },
        ),
      ),
    )

    render(withWrappers(<ProductPage />, { withRoot: true }))
    await waitFor(() => {
      expect(
        screen.queryByText('pq: OFFSET must not be negative'),
      ).toBeInTheDocument()
    })
  })
})
