import { fireEvent, render, screen } from '@testing-library/react'
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
})
