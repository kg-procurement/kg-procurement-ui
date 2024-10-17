import { z } from 'zod'

import { productSchema } from '@/schemas/product.ts'

export const getProductsByVendorResponseSchema = z.object({
  products: z.array(productSchema),
})

export type GetProductsByVendorResponse = z.infer<
  typeof getProductsByVendorResponseSchema
>
