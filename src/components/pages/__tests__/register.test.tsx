import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { withWrappers } from '@/lib/testing/utils.tsx'

import DashboardPage from '../dashboard.tsx'
import RegisterPage from '../register.tsx'

describe('RegisterPage', () => {
  it('should render the register account title', () => {
    render(<RegisterPage />)
    expect(
      screen.getByRole('heading', { name: 'Register' }),
    ).toBeInTheDocument()
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
    render(withWrappers(<DashboardPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })
})
