import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://eabf794a73ef0fe9053001dac33190d3@o4508379655372800.ingest.us.sentry.io/4508379657535488',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /https:\/\/.+/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
