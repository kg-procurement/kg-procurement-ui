import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import ProductPage from '../product.tsx'

describe('<ProductPage />', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<ProductPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Search Product')).toBeInTheDocument()
    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument()
  })

  it('should render inputs for filtering products', () => {
    render(withWrappers(<ProductPage />))

    screen.debug(undefined, 100000)
    const productNameInput = screen.getByPlaceholderText('Filter by Product')

    expect(productNameInput).toBeInTheDocument()
  })

  it('should correctly render table header content ', async () => {
    render(withWrappers(<ProductPage />))
    await waitForNoLoadingOverlay()

    const productTable = screen.getByRole('table')
    expect(productTable).toBeInTheDocument()

    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Last Modified')).toBeInTheDocument()
  })

  it('should correctly render table header content ', async () => {
    render(withWrappers(<ProductPage />))
    await waitForNoLoadingOverlay()

    const productTable = screen.getByRole('table')
    expect(productTable).toBeInTheDocument()

    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Last Modified')).toBeInTheDocument()
  })

  it('should correctly handle choose all product by checkbox on table header', async () => {
    render(withWrappers(<ProductPage />))
    await waitForNoLoadingOverlay()

    const checkbox = screen.getAllByRole('checkbox')[0]
    await userEvent.click(checkbox)
    await userEvent.click(checkbox)
  })

  it('should render the footer', () => {
    render(withWrappers(<ProductPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should render the product vendors table content properly', async () => {
    render(withWrappers(<ProductPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()
    expect(screen.getByTestId('product-vendors-table').innerText).toMatchSnapshot()
  })

  it('should filter by product name is filled successfully', async () => {
    render(withWrappers(<ProductPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const nameFilterInput = screen.getByPlaceholderText('Filter by Product')
    const mockNameFilter = 'buku'
    await userEvent.type(nameFilterInput, mockNameFilter)
    expect(nameFilterInput).toHaveValue(mockNameFilter)

    expect(screen.getByTestId('product-vendors-table').innerText).toMatchSnapshot()
  })
})
