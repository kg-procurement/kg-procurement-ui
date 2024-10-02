// Checkbox.test.tsx
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Checkbox } from './index.tsx'

describe('<Checkbox />', () => {
  it('should render the checkbox', () => {
    render(<Checkbox />)
    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).toBeInTheDocument()
  })
})
