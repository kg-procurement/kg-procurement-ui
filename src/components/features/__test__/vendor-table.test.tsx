import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'
import { PaginationSpec } from '@/schemas/common.ts'
import { Vendor } from '@/schemas/vendor.ts'

import VendorTable from '../vendor-table.tsx'

const mockVendorsData: Vendor[] = [
  {
    id: '2513',
    name: 'Asaba Computer Centre',
    description: 'Miscrosoft Gold Partner',
    bp_id: '2513',
    bp_name: 'Asaba Computer Centre',
    rating: 1,
    area_group_id: '1',
    area_group_name: 'Indonesia',
    sap_code: '102722',
    modified_date: '2022-12-05T11:47:24Z',
    modified_by: '7',
    dt: '2024-08-28T00:00:00Z',
  },
  {
    id: '2523',
    name: 'Best Denki Indonesia, PT',
    description: '0',
    bp_id: '2523',
    bp_name: 'Best Denki Indonesia, PT',
    rating: 0,
    area_group_id: '1',
    area_group_name: 'Indonesia',
    sap_code: 'None',
    modified_date: '2020-10-29T13:39:12Z',
    modified_by: '0',
    dt: '2024-08-28T00:00:00Z',
  },
  {
    id: '2571',
    name: 'GitHub, Inc',
    description: '0',
    bp_id: '2571',
    bp_name: 'GitHub, Inc',
    rating: 0,
    area_group_id: '1',
    area_group_name: 'Indonesia',
    sap_code: 'None',
    modified_date: '2020-10-29T13:39:12Z',
    modified_by: '0',
    dt: '2024-08-28T00:00:00Z',
  },
  {
    id: '4487',
    name: 'Oktirin Nindy Citrasari / Show Management',
    description: 'None',
    bp_id: '8416',
    bp_name: 'Oktirin Nindy Citrasari / Show Management',
    rating: 0,
    area_group_id: '1',
    area_group_name: 'Indonesia',
    sap_code: 'None',
    modified_date: '2024-09-12T16:57:18Z',
    modified_by: '1075',
    dt: '2024-09-12T00:00:00Z',
  },
]

const mockMetadata: PaginationSpec['Metadata'] = {
  TotalPage: 10,
  CurrentPage: 1,
  TotalEntries: 100,
}

describe('<VendorTable/>', () => {
  it('should render all text provided', () => {
    const { container } = render(
      withWrappers(
        <VendorTable vendors={mockVendorsData} metadata={mockMetadata} />,
      ),
    )
    expect(container.textContent).toMatchSnapshot()
  })
  it('should render table body properly', () => {
    const { container } = render(
      withWrappers(
        <VendorTable vendors={mockVendorsData} metadata={mockMetadata} />,
      ),
    )
    // Check first row data (after header so the index is offset by 1)
    const firstRow = container.querySelectorAll('tr')[1]
    const data = firstRow.querySelectorAll('td')
    expect(data[1].innerText).toMatchInlineSnapshot(`"Asaba Computer Centre"`)
    expect(data[2].innerText).toMatchInlineSnapshot(`"Indonesia"`)
    expect(data[3].innerText).toMatchInlineSnapshot(`"1"`)
  })
  it('should render table header properly', () => {
    render(
      withWrappers(
        <VendorTable vendors={mockVendorsData} metadata={mockMetadata} />,
      ),
    )
    expect(screen.getByText('Vendor Name')).toBeInTheDocument()
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Performance Score')).toBeInTheDocument()
  })
  it('should render email selected button', () => {
    render(
      withWrappers(
        <VendorTable vendors={mockVendorsData} metadata={mockMetadata} />,
      ),
    )
    expect(
      screen.getByRole('button', { name: 'Email Selected Vendor' }),
    ).toBeInTheDocument()
  })
})
