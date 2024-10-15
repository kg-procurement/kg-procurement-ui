import './src/index.css'
import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { afterEach } from 'vitest'

import { vendorHandlers } from '@/lib/msw/vendor.ts'

const server = setupServer(...vendorHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

// Runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
