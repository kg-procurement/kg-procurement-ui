import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import EmailPage from '../email.tsx'

describe('<EmailPage />', () => {
  it('should render properly without crashing', () => {
    render(withWrappers(<EmailPage />))
  })

  it('should render the header section with the logo', () => {
    render(withWrappers(<EmailPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Email Status')).toBeInTheDocument()
  })

  it('should render email status content properly', async () => {
    render(withWrappers(<EmailPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()
    expect(screen.getByTestId('email-status-table').innerText).toMatchSnapshot()
  })

  it('should render input boxes for filtering by email', () => {
    render(withWrappers(<EmailPage />))

    const emailFiterInput = screen.getByTestId('filter-by-email')

    expect(screen.getByPlaceholderText('Filter by Email')).toBeInTheDocument()
    expect(emailFiterInput).toBeInTheDocument()
  })

  it('should call update email status mutation when clicking the save button', async () => {
    render(withWrappers(<EmailPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const ids = [
      'email-status-button-failed',
      'email-status-button-success',
      'email-status-button-inprogress',
      'email-status-button-completed',
    ]
    ids.forEach((id) => {
      const button = screen.getAllByTestId(id)[0]
      expect(button).toBeInTheDocument()
      button.click()
    })
  })

  it('should call handle when update email status mutation fail', async () => {
    const statusCode = 500
    const errorMessage =
      'error'
    mswServer.use(
      http.put(`${API_BASE_URL}/email-status/:id`, () =>
        HttpResponse.json(
          {
            error: errorMessage,
          },
          { status: statusCode },
        ),
      ),
    )

    render(withWrappers(<EmailPage />, { withRoot: true }))
    await waitForNoLoadingOverlay()

    const ids = [
      'email-status-button-failed',
      'email-status-button-success',
      'email-status-button-inprogress',
      'email-status-button-completed',
    ]
    ids.forEach((id) => {
      const button = screen.getAllByTestId(id)[0]
      expect(button).toBeInTheDocument()
      button.click()
    })
  })
})
