import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import LoginPage from '../login.tsx'

describe('<LoginPage />', () => {
  it('should render the login form with email and password fields', () => {
    render(withWrappers(<LoginPage />))

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(withWrappers(<LoginPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should allow the user to type in the email and password fields', () => {
    render(withWrappers(<LoginPage />))

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)

    fireEvent.change(emailInput, { target: { value: 'user123@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput).toHaveValue('user123@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('should navigate to the register page when "register here" is clicked', () => {
    render(withWrappers(<LoginPage />))

    fireEvent.click(screen.getByText(/register here/i))

    expect(window.location.pathname).toBe('/register')
  })
  it('should reset input values and display success toast on successful login', async () => {
    const mockToken = 'mockToken123';
    mswServer.use(
      http.post(`${API_BASE_URL}/account/login`, () =>
        HttpResponse.json(
          { token: mockToken },
          { status: 200 },
        ),
      ),
    )
            
    render(withWrappers(<LoginPage />))

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await userEvent.type(emailInput, 'user123@example.com')
    await userEvent.type(passwordInput, 'password123')
    expect(emailInput).toHaveValue('user123@example.com')
    expect(passwordInput).toHaveValue('password123')

    await userEvent.click(loginButton)

    expect(emailInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast).toHaveTextContent('Success')
      expect(toast).toHaveTextContent('Login successful!')
    })
  })

  it('should retain input values and display error toast on failed login', async () => {
    const statusCode = 401
    const errorMessage =
      'login failed'
    mswServer.use(
      http.post(`${API_BASE_URL}/account/login`, () =>
        HttpResponse.json(
          {
            error: errorMessage,
          },
          { status: statusCode },
        ),
      ),
    )
    render(withWrappers(<LoginPage />))

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await userEvent.type(emailInput, 'wronguser@example.com')
    await userEvent.type(passwordInput, 'wrongpassword')
    expect(emailInput).toHaveValue('wronguser@example.com')
    expect(passwordInput).toHaveValue('wrongpassword')

    await userEvent.click(loginButton)

    expect(emailInput).toHaveValue('wronguser@example.com')
    expect(passwordInput).toHaveValue('wrongpassword')

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast).toHaveTextContent(`${statusCode}`)
      expect(toast).toHaveTextContent(errorMessage)
    })
  })
})
