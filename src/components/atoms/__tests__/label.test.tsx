import { render } from '@testing-library/react'

import { Label } from '../label.tsx'

describe('<Label />', () => {
  it('should render without crashing', () => {
    render(<Label />)
  })
})
