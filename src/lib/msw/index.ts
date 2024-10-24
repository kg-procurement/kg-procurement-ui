import { setupServer } from 'msw/node'

import { accountHandlers } from '@/lib/msw/account.ts'
import { productHandlers } from '@/lib/msw/product.ts'
import { vendorHandlers } from '@/lib/msw/vendor.ts'

<<<<<<< HEAD
const handlers = [
  ...vendorHandlers,
  ...productHandlers,
]
=======
const handlers = [...vendorHandlers, ...productHandlers, ...accountHandlers]
>>>>>>> 0c2cfd3d4b4a547aac9ae52c885339812e675b65

export const mswServer = setupServer(...handlers)
