// TODO: commented for future validation use
// import { z } from 'zod'

// export const accountSchema = z.object({
//   id: z.string(),
//   email: z.string(),
//   password: z.string(),
//   modified_date: z.string().datetime(),
//   created_at: z.string().datetime(),
// })

// export type Account = z.infer<typeof accountSchema>

// TODO: remove this file if the code above is uncommented
export interface Account {
  id: string
  email: string
  password: string
  modified_date: string
  created_at: string
}
