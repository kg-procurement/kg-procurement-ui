import { z } from 'zod'

import { Account } from '@/schemas/account.ts'

export const registerAccountResponseSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
})

export type RegisterAccountResponse = z.infer<
  typeof registerAccountResponseSchema
>

export interface RegisterAccountRequestArgs {
  payload: Pick<Account, 'email' | 'password'>
}
