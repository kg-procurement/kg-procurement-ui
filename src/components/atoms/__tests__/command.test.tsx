import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command.tsx'

describe('<Command />', () => {
  it('should render the command input', () => {
    const { getByPlaceholderText } = render(
      <Command>
        <CommandInput placeholder="Type a command or search..." />
      </Command>,
    )

    expect(
      getByPlaceholderText('Type a command or search...'),
    ).toBeInTheDocument()
  })

  it('should render command items', () => {
    const { getByText } = render(
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    expect(getByText('Calendar')).toBeInTheDocument()
    expect(getByText('Search Emoji')).toBeInTheDocument()
    expect(getByText('Calculator')).toBeInTheDocument()
  })

  it('should show empty state when no command items are present', () => {
    const { getByText } = render(
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>,
    )

    expect(getByText('No results found.')).toBeInTheDocument()
  })

  it('should display command items after typing in the input', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    const input = getByPlaceholderText('Type a command or search...')

    await userEvent.type(input, 'Cal')

    expect(getByText('Calendar')).toBeInTheDocument()
    expect(queryByText('Search Emoji')).not.toBeInTheDocument()
  })
})
