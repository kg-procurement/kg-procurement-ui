import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { withWrappers } from '@/lib/testing/utils.tsx'

import { RadioGroup, RadioGroupItem } from '../radio-button.tsx'

describe('<Button />', () => {
  it('should render correctly with correct children', () => {
    render(withWrappers(
      <RadioGroup>
        <RadioGroupItem value="1" />
        <RadioGroupItem value="2" />
      </RadioGroup>,
    ))
    const radioButtons = screen.getAllByRole('radio')
    expect(radioButtons).toHaveLength(2)
  })

  it('should be able to be selected', async () => {
    render(withWrappers(
      <RadioGroup>
        <RadioGroupItem value="1" />
        <RadioGroupItem value="2" />
      </RadioGroup>,
    ))
    const radioButtons = screen.getAllByRole('radio')
    await userEvent.click(radioButtons[0])
    await userEvent.click(radioButtons[0])
  })
})
