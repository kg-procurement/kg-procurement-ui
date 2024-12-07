import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe } from 'vitest'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'
import { waitForNoLoadingOverlay } from '@/lib/testing/wait-for.ts'

import EvaluationFormPage from '../vendor_.$vendorId.evaluation-form.tsx'

const { mockGetProductsByVendorUseParams } = vi.hoisted(() => ({
  mockGetProductsByVendorUseParams: vi.fn(() => ({ vendorId: '2508' })),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')

  return {
    ...actual,
    useParams: mockGetProductsByVendorUseParams,
    useNavigate: vi.fn(() => vi.fn()),
    useLocation: vi.fn(() => ({ href: '/vendor/detail' })),
  }
})

describe('<EvaluationFormPage/>', () => {
  it('should render the header section with the logo', async () => {
    render(withWrappers(<EvaluationFormPage />, { withRoot: true }))

    await waitForNoLoadingOverlay()

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(
      screen.getByText(/Vendor Performance\s*Evaluation Form/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/Adriza Nikmah, PT/i)).toBeInTheDocument()
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

    const radioGroups = screen.getAllByRole('radiogroup')
    const firstRadioButton = within(radioGroups[0]).getByRole('radio')
    const secondRadioButton = within(radioGroups[1]).getByRole('radio')

    await userEvent.click(firstRadioButton)
    await userEvent.click(secondRadioButton)
  })

  it('should handle form submit when all field not yet filled', async () => {
    render(withWrappers(<EvaluationFormPage />, { withRoot: true }))

    await waitForNoLoadingOverlay()

    const radioGroups = screen.getAllByRole('radiogroup')
    const firstRadioButton = within(radioGroups[0]).getByRole('radio')

    await userEvent.click(firstRadioButton)

    const submitButton = screen.getByRole('button', { name: 'Submit Evaluation' })
    await userEvent.click(submitButton)
  })

  it('should handle form submit when all field are filled', async () => {
    render(withWrappers(<EvaluationFormPage />, { withRoot: true }))

    await waitForNoLoadingOverlay()

    const radioGroups = screen.getAllByRole('radiogroup')

    let radioButton = within(radioGroups[0]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[4]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[8]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[12]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[16]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[20]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[24]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[28]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[32]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[36]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[40]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[44]).getByRole('radio')
    await userEvent.click(radioButton)

    const submitButton = screen.getByRole('button', { name: 'Submit Evaluation' })
    await userEvent.click(submitButton)

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('success')
      expect(toast.innerText).includes('Email blast has successfully executed')
    })
    // await userEvent.click(secondRadioButton)
  }, 15000)

  it('should handle form submit when all field are filled but response error', async () => {
    render(withWrappers(<EvaluationFormPage />, { withRoot: true }))

    mswServer.use(
      http.post(`${API_BASE_URL}/vendor/evaluation`, () =>
        HttpResponse.json({ error: 'error' }, { status: 500 }),
      ),
    )

    await waitForNoLoadingOverlay()

    const radioGroups = screen.getAllByRole('radiogroup')

    let radioButton = within(radioGroups[0]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[4]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[8]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[12]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[16]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[20]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[24]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[28]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[32]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[36]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[40]).getByRole('radio')
    await userEvent.click(radioButton)
    radioButton = within(radioGroups[44]).getByRole('radio')
    await userEvent.click(radioButton)

    const submitButton = screen.getByRole('button', { name: 'Submit Evaluation' })
    await userEvent.click(submitButton)

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('500')
      expect(toast.innerText).includes('error')
    })
    // await userEvent.click(secondRadioButton)
  }, 15000)
})
