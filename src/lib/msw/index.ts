import { setupServer } from 'msw/node'

import { accountHandlers } from '@/lib/msw/account.ts'
import { emailHandlers } from '@/lib/msw/email.ts'
import { productHandlers } from '@/lib/msw/product.ts'
import { vendorHandlers } from '@/lib/msw/vendor.ts'

const handlers = [
  ...vendorHandlers,
  ...productHandlers,
  ...accountHandlers,
  ...emailHandlers,
]

export const mswServer = setupServer(...handlers)
