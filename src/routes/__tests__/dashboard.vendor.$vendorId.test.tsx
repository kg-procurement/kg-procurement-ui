import { RouterProvider } from '@tanstack/react-router'
import { render, screen, waitFor } from '@testing-library/react'

import { router } from '@/lib/router.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

describe('<DashboardPage />', () => {
  it('should render correctly without crashing', async () => {
    router.history.push('/dashboard/vendor/123')
    render(withWrappers(
      <RouterProvider router={router} />,
    ))

    screen.debug()

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })
})
