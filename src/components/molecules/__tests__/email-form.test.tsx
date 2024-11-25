import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it, vi } from 'vitest'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import { EmailForm } from '../email-form.tsx'

describe('EmailForm', () => {
  const mockToggleDialog = vi.fn()

  const emailBlastProcedure = async () => {
    render(
      withWrappers(
        <EmailForm
          toggleDialog={true}
          setToggleDialog={mockToggleDialog}
          vendorIds={selectedVendors}
          defaultContent="Enter your email template"
        />,
        { withRoot: true },
      ),
    )

    const subjectInput = screen.getByTestId('subject-input')
    await userEvent.type(subjectInput, 'Subject email')
    const nextButton = screen.getByText('Next')
    await userEvent.click(nextButton)

    const sendButton = screen.getByText('Yes, Send')
    await userEvent.click(sendButton)
  }

  const selectedVendors: string[] = ['1', '2']

  it('should render email editor components', async () => {
    render(
      withWrappers(
        <EmailForm
          toggleDialog={true}
          setToggleDialog={mockToggleDialog}
          vendorIds={selectedVendors}
        />,
        { withRoot: true },
      ),
    )

    expect(
      screen.getByRole('heading', { name: /compose email/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/compose your email to/i)).toBeInTheDocument()
    await waitFor(
      () => {
        expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('should show error message when email content is empty and next is clicked', async () => {
    render(
      withWrappers(
        <EmailForm
          toggleDialog={true}
          setToggleDialog={mockToggleDialog}
          vendorIds={selectedVendors}
        />,
        { withRoot: true },
      ),
    )

    const subjectInput = screen.getByTestId('subject-input')
    await userEvent.clear(subjectInput)

    const nextButton = screen.getByText('Next')
    await userEvent.click(nextButton)

    expect(
      await screen.findByText(
        'Email body or subject cannot be empty. Please write your email before proceeding.',
      ),
    ).toBeInTheDocument()
  })

  it('should go to confirmation when email content is not empty and next is clicked', async () => {
    render(
      withWrappers(
        <EmailForm
          toggleDialog={true}
          setToggleDialog={mockToggleDialog}
          vendorIds={selectedVendors}
          defaultContent="Enter your email template"
        />,
        { withRoot: true },
      ),
    )

    const subjectInput = screen.getByTestId('subject-input')
    await userEvent.type(subjectInput, 'Subject email')
    const nextButton = screen.getByText('Next')
    await userEvent.click(nextButton)

    expect(
      screen.getByRole('heading', { name: /confirm send email/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/are you sure you want to send the following email/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /yes, send/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /no, go back/i }),
    ).toBeInTheDocument()
  })

  it('should handle email blast and show success toast when success', async () => {
    await emailBlastProcedure()
    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Success')
      expect(toast.innerText).includes('Email blast has successfully executed')
    })
  })

  it('should handle email blast and show error toast when error', async () => {
    mswServer.use(
      http.post(`${API_BASE_URL}/vendor/blast`, () =>
        HttpResponse.json({ error: 'error' }, { status: 500 }),
      ),
    )
    await emailBlastProcedure()
    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('500')
      expect(toast.innerText).includes('error')
    })
  })

  it('should render email editor components with default content', async () => {
    render(
      withWrappers(
        <EmailForm
          toggleDialog={true}
          setToggleDialog={mockToggleDialog}
          vendorIds={selectedVendors}
        />,
        { withRoot: true },
      ),
    )

    expect(
      screen.getByRole('heading', { name: /compose email/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/compose your email to/i)).toBeInTheDocument()
    await waitFor(
      () => {
        expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()

    const subjectInput = screen.getByTestId(
      'subject-input',
    ) as HTMLInputElement
    expect(subjectInput.value).toBe('Request for products')
  })
})
