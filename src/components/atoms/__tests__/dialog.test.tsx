import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../dialog.tsx'

describe('<Dialog />', () => {
  it('should render the dialog trigger button', () => {
    const { getByText } = render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </Dialog>,
    )
    expect(getByText('Open Dialog')).toBeInTheDocument()
  })

  it('should open the dialog', async () => {
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

    await userEvent.click(getByText('Open Dialog'))
    expect(queryByRole('dialog')).toBeInTheDocument()
  })

  it('should open and close the dialog', async () => {
    const { getByText, queryByRole, getByTestId } = render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>,
    )

    // open the dialog
    await userEvent.click(getByText('Open Dialog'))
    expect(queryByRole('dialog')).toBeInTheDocument()

    // Close the dialog using the button with role 'button' and name 'Close'
    await userEvent.click(getByTestId('dialog-close'))
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render DialogHeader, DialogFooter, DialogTitle, and DialogDescription correctly', async () => {
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

    await userEvent.click(getByText('Open Dialog'))

    expect(getByText('Dialog Header Title')).toBeInTheDocument()
    expect(getByText('Dialog Description')).toBeInTheDocument()
    expect(getByText('Action')).toBeInTheDocument()
  })
})
