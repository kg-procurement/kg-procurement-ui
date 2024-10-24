import './src/index.css'
import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import { mswServer } from '@/lib/msw/index.ts'

// Start server before all tests
beforeAll(() => mswServer.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => mswServer.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => mswServer.resetHandlers())

// Runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  // Reset handlers after each test `important for test isolation`
  mswServer.resetHandlers()
  // Runs a clean after each test case (e.g. clearing jsdom)
  cleanup()
})
