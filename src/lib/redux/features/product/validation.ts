import { z } from 'zod'

import { Product, productSchema } from '@/schemas/product.ts'

export const updateProductResponseSchema = productSchema

export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>

export interface UpdateProductRequestArgs {
  id: string
  payload: Partial<Product>
}
