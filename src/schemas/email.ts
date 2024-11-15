import { z } from 'zod'

export const emailStatusSchema = z.object({
  id: z.string(),
  email_to: z.string(),
  status: z.string(),
  modified_date: z.string().datetime(),
})

export type EmailStatus = z.infer<typeof emailStatusSchema>
