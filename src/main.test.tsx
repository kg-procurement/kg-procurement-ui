import { RouterProvider } from '@tanstack/react-router'
import { render, waitFor } from '@testing-library/react'
import { StrictMode } from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'

import { configureAppStore } from '@/lib/redux/store.ts'
import { router } from '@/lib/router.ts'

import { Toaster } from './components/atoms/toaster.tsx'

describe('App root test', () => {
  it('should render correctly without crashing', async () => {
    const store = configureAppStore()

    // Wrap the render inside `waitFor` to handle any asynchronous updates.
    // This is necessary because React Router and Redux can trigger internal state updates
    // asynchronously during the initial render, which can cause React Testing Library to throw
    // warnings about updates not being wrapped in `act`.
    await waitFor(() => {
      render(
        <StrictMode>
          <ReduxStoreProvider store={store}>
            <Toaster />
            <RouterProvider router={router} />
          </ReduxStoreProvider>
        </StrictMode>,
      )
    })
  })
})
