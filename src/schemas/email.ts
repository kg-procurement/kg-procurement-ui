import { z } from 'zod'

export const emailStatusSchema = z.object({
  id: z.string(),
  email_to: z.string(),
  status: z.string(),
  vendor_id: z.string(),
  date_sent: z.string().datetime(),
  vendor_name: z.string(),
  modified_date: z.string().datetime(),
  vendor_rating: z.number(),
})

export type EmailStatus = z.infer<typeof emailStatusSchema>
