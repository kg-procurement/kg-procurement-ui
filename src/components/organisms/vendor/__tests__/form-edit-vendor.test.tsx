import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'

import { withWrappers } from '@/lib/testing/utils.tsx'
import { Vendor } from '@/schemas/vendor.ts'

import EditVendorForm from '../form-edit-vendor.tsx'

const DUMMY_VENDOR: Vendor = {
  id: '2502',
  name: 'Adriza Nikmah, PT',
  description: 'Headset , alat elektronik, dan lainnya',
  bp_id: '2502',
  bp_name: 'PT Adriza Nikmah',
  rating: 5,
  area_group_id: '1',
  area_group_name: 'Indonesia',
  sap_code: 'None',
  modified_date: '2024-10-25T13:19:55.95969Z',
  modified_by: '0',
  dt: '2024-08-28T00:00:00Z',
}

describe('<EditVendorForm />', () => {
  it('should render properly without crashing', () => {
    render(withWrappers(<EditVendorForm initialData={DUMMY_VENDOR} />))
  })
  it('should disable certain fields', () => {
    render(withWrappers(<EditVendorForm initialData={DUMMY_VENDOR} />))

    const idInput = screen.getByTestId('id-input')
    expect(idInput).toBeDisabled()
    expect(idInput).toHaveValue(DUMMY_VENDOR.id)

    const bpIdInput = screen.getByTestId('bp_id-input')
    expect(bpIdInput).toBeDisabled()
    expect(bpIdInput).toHaveValue(DUMMY_VENDOR.bp_id)

    const bpNameInput = screen.getByTestId('bp_name-input')
    expect(bpNameInput).toBeDisabled()
    expect(bpNameInput).toHaveValue(DUMMY_VENDOR.bp_name)

    const areaGroupIdInput = screen.getByTestId('area_group_id-input')
    expect(areaGroupIdInput).toBeDisabled()
    expect(areaGroupIdInput).toHaveValue(DUMMY_VENDOR.area_group_id)

    const areaGroupNameInput = screen.getByTestId('area_group_name-input')
    expect(areaGroupNameInput).toBeDisabled()
    expect(areaGroupNameInput).toHaveValue(DUMMY_VENDOR.area_group_name)

    const sapCodeInput = screen.getByTestId('sap_code-input')
    expect(sapCodeInput).toBeDisabled()
    expect(sapCodeInput).toHaveValue(DUMMY_VENDOR.sap_code)

    const dtInput = screen.getByTestId('dt-input')
    expect(dtInput).toBeDisabled()
  })
  it('should allow user to edit name, description, and rating', async () => {
    render(withWrappers(<EditVendorForm initialData={DUMMY_VENDOR} />))

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement
    const descriptionInput = screen.getByTestId(
      'description-input',
    ) as HTMLInputElement
    const ratingInput = screen.getByTestId(
      'rating-input',
    ) as HTMLInputElement

    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'Updated Vendor Name')
    expect(nameInput.value).toBe('Updated Vendor Name')

    await userEvent.clear(descriptionInput)
    await userEvent.type(descriptionInput, 'Updated Description')
    expect(descriptionInput.value).toBe('Updated Description')

    await userEvent.clear(ratingInput)
    await userEvent.type(ratingInput, '5')
    expect(ratingInput.value).toBe('5')
  })
  it('should call onDone and API when save button is pressed', async () => {
    const mockOnDone = vi.fn()
    render(
      withWrappers(<EditVendorForm initialData={DUMMY_VENDOR} onDone={mockOnDone} />),
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
