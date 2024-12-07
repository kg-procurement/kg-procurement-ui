import { z } from 'zod'

import { PaginationArgs, paginationSpecSchema } from '@/schemas/common.ts'
import { emailStatusSchema } from '@/schemas/email.ts'
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
  subject: string
  body: string
  attachments: File[]
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

export interface AutomatedEmailBlastArgs {
  productName: string
}

export interface AutomatedEmailBlastResponse {
  message: string
}

export const automatedEmailBlastResponseSchema = z.object({
  message: z.string(),
})

export interface GetEmailRequestArgs extends PaginationArgs {
  email_to: string
}

export const getEmailStatusesResponseSchema = paginationSpecSchema.extend({
  email_status: z.array(emailStatusSchema),
})

export type GetEmailStatusesResponse = z.infer<
  typeof getEmailStatusesResponseSchema
>

export const updateEmailStatusResponseSchema = emailStatusSchema

export type UpdateEmailStatusResponse = z.infer<typeof updateEmailStatusResponseSchema>

export interface UpdateEmailStatusRequestArgs {
  id: string
  payload: Partial<z.infer<typeof emailStatusSchema>>
}
