import { z } from 'zod'

import { PaginationArgs, paginationSpecSchema } from '@/schemas/common.ts'
import { vendorSchema } from '@/schemas/vendor.ts'

export const getVendorsResponseSchema = paginationSpecSchema.extend({
  vendors: z.array(vendorSchema),
})

export type GetVendorsResponse = z.infer<typeof getVendorsResponseSchema>

export interface GetVendorsRequestArgs extends PaginationArgs {
  location: string
  product: string
}

export interface EmailVendorsArgs {
  vendor_ids: string[]
  email_template: {
    subject: string
    body: string
  }
}
