import { fireEvent, render, screen } from '@testing-library/react'

import { Popover, PopoverContent, PopoverTrigger } from '../popover.tsx'

describe('<Popover />', () => {
  it('should render popover without crashing', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>trigger</button>
        </PopoverTrigger>
        <PopoverContent>hi there</PopoverContent>
      </Popover>,
    )
  })

  it('should show popover content on trigger click', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button data-testid="popover-trigger">trigger</button>
        </PopoverTrigger>
        <PopoverContent>dummy text</PopoverContent>
      </Popover>,
    )

    expect(screen.queryByText('dummy text')).toBeNull()

    const triggerButton = screen.getByTestId('popover-trigger')
    fireEvent.click(triggerButton)

    expect(screen.getByText('dummy text')).toBeInTheDocument()
  })
})
