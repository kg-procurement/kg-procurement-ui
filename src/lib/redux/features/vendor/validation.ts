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
export const getVendorByIdResponseSchema = vendorSchema

export type GetVendorByIdResponse = z.infer<typeof getVendorByIdResponseSchema>

export interface GetVendorByIdRequestArgs {
  id: string
}

export const getLocationsResponseSchema = z.object({
  locations: z.array(z.string()),
})

export type GetLocationsResponse = z.infer<typeof getLocationsResponseSchema>

export const updateVendorResponseSchema = vendorSchema

export type UpdateVendorResponse = z.infer<typeof updateVendorResponseSchema>

export interface UpdateVendorRequestArgs {
  id: string
  payload: Partial<z.infer<typeof vendorSchema>>
}
