import { z } from 'zod'

import { PaginationArgs, paginationSpecSchema } from '@/schemas/common.ts'
import { Product, productSchema } from '@/schemas/product.ts'

export const getProductsByVendorResponseSchema = paginationSpecSchema.extend({
  products: z.array(productSchema),
})

export const updateProductResponseSchema = productSchema

export type GetProductsByVendorResponse = z.infer<
  typeof getProductsByVendorResponseSchema
>

export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>

export interface GetProductsByVendorArgs extends PaginationArgs {
  id: string
}

export interface UpdateProductRequestArgs {
  id: string
  payload: Partial<Product>
}
