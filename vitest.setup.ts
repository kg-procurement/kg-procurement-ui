import '@testing-library/jest-dom/vitest'
import './src/index.css'

import { cleanup } from '@testing-library/react'
import { setupServer } from 'msw/node'

import { accountHandlers } from '@/lib/msw/account.ts'
import { productHandlers } from '@/lib/msw/product.ts'
import { vendorHandlers } from '@/lib/msw/vendor.ts'

const server = setupServer(...vendorHandlers, ...productHandlers, ...accountHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

afterEach(() => {
  // Reset handlers after each test `important for test isolation`
  server.resetHandlers()
  // Runs a clean after each test case (e.g. clearing jsdom)
  cleanup()
})
