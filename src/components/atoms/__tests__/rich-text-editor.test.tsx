import 'ckeditor5/ckeditor5.css'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'

import { RichTextEditor } from '../rich-text-editor.tsx' // Adjust the import path as necessary

// Mock for ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  value: ResizeObserver,
})

// Unit test for rendering the RichTextEditor
describe('RichTextEditor', () => {
  it('renders with initial content', async () => {
    const mockSetContent = vi.fn()

    const { container } = render(<RichTextEditor content="Initial content" setContent={mockSetContent} />)

    await waitFor(() => {
      expect(screen.getByText('Initial content')).toBeInTheDocument()
    })

    const editBox = container.querySelector('[contenteditable="true"]')
    if (!editBox) throw new Error('Edit box not found')

    act(() => {
      userEvent.click(editBox)
      userEvent.keyboard('more stuff')
    })

    await waitFor(() => {
      expect(mockSetContent).toHaveBeenCalled()
    })
  })
})
