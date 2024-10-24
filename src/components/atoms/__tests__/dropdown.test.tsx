import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Dropdown from '../dropdown.tsx'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

describe('<Dropdown />', () => {
  it('should render the dropdown button with placeholder', () => {
    render(<Dropdown options={options} />)

    const buttonElement = screen.getByRole('combobox')
    expect(buttonElement).toHaveTextContent('Select option...')
  })

  it('should open the dropdown when clicked', () => {
    render(<Dropdown options={options} />)

    const buttonElement = screen.getByRole('combobox')
    fireEvent.click(buttonElement)

    expect(screen.getByPlaceholderText('Search option...')).toBeInTheDocument()
  })

  it('should display options in the dropdown', () => {
    render(<Dropdown options={options} />)

    const buttonElement = screen.getByRole('combobox')
    fireEvent.click(buttonElement)

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('should filter options based on the search term', () => {
    render(<Dropdown options={options} />)

    const buttonElement = screen.getByRole('combobox')
    fireEvent.click(buttonElement)

    const searchInput = screen.getByPlaceholderText('Search option...')
    fireEvent.change(searchInput, { target: { value: 'Option2' } })

    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument()
  })

  it('should select an option when clicked', () => {
    render(<Dropdown options={options} />)

    const buttonElement = screen.getByRole('combobox')
    fireEvent.click(buttonElement)

    fireEvent.click(screen.getByText('Option 1'))

    expect(buttonElement).toHaveTextContent('Option 1')
  })

  it('should deselect an option when the same option is clicked again', () => {
    render(<Dropdown options={options} />)

    const buttonElement = screen.getByRole('combobox')
    fireEvent.click(buttonElement)

    fireEvent.click(screen.getByText('Option 1'))
    expect(buttonElement).toHaveTextContent('Option 1')

    fireEvent.click(buttonElement)

    const selectedOptionElement = screen.getByRole('option', { name: 'Option 1' })
    fireEvent.click(selectedOptionElement)

    expect(buttonElement).toHaveTextContent('Select option...')
  })

  it('should show "No option found" when there are no matching search results', () => {
    render(<Dropdown options={options} />)

    const buttonElement = screen.getByRole('combobox')
    fireEvent.click(buttonElement)

    const searchInput = screen.getByPlaceholderText('Search option...')
    fireEvent.change(searchInput, { target: { value: 'Non-existing option' } })

    expect(screen.getByText('No option found.')).toBeInTheDocument()
  })
})
