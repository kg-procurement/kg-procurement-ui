import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import DashboardPage from '../dashboard.tsx'
import RegisterPage from '../register.tsx'

describe('RegisterPage', () => {
  it('should render the register account title', () => {
    render(<RegisterPage />)
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument()
  })

  it('should toggle password visibility when the eye icon is clicked', () => {
    render(<RegisterPage />)
    const passwordInput = screen.getByPlaceholderText('Password')
    const toggleButton = screen
      .getAllByRole('button')
      .find(button => button.querySelector('svg'))
    expect(toggleButton).toBeInTheDocument()

    // Initially, the password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Click to show the password
    if (toggleButton) {
      fireEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'text')

      // Click again to hide the password
      fireEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'password')
    }
    else {
      throw new Error('Toggle button not found')
    }
  })

  it('should render email input', () => {
    render(<RegisterPage />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('should render register button', () => {
    render(<RegisterPage />)
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })
})
