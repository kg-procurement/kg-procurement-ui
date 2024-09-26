import './index.css'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxStoreProvider } from 'react-redux'

import store from './lib/redux/store.ts'
import { routeTree } from './routeTree.gen.ts'

const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <RouterProvider router={router} />
    </ReduxStoreProvider>
  </StrictMode>,
)
