import './index.css'

import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'

import { AppStore } from '@/lib/redux/store.ts'
import { router } from '@/lib/router.ts'

import { Toaster } from './components/atoms/toaster.tsx'

export interface MainProps {
  store: AppStore
}

export default function Main({ store }: MainProps) {
  return (
    <StrictMode>
      <ReduxStoreProvider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </ReduxStoreProvider>
    </StrictMode>
  )
}
