import { fireEvent, render } from '@testing-library/react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './index.tsx'

describe('<Dialog />', () => {
  it('should render the dialog trigger button', () => {
    const { getByText } = render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </Dialog>,
    )
    expect(getByText('Open Dialog')).toBeInTheDocument()
  })

  it('should open the dialog', () => {
    const { getByText, queryByRole } = render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>,
    )

    fireEvent.click(getByText('Open Dialog'))
    expect(queryByRole('dialog')).toBeInTheDocument()
  })

  it('should open and close the dialog', () => {
    const { getByText, queryByRole, getByTestId } = render(
      <Dialog>
        <DialogTrigger data-testid="dialog-close">Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>,
    )

    // open the dialog
    fireEvent.click(getByText('Open Dialog'))
    expect(queryByRole('dialog')).toBeInTheDocument()

    // Close the dialog using the button with role 'button' and name 'Close'
    fireEvent.click(getByTestId('dialog-close'))
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render DialogHeader, DialogFooter, DialogTitle, and DialogDescription correctly', () => {
    const { getByText } = render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Header Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogFooter>
            <button>Action</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    )

    fireEvent.click(getByText('Open Dialog'))

    expect(getByText('Dialog Header Title')).toBeInTheDocument()
    expect(getByText('Dialog Description')).toBeInTheDocument()
    expect(getByText('Action')).toBeInTheDocument()
  })
})
