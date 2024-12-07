import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import EvaluationFormPage from '../vendor_.evaluation-form.lazy.tsx'

describe('<EvaluationFormPage/>', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<EvaluationFormPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(
      screen.getByText(/Vendor Performance\s*Evaluation Form/i),
    ).toBeInTheDocument()
    expect(screen.getByText('Vendor A')).toBeInTheDocument()
  })

  it('should render the form penilaian table content properly', async () => {
    const { container } = render(
      withWrappers(<EvaluationFormPage />, { withRoot: true }),
    )
    await waitForNoLoadingOverlay()
    expect(container.innerText.trim()).toMatchSnapshot()
  })

  it('should render handle update value when other radio button clicked', async () => {
    render(withWrappers(<EvaluationFormPage />, { withRoot: true }))

    await waitForNoLoadingOverlay()

    screen.debug(undefined, 100000)

    const radioGroups = screen.getAllByRole('radiogroup')
    const firstRadioButton = within(radioGroups[0]).getByRole('radio')
    const secondRadioButton = within(radioGroups[1]).getByRole('radio')

    await userEvent.click(firstRadioButton)
    await userEvent.click(secondRadioButton)
  })
})
