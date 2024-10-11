import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import LoginPage from '../login.tsx'

describe('<LoginPage />', () => {
  it('should render the header section with the login title and description', () => {
    render(withWrappers(<LoginPage />))

    expect(screen.getByRole('heading', { name: /login page/i })).toBeInTheDocument()
    expect(screen.getByText(/please enter your credentials to login/i)).toBeInTheDocument()
  })

  it('should render the login form', () => {
    render(withWrappers(<LoginPage />))

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(withWrappers(<LoginPage />))

    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })
})
