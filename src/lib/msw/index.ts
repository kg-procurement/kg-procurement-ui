import { setupServer } from 'msw/node'

import { accountHandlers } from '@/lib/msw/account.ts'
import { productHandlers } from '@/lib/msw/product.ts'
import { vendorHandlers } from '@/lib/msw/vendor.ts'

const handlers = [...vendorHandlers, ...productHandlers, ...accountHandlers]

export const mswServer = setupServer(...handlers)
