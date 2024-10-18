import { fireEvent, render, screen } from '@testing-library/react'
import { act, useState } from 'react'

import { Toaster } from '@/components/atoms/toaster.tsx'

import { ToasterToast, useToast } from '../use-toast.ts'

function TestComponent() {
  const { toast, dismiss } = useToast()
  const [id, setId] = useState<string | undefined>(undefined)
  const [updateFn, setUpdateFn] = useState<
    ((props: ToasterToast) => void) | undefined
  >(undefined)

  return (
    <div>
      <Toaster />
      <button data-testid="dismiss-trigger" onClick={() => dismiss()}>
        Dismiss
      </button>
      <button
        data-testid="toaster-trigger"
        onClick={() => {
          const { update, id: toastId } = toast({
            title: 'hi there',
            variant: 'default',
            description: 'how you doing?',
          })
          setUpdateFn(update)
          setId(toastId)
        }}
      >
        Click me!
      </button>
      <button
        data-testid="update-title-trigger"
        onClick={() => {
          if (!id) throw new Error('toastId is required but not present')
          if (!updateFn)
            throw new Error('updateFn is required but not present')
          updateFn({ id, title: 'updated title' })
        }}
      >
        Update Title
      </button>
    </div>
  )
}

describe('useToast()', () => {
  it('should render toast content to the dom when called & should only show one toast', async () => {
    render(<TestComponent />)
    expect(screen.queryByText('hi there')).toBeNull()
    act(() => {
      fireEvent.click(screen.getByTestId('toaster-trigger'))
    })
    act(() => {
      fireEvent.click(screen.getByTestId('toaster-trigger'))
    })
    act(() => {
      fireEvent.click(screen.getByTestId('toaster-trigger'))
    })
    act(() => {
      fireEvent.click(screen.getByTestId('toaster-trigger'))
    })
    expect(screen.queryAllByText('hi there')).toHaveLength(1)
  })
  it('should remove toast content from DOM when dismiss is called', () => {
    render(<TestComponent />)
    act(() => {
      fireEvent.click(screen.getByTestId('toaster-trigger'))
    })
    expect(screen.queryByText('hi there')).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTestId('dismiss-trigger'))
    })
    expect(screen.queryByText('hi there')).toBeNull()
  })
  it('should be able to update toast content', () => {
    render(<TestComponent />)
    act(() => {
      fireEvent.click(screen.getByTestId('toaster-trigger'))
    })
    expect(screen.queryByText('hi there')).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTestId('update-title-trigger'))
    })
    expect(screen.queryByText('hi there')).toBeNull()
    expect(screen.queryByText('updated title')).toBeNull()
  })
})
