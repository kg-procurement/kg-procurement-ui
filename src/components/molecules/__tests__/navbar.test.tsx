import { render, screen } from '@testing-library/react'

import Navbar from '@/components/molecules/Navbar.tsx'
import { withWrappers } from '@/lib/testing/utils.tsx'

describe('<Navbar />', () => {
  it('should render kompas gramedia image', () => {
    render(withWrappers(<Navbar />))
    expect(screen.getByAltText('Kompas Gramedia Logo Image')).toBeInTheDocument()
    expect(screen.getAllByText('Evaluation Form'))
  })
  it('should return navigation option', () => {
    render(withWrappers(<Navbar />))
    expect(screen.getAllByText('Evaluation Form'))
    expect(screen.getAllByText('Search'))
  })
})
