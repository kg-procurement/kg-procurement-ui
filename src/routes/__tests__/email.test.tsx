import { render, screen } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import EmailPage from '../email.tsx'

describe('<EmailPage />', () => {
  it('should render properly without crashing', () => {
    render(withWrappers(<EmailPage />))
  })

  it('should render email status content properly', async () => {
    render(withWrappers(<EmailPage />))
    await waitForNoLoadingOverlay()
    expect(
      screen.getByTestId('email-status-table').innerText,
    ).toMatchSnapshot()
  })
})
