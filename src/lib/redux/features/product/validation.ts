import { z } from 'zod'

import { PaginationArgs, paginationSpecSchema } from '@/schemas/common.ts'
import { Product, productSchema, productVendorSchema } from '@/schemas/product.ts'

export const getProductsByVendorResponseSchema = paginationSpecSchema.extend({
  product_vendors: z.array(productVendorSchema).nullable(),
})

export const updateProductResponseSchema = productSchema

export type GetProductsByVendorResponse = z.infer<
  typeof getProductsByVendorResponseSchema
>

export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>

export interface GetProductsByVendorArgs extends PaginationArgs {
  id: string
  name: string
}

export interface GetProductVendorsArgs extends PaginationArgs {
  name: string
}

export interface UpdateProductRequestArgs {
  id: string
  payload: Partial<Product>
}
