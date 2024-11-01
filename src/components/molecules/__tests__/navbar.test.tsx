import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { withWrappers } from '@/lib/testing/utils.tsx'

import Navbar from '../navbar.tsx'

describe('<Navbar />', () => {
  it('should render kompas gramedia image', () => {
    render(withWrappers(<Navbar />))
    expect(
      screen.getByAltText('Kompas Gramedia Logo Image'),
    ).toBeInTheDocument()
    expect(screen.getAllByText('Evaluation Form'))
  })
  it('should return navigation option', () => {
    render(withWrappers(<Navbar />))
    expect(screen.getAllByText('Evaluation Form'))
    expect(screen.getAllByText('Search'))
  })
  it('should be able to log out', async () => {
    // TODO: Adjust this setup when login guard is done
    render(withWrappers(<Navbar />))
    await userEvent.click(screen.getByText('Log out'))
  })
})
