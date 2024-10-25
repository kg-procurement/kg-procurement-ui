import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import VendorPage from '../vendor.tsx'

// const { mockBlastEmail } = vi.hoisted(() => ({
//   mockBlastEmail: vi.fn(),
// }))

// vi.mock('@/lib/redux/features/vendor/api.ts', () => {
//   const actual = vi.importActual('@/lib/redux/features/vendor/api.ts')
//   return {
//     ...actual,
//     useBlastEmailMutation: mockBlastEmail,
//   }
// })

describe('<VendorPage/>', () => {
  it('should render the header section with the logo', () => {
    render(withWrappers(<VendorPage />))

    const logo = screen.getByAltText('Kompas Gramedia Logo Background')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/kompas-gramedia-logo-bg.svg')

    expect(screen.getByText('Search Vendor')).toBeInTheDocument()
    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument()
  })

  it('should render the vendors table content properly', async () => {
    const { container } = render(
      withWrappers(<VendorPage />, { withRoot: true }),
    )
    await waitFor(async () => {
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    })
    expect(container.innerText.trim()).toMatchSnapshot()
  })

  it('should render the footer', () => {
    render(withWrappers(<VendorPage />))
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument()
  })

  it('should render input boxes for filtering by product and location', () => {
    render(withWrappers(<VendorPage />))

    const productInput = screen.getByPlaceholderText('Filter by Product')
    const locationInput = screen.getByPlaceholderText('Filter by Location')

    expect(productInput).toBeInTheDocument()
    expect(locationInput).toBeInTheDocument()
  })

  it('should handle email blast and show success toast when success', async () => {
    render(withWrappers(<VendorPage />))

    // const blastButton = await waitFor(() => screen.getByRole('button', { name: 'Email Selected Vendor' }))
    const blastButton = await waitFor(() => screen.getByRole('button', { name: 'Email Selected Vendor' }))
    await userEvent.click(blastButton)

    // await waitFor(() => {
    //   const toast = screen.getByTestId('toast')
    //   expect(toast.innerText).toContain('On Progress')
    //   expect(toast.innerText).toContain('Executing email blast')
    // })

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Success')
      expect(toast.innerText).includes('Email blast has successfully executed')
    })

    // expect(toast).toHaveBeenCalledWith({
    //   title: 'On Progress',
    //   description: 'Executing email blast',
    //   duration: 2000,
    // })

    // expect(mockToast).toHaveBeenCalledWith({
    //   title: 'Success',
    //   description: 'Email blast has successfully executed',
    //   duration: 2000,
    // })
  })

  it('should handle email blast and show error toast when error', async () => {
    // mockBlastEmail.mockReturnValueOnce(new Error())
    // http.post(`${API_BASE_URL}/vendor/blast`, () => {
    //   return HttpResponse.json({ error: [
    //     '535 5.7.8 Username and Password not accepted. For more information, go to\n5.7.8  https://support.google.com/mail/?p=BadCredentials d2e1a72fcca58-72057931785sm150109b3a.50 - gsmtp',
    //     '535 5.7.8 Username and Password not accepted. For more information, go to\n5.7.8  https://support.google.com/mail/?p=BadCredentials d2e1a72fcca58-72057939b82sm152223b3a.81 - gsmtp',
    //   ] }, { status: 207 })
    // }),
    mswServer.use(http.post(`${API_BASE_URL}/vendor/blast`, () => HttpResponse.json({}, { status: 500 })))

    render(withWrappers(<VendorPage />))

    const blastButton = await waitFor(() => screen.getByRole('button', { name: 'Email Selected Vendor' }))
    await userEvent.click(blastButton)

    await waitFor(() => {
      const toast = screen.getByTestId('toast')
      expect(toast.innerText).includes('Error')
      expect(toast.innerText).includes('Email blast failed to be executed')
    })
  })
})
