import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import Page from '../register.tsx'

describe('<RegisterPage />', () => {
  it('should render correctly without crashing', () => {
    render(withWrappers(<Page />))
    expect(
      screen.getByRole('heading', { name: 'Register' }),
    ).toBeInTheDocument()
  })
})
