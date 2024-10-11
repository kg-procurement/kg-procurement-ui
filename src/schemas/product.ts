import { z } from 'zod'

import { paginationSpecSchema } from './common.ts'

// Product schema
export const productSchema = z.object({
  id: z.string(),
  product_category_id: z.string(),
  uom_id: z.string(),
  income_tax_id: z.string(),
  product_type_id: z.string(),
  name: z.string(),
  description: z.string(),
  modified_date: z.date(),
  modified_by: z.string(),
})

export type Product = z.infer<typeof productSchema>

// ProductCategory schema
export const productCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string(),
  parent_id: z.string(),
  specialist_bpid: z.string(),
  modified_date: z.date(),
  modified_by: z.string(),
})

export type ProductCategory = z.infer<typeof productCategorySchema>

// ProductType schema
export const productTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  goods: z.boolean(),
  asset: z.boolean(),
  stock: z.boolean(),
  modified_date: z.date(),
  modified_by: z.string(),
})
export type ProductType = z.infer<typeof productTypeSchema>

// UOM (Unit of Measurement) schema
export const uomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  dimension: z.string(),
  sap_code: z.string(),
  modified_date: z.date(),
  modified_by: z.string(),
  status_id: z.string(),
})

export type UOM = z.infer<typeof uomSchema>

// ProductVendor schema
export const productVendorSchema = z.object({
  product: productSchema,
  vendor: z.any(), // TODO: Replace this with actual Vendor schema if available
})

export type ProductVendor = z.infer<typeof productVendorSchema>

// Price schema
export const priceSchema = z.object({
  id: z.string(),
  purchasing_org_id: z.string(),
  vendor_id: z.string(),
  product_vendor_id: z.string(),
  quantity_min: z.number(),
  quantity_max: z.number(),
  quantity_uom_id: z.string(),
  lead_time_min: z.number(),
  lead_time_max: z.number(),
  currency_id: z.string(),
  price: z.number(),
  price_quantity: z.number(),
  price_uom_id: z.string(),
  valid_from: z.date(),
  valid_to: z.date(),
  valid_pattern_id: z.string(),
  area_group_id: z.string(),
  reference_number: z.string(),
  reference_date: z.date(),
  document_type_id: z.string(),
  document_id: z.string(),
  item_id: z.string(),
  term_of_payment_id: z.string(),
  invocation_order: z.number(),
  modified_date: z.date(),
  modified_by: z.string(),
})

export type Price = z.infer<typeof priceSchema>

// GetProductsByVendorSpec schema
export const getProductsByVendorSpecSchema = z.object({
  name: z.string(),
  pagination_spec: paginationSpecSchema, // Replace this with actual PaginationSpec schema if available
})

export type GetProductsByVendorSpec = z.infer<
  typeof getProductsByVendorSpecSchema
>

// PutProductSpec schema
export const putProductSpecSchema = z.object({
  product_category_id: z.string(),
  uom_id: z.string(),
  income_tax_id: z.string(),
  product_type_id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type PutProductSpec = z.infer<typeof putProductSpecSchema>

// PutPriceSpec schema
export const putPriceSpecSchema = z.object({
  name: z.string(),
  purchasing_org_id: z.string(),
  vendor_id: z.string(),
  product_vendor_id: z.string(),
  quantity_min: z.number(),
  quantity_max: z.number(),
  quantity_uom_id: z.string(),
  lead_time_min: z.number(),
  lead_time_max: z.number(),
  currency_id: z.string(),
  price: z.number(),
  price_quantity: z.number(),
  price_uom_id: z.string(),
  valid_from: z.date(),
  valid_to: z.date(),
  valid_pattern_id: z.string(),
  area_group_id: z.string(),
  reference_number: z.string(),
  reference_date: z.date(),
  document_type_id: z.string(),
  document_id: z.string(),
  item_id: z.string(),
  term_of_payment_id: z.string(),
  invocation_order: z.number(),
})

export type PutPriceSpec = z.infer<typeof putPriceSpecSchema>
