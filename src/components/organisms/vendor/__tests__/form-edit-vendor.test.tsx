import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import EditVendorForm from "../form-edit-vendor.tsx";
import { Vendor } from '@/schemas/vendor';

const DUMMY_VENDOR: Vendor = {
  id: "2502",
  name: "Adriza Nikmah, PT",
  description: "Headset , alat elektronik, dan lainnya",
  bp_id: "2502",
  bp_name: "PT Adriza Nikmah",
  rating: 5,
  area_group_id: "1",
  area_group_name: "Indonesia",
  sap_code: "None",
  modified_date: "2024-10-25T13:19:55.95969Z",
  modified_by: "0",
  dt: "2024-08-28T00:00:00Z",
};

describe('<EditVendorForm />', () => {
  it('should render properly without crashing', () => {
    render(withWrappers(<EditVendorForm initialData={DUMMY_VENDOR} />))
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
