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

export type Vendor = z.infer<typeof vendorSchema>
