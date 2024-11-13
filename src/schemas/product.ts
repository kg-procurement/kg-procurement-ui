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

export const priceSchema = z.object({
  id: z.string(),
  price: z.number(),
  currency_code: z.string(),
  vendor_id: z.string(),
  modified_date: z.string().datetime(),
  modified_by: z.string(),
})

export const productVendorSchema = z.object({
  id: z.string(),
  product: productSchema,
  price: priceSchema,
  code: z.string(),
  name: z.string(),
  income_tax_id: z.string(),
  income_tax_name: z.string(),
  income_tax_percentage: z.string(),
  description: z.string(),
  uom_id: z.string(),
  sap_code: z.string(),
  modified_date: z.string().datetime(),
  modified_by: z.string(),
})

export type Product = z.infer<typeof productSchema>
export type Price = z.infer<typeof priceSchema>
export type ProductVendor = z.infer<typeof productVendorSchema>
