import './index.css'

import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxStoreProvider } from 'react-redux'

import store from '@/lib/redux/store.ts'
import { router } from '@/lib/router.ts'

import { Toaster } from './components/atoms/toaster.tsx'
import "../sentry.config.ts"
import "../mixpanel.config.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </ReduxStoreProvider>
  </StrictMode>,
)
