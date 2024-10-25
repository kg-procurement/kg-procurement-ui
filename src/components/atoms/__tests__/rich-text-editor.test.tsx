import 'ckeditor5/ckeditor5.css'

import { render, screen, waitFor } from '@testing-library/react'

import { RichTextEditor } from '../rich-text-editor.tsx'

// Unit test for rendering the RichTextEditor
describe('RichTextEditor', () => {
  it('renders with initial content', async () => {
    const mockSetContent = vi.fn()

    render(<RichTextEditor content="Initial content" setContent={mockSetContent} />)

    await waitFor(() => {
      expect(screen.getByText('Initial content')).toBeInTheDocument()
    })
  })
})
