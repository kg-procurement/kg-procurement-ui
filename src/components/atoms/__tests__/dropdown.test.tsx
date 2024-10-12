import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'

import Dropdown from '../dropdown.tsx'

interface TestDropdownProps {
  options: string[]
}

const TestDropdown: React.FC<TestDropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string | null) => {
    setSelectedOption(option)
  }

  return (
    <div>
      <Dropdown options={options} label="Select an option" onOptionSelect={handleOptionSelect} />
      {selectedOption && (
        <p data-testid="selected-option">
          Selected:
          {' '}
          {selectedOption}
        </p>
      )}
    </div>
  )
}

describe('<Dropdown />', () => {
  const options = ['Option 1', 'Option 2', 'Option 3']

  it('should render the dropdown with a label', () => {
    render(<TestDropdown options={options} />)

    const labelElement = screen.getByPlaceholderText('Select an option')
    expect(labelElement).toBeInTheDocument()
  })

  it('should open the dropdown when focused', () => {
    render(<TestDropdown options={options} />)

    const inputElement = screen.getByPlaceholderText('Select an option')
    fireEvent.focus(inputElement)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('should filter options based on the search term', () => {
    render(<TestDropdown options={options} />)

    fireEvent.focus(screen.getByPlaceholderText('Select an option'))
    const searchInput = screen.getByPlaceholderText('Search...')

    fireEvent.change(searchInput, { target: { value: 'Option 2' } })
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument()
  })

  it('should select an option when clicked', () => {
    render(<TestDropdown options={options} />)

    fireEvent.focus(screen.getByPlaceholderText('Select an option'))
    fireEvent.click(screen.getByText('Option 1'))

    const select = screen.getByRole('listbox')
    fireEvent.change(select, { target: { value: 'Option 1' } })

    const selectedOptionElement = screen.getByTestId('selected-option')

    expect(selectedOptionElement).toHaveTextContent('Selected: Option 1')
    expect(screen.getByPlaceholderText('Select an option')).toHaveValue('Option 1')
  })

  it('should reset selection when reset button is clicked', () => {
    render(<TestDropdown options={options} />)

    fireEvent.focus(screen.getByPlaceholderText('Select an option'))
    const select = screen.getByRole('listbox')
    fireEvent.change(select, { target: { value: 'Option 1' } })

    expect(screen.getByTestId('selected-option')).toHaveTextContent('Selected: Option 1')

    const resetButton = screen.getByLabelText('Reset selection')
    fireEvent.click(resetButton)

    expect(screen.queryByTestId('selected-option')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Select an option')).toHaveValue('')
  })
})
