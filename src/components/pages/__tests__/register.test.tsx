// import { RouterProvider } from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
// import { Provider as ReduxStoreProvider } from 'react-redux'
import { describe, expect, it } from 'vitest'

// import store from '@/lib/redux/store.ts'
// import { router } from '@/lib/router.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

// import DashboardPage from '../dashboard/vendor/[vendorId].tsx'
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
    render(withWrappers(<RegisterPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })
})
