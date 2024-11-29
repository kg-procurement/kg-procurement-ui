import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { renderRoute } from '@/lib/testing/router.tsx'

vi.mock('@tanstack/react-router', async importOriginal => ({
  ...(await importOriginal()),
  useNavigate: vi.fn(() => vi.fn()),
}))

describe('RegisterPage', () => {
  it('should render the register account title', () => {
    renderRoute('/register')
    expect(
      screen.getByRole('heading', { name: 'Register' }),
    ).toBeInTheDocument()
  })

  it('should render email input', () => {
    renderRoute('/register')
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('should render register button', () => {
    renderRoute('/register')
    expect(
      screen.getByRole('button', { name: 'Register' }),
    ).toBeInTheDocument()
  })

  it('should reset input value and render success toast after the register successful', async () => {
    renderRoute('/register')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const registerButton = screen.getByRole('button', { name: 'Register' })

    const mockEmail = 'test@mail.com'
    const mockPassword = '12345'

    await userEvent.type(emailInput, mockEmail)
    await userEvent.type(passwordInput, mockPassword)
    expect(passwordInput).toHaveValue(mockPassword)

    await userEvent.click(registerButton)
    expect(emailInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Success')
      expect(toast.innerText).includes('Account registered successfully')
    })
  })

  it('should input value no reset and render error toast after the register fail', async () => {
    const statusCode = 500
    const errorMessage =
      'pq: duplicate key value violates unique constraint "account_email_key"'
    mswServer.use(
      http.post(`${API_BASE_URL}/account/register`, () =>
        HttpResponse.json(
          {
            error: errorMessage,
          },
          { status: statusCode },
        ),
      ),
    )

    renderRoute('/register')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const registerButton = screen.getByRole('button', { name: 'Register' })

    const mockEmail = 'test@mail.com'
    const mockPassword = '12345'

    await userEvent.type(emailInput, mockEmail)
    await userEvent.type(passwordInput, mockPassword)
    expect(emailInput).toHaveValue(mockEmail)
    expect(passwordInput).toHaveValue(mockPassword)

    await userEvent.click(registerButton)
    expect(emailInput).toHaveValue(mockEmail)
    expect(passwordInput).toHaveValue(mockPassword)

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes(`${statusCode}`)
      expect(toast.innerText).includes(errorMessage)
    })
  })
})
