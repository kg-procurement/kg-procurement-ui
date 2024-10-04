import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import VendorTable from '../vendor-table.tsx'

const mockVendorsData = [{
  name: '001',
  email: 'a@gmail.com',
  performanceScore: '90',
}]
describe('<VendorTable/>', () => {
  it('should render all text provided', () => {
    const { container } = render(withWrappers(<VendorTable vendors={mockVendorsData} />))
    expect(container.textContent).toMatchInlineSnapshot(`"Vendor NameEmailPerformance Score001a@gmail.com90...Previous123More pagesNext0 of 99 row(s) selectedEmail Selected Vendor"`)
  })
  it('should render table header properly', () => {
    render(withWrappers(<VendorTable vendors={mockVendorsData} />))
    expect(screen.getByText('Vendor Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Performance Score')).toBeInTheDocument()
    const checkboxOnHeader = screen.getAllByRole('checkbox')[0]
    expect(checkboxOnHeader).toBeInTheDocument()
  })
  it('should render table body properly', () => {
    render(withWrappers(<VendorTable vendors={mockVendorsData} />))
    expect(screen.getByText('001')).toBeInTheDocument()
    expect(screen.getByText('a@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('90')).toBeInTheDocument()
    const checkboxOnFirstRow = screen.getAllByRole('checkbox')[1]
    expect(checkboxOnFirstRow).toBeInTheDocument()
  })
  it('should render email selected button', () => {
    render(withWrappers(<VendorTable vendors={mockVendorsData} />))
    expect(screen.getByRole('button', { name: 'Email Selected Vendor' })).toBeInTheDocument()
  })
})
