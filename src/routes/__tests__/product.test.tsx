import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { withWrappers } from '@/lib/testing/utils.tsx'

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
    const locationDropdown = screen.getByRole('combobox')

    expect(productNameInput).toBeInTheDocument()
    expect(locationDropdown).toBeInTheDocument()
  })

  it('should correctly render table header content ', () => {
    render(withWrappers(<ProductPage />))

    const productTable = screen.getByRole('table')
    expect(productTable).toBeInTheDocument()

    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Last Modified')).toBeInTheDocument()
  })

  it('should correctly render table header content ', () => {
    render(withWrappers(<ProductPage />))

    const productTable = screen.getByRole('table')
    expect(productTable).toBeInTheDocument()

    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Last Modified')).toBeInTheDocument()
  })

  it('should correctly handle choose all product by checkbox on table header', async () => {
    render(withWrappers(<ProductPage />))

    const checkbox = screen.getAllByRole('checkbox')[0]
    await userEvent.click(checkbox)
    await userEvent.click(checkbox)
  })

  it('should correctly handle choosing a product by checkbox on table row', async () => {
    render(withWrappers(<ProductPage />))

    const checkbox = screen.getAllByRole('checkbox')[1]
    await userEvent.click(checkbox)
    await userEvent.click(checkbox)
  })

  it('should select an option on dropdown', async () => {
    render(withWrappers(<ProductPage />))

    const dropdown = screen.getByRole('combobox')
    await userEvent.click(dropdown)

    const option = screen.getByText('hello')
    await userEvent.click(option)
  })

  it('should render the footer', () => {
    render(withWrappers(<ProductPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })
})
