import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Vendor } from '@/schemas/vendor.tsx'

import { EmailForm } from '../email-form.tsx'

describe('EmailForm', () => {
  const mockOnClose = vi.fn()

  const selectedVendors: Vendor[] = [
    {
      id: '1',
      name: 'Vendor 1',
      description: 'Description for Vendor 1',
      bp_id: 'BP001',
      bp_name: 'Business Partner 1',
      rating: 5,
      area_group_id: 'AG001',
      area_group_name: 'Area Group 1',
      sap_code: 'SAP001',
      modified_date: '2024-01-01T00:00:00Z',
      modified_by: 'user@example.com',
      dt: '2024-01-01T00:00:00Z',
    },
  ]

  it('should render email editor components', () => {
    render(<EmailForm selectedVendors={selectedVendors} onClose={mockOnClose} />)

    expect(screen.getByRole('heading', { name: /compose email/i })).toBeInTheDocument()
    expect(screen.getByText(/compose your email to/i)).toBeInTheDocument()
    expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('should show error message when email content is empty and next is clicked', async () => {
    render(<EmailForm selectedVendors={selectedVendors} onClose={mockOnClose} />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    await userEvent.click(nextButton)

    expect(await screen.findByText(/email content cannot be empty/i)).toBeInTheDocument()
  })

  it('should go to confirmation when email content is not empty and next is clicked', async () => {
    render(<EmailForm selectedVendors={selectedVendors} onClose={mockOnClose} />)

    const emailEditor = screen.getByTestId('email-editor')

    act(() => {
      userEvent.clear(emailEditor)
      userEvent.type(emailEditor, 'Hello {{vendor}}, this is a test email.')
    })

    const nextButton = screen.getByRole('button', { name: /next/i })
    await userEvent.click(nextButton)

    expect(screen.getByRole('heading', { name: /confirm send email/i })).toBeInTheDocument()
    expect(screen.getByText(/are you sure you want to send the following email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /yes, send/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /no, go back/i })).toBeInTheDocument()
  })

  it('should show toast on successful email send', async () => {
    render(<EmailForm selectedVendors={selectedVendors} onClose={mockOnClose} />)

    // Input email content
    const richTextEditor = screen.getByTestId('rich-text-editor')
    await userEvent.type(richTextEditor, 'Hello {{vendor}}, this is a test email.')

    // Go to confirmation
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.click(screen.getByRole('button', { name: /yes, send/i }))

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Success')
      expect(toast.innerText).includes('Account registered successfully')
    })
  })

  it('should show toast on failed email send', async () => {
    render(<EmailForm selectedVendors={selectedVendors} onClose={mockOnClose} />)

    const richTextEditor = await waitFor(() => screen.getByRole('textbox'))
    console.log(richTextEditor)

    fireEvent.change(richTextEditor, 'Hello {{vendor}}, this is a test email.')

    await userEvent.click(screen.getByRole('button', { name: /next/i }))

    await userEvent.click(screen.getByRole('button', { name: /yes, send/i }))

    const toast = await screen.findByTestId('toast')
    expect(toast).toBeInTheDocument()
    expect(toast.innerText).toContain('Error')
    expect(toast.innerText).toContain('Failed to send emails.')
  })
})
