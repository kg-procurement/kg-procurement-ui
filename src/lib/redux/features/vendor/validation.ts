import { z } from 'zod'

import { PaginationArgs, paginationSpecSchema } from '@/schemas/common.ts'
import { vendorSchema } from '@/schemas/vendor.ts'

export const getVendorsResponseSchema = paginationSpecSchema.extend({
  Vendors: z.array(vendorSchema),
})

export type GetVendorsResponse = z.infer<typeof getVendorsResponseSchema>

export interface GetVendorsRequestArgs extends PaginationArgs {
  location: string
  product: string
}
