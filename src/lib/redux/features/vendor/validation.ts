import { z } from 'zod'

import { PaginationArgs, paginationSpecSchema } from '@/schemas/common.ts'
import { emailStatusSchema } from '@/schemas/email.ts'
import { vendorEvaluationSchema, vendorSchema } from '@/schemas/vendor.ts'

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

export interface GetEmailRequestArgs extends PaginationArgs {
  email_to: string
}

export const getEmailStatusesResponseSchema = paginationSpecSchema.extend({
  email_status: z.array(emailStatusSchema),
})

export type GetEmailStatusesResponse = z.infer<
  typeof getEmailStatusesResponseSchema
>

export interface VendorEvaluationRequestArgs {
  vendor_id: string
  kesesuaian_produk: number
  kualitas_produk: number
  ketepatan_waktu_pengiriman: number
  kompetitifitas_harga: number
  responsivitas_kemampuan_komunikasi: number
  kemampuan_dalam_menangani_masalah: number
  kelengkapan_barang: number
  harga: number
  term_of_payment: number
  reputasi: number
  ketersediaan_barang: number
  kualitas_layanan_after_services: number
}

export type VendorEvaluationReponse = z.infer<typeof vendorEvaluationSchema>

export const createVendorEvaluationResponseSchema = z.object({
  vendor_evaluation: vendorEvaluationSchema,
})
