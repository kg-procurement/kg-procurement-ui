import './index.css'

import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxStoreProvider } from 'react-redux'

import store from '@/lib/redux/store.ts'
import { router } from '@/lib/router.ts'

import { Toaster } from './components/atoms/toaster.tsx'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: "https://eabf794a73ef0fe9053001dac33190d3@o4508379655372800.ingest.us.sentry.io/4508379657535488",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /https:\/\/.+/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enabled: !!import.meta.vitest || process.env.NODE_ENV === "production",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </ReduxStoreProvider>
  </StrictMode>,
)
