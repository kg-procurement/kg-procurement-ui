import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Dropdown from '../dropdown.tsx'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

describe('<Dropdown />', () => {
  it('should render the dropdown button with placeholder', async () => {
    render(<Dropdown options={options} name="option" onSelect={() => {}} />)

    const buttonElement = screen.getByRole('combobox')
    expect(buttonElement).toHaveTextContent('Select option...')
  })

  it('should open the dropdown when clicked', async () => {
    render(<Dropdown options={options} name="option" onSelect={() => {}} />)

    const buttonElement = screen.getByRole('combobox')
    await userEvent.click(buttonElement)

    expect(screen.getByPlaceholderText('Search option...')).toBeInTheDocument()
  })

  it('should display options in the dropdown', async () => {
    render(<Dropdown options={options} name="option" onSelect={() => {}} />)

    const buttonElement = screen.getByRole('combobox')
    await userEvent.click(buttonElement)

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('should filter options based on the search term', async () => {
    render(<Dropdown options={options} name="option" onSelect={() => {}} />)

    const buttonElement = screen.getByRole('combobox')
    await userEvent.click(buttonElement)

    const searchInput = screen.getByPlaceholderText('Search option...')
    await userEvent.type(searchInput, 'Option2')

    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument()
  })

  it('should select an option when clicked', async () => {
    render(<Dropdown options={options} name="option" onSelect={() => {}} />)

    const buttonElement = screen.getByRole('combobox')
    await userEvent.click(buttonElement)

    await userEvent.click(screen.getByText('Option 1'))

    expect(buttonElement).toHaveTextContent('Option 1')
  })

  it('should deselect an option when the same option is clicked again', async () => {
    render(<Dropdown options={options} name="option" onSelect={() => {}} />)

    const buttonElement = screen.getByRole('combobox')
    await userEvent.click(buttonElement)

    await userEvent.click(screen.getByText('Option 1'))
    expect(buttonElement).toHaveTextContent('Option 1')

    await userEvent.click(buttonElement)

    const selectedOptionElement = screen.getByRole('option', {
      name: 'Option 1',
    })
    await userEvent.click(selectedOptionElement)

    expect(buttonElement).toHaveTextContent('Select option...')
  })

  it('should show "No option found" when there are no matching search results', async () => {
    render(<Dropdown options={options} name="option" onSelect={() => {}} />)

    const buttonElement = screen.getByRole('combobox')
    await userEvent.click(buttonElement)

    const searchInput = screen.getByPlaceholderText('Search option...')
    await userEvent.type(searchInput, 'Non-existing option')

    expect(screen.getByText('No option found.')).toBeInTheDocument()
  })
})
