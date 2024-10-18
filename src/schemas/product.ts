import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  product_category_id: z.string(),
  uom_id: z.string(),
  income_tax_id: z.string(),
  product_type_id: z.string(),
  name: z.string(),
  description: z.string(),
  modified_date: z.string().datetime(),
  modified_by: z.string(),
})

export type Product = z.infer<typeof productSchema>
