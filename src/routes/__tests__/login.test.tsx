import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import Page from '../login.tsx'

describe('<LoginPage />', () => {
  it('should render correctly without crashing', () => {
    render(withWrappers(<Page />))
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })
})
