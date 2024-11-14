import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react'

import { withWrappers } from '@/lib/testing/utils.tsx'
import { Product } from '@/schemas/product.ts'

import ProductForm from '../form.tsx'

const DUMMY: Product = {
  id: '35',
  product_category: {
    id: '59',
    category_name: 'Stationary',
    description: 'Kertas, Amplot, Balpen, Ordner, Binder, Staple...',
    modified_date: '2020-10-27T23:20:39Z',
    modified_by: '0',
  },
  uom_id: '26',
  income_tax_id: '0',
  product_type_id: '3',
  name: 'MP3 & MP4 Player',
  description: 'MP3 & MP4 Player',
  modified_date: '2024-10-18T22:15:53.765949Z',
  modified_by: '0',
}

describe('<ProductForm />', () => {
  it('should render properly without crashing', () => {
    render(withWrappers(<ProductForm initialData={DUMMY} />))
  })
  it('should disable certain fields', () => {
    render(withWrappers(<ProductForm initialData={DUMMY} />))
    const idInput = screen.getByTestId('id-input')
    expect(idInput).toBeDisabled()
    expect(idInput).toHaveValue('35')
  })
  it('should call onDone and API when save button is pressed', async () => {
    const mockOnDone = vi.fn()
    render(
      withWrappers(<ProductForm initialData={DUMMY} onDone={mockOnDone} />),
    )
    const nameInput = screen.getByTestId('name-input')
    act(() => {
      fireEvent.change(nameInput, { target: { value: 'updated name' } })
      fireEvent.click(screen.getByText('Save'))
    })
    await waitFor(() => {
      expect(mockOnDone).toHaveBeenCalled()
    })
  })
})
