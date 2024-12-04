import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect } from 'react'

import { withWrappers } from '@/lib/testing/utils.tsx'
import { useAuthStore } from '@/lib/zustand/auth.ts'

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
    expect(screen.getAllByTestId('navigation-menu').map(elm => elm.innerText))
      .toMatchInlineSnapshot(`
        [
          "Email Status",
          "Products",
          "Vendors",
          "Evaluation Form",
        ]
      `)
  })
  it('should render log out button when cookie is present', async () => {
    function TestComponent() {
      const setUserId = useAuthStore(state => state._setUserIdTestOnly)

      useEffect(() => {
        setUserId('dummy')
      }, [setUserId])

      return <Navbar />
    }

    render(withWrappers(<TestComponent />))
    await waitFor(() => {
      expect(screen.getByText(/log out/i)).toBeInTheDocument()
    })
    await userEvent.click(screen.getByText(/log out/i))
  })
})
