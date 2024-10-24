import { z } from 'zod'

import { Product, productSchema } from '@/schemas/product.ts'

export const getProductsByVendorResponseSchema = z.object({
  products: z.array(productSchema),
})

export const updateProductResponseSchema = productSchema

export type GetProductsByVendorResponse = z.infer<
  typeof getProductsByVendorResponseSchema
>

export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>

export interface GetProductsByVendorArgs {
  id: string
  name: string
}

export interface UpdateProductRequestArgs {
  id: string
  payload: Partial<Product>
}
