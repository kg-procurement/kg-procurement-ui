import { z } from 'zod'

export const vendorSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  bp_id: z.string(),
  bp_name: z.string(),
  rating: z.number(),
  area_group_id: z.string(),
  area_group_name: z.string(),
  sap_code: z.string(),
  modified_date: z.string().datetime(),
  modified_by: z.string(),
  dt: z.string().datetime(),
})

export const vendorPageSearchSchema = z.object({
  page: z.number().catch(1),
  product_name: z.string().catch(''),
  location: z.string().catch(''),
})

export const vendorEvaluationSchema = z.object({
  id: z.string(),
  vendor_id: z.string(),
  kesesuaian_produk: z.number(),
  kualitas_produk: z.number(),
  ketepatan_waktu_pengiriman: z.number(),
  kompetitifitas_harga: z.number(),
  responsivitas_kemampuan_komunikasi: z.number(),
  kemampuan_dalam_menangani_masalah: z.number(),
  kelengkapan_barang: z.number(),
  harga: z.number(),
  term_of_payment: z.number(),
  reputasi: z.number(),
  ketersediaan_barang: z.number(),
  kualitas_layanan_after_services: z.number(),
  modified_date: z.string(),
})

export type Vendor = z.infer<typeof vendorSchema>
