import { z } from 'zod'

export const accountSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  modified_date: z.string().datetime(),
  created_at: z.string().datetime(),
})

export type Account = z.infer<typeof accountSchema>
