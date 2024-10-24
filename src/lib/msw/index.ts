import { setupServer } from 'msw/node'

import { productHandlers } from '@/lib/msw/product.ts'
import { vendorHandlers } from '@/lib/msw/vendor.ts'

const handlers = [...vendorHandlers, ...productHandlers]

export const mswServer = setupServer(...handlers)
