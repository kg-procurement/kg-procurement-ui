import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { withWrappers } from '@/lib/testing/utils.tsx'

import RegisterPage from '../register.tsx'

describe('RegisterPage', () => {
  it('should render the register account title', () => {
    render(withWrappers(<RegisterPage />))
    expect(
      screen.getByRole('heading', { name: 'Register' }),
    ).toBeInTheDocument()
  })

  it('should render email input', () => {
    render(withWrappers(<RegisterPage />))
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('should render register button', () => {
    render(withWrappers(<RegisterPage />))
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(withWrappers(<RegisterPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should reset input value after the register successful', async () => {
    render(withWrappers(<RegisterPage />))
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
    expect(emailInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
  })
})
