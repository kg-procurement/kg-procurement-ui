import { z } from 'zod'

import { Account } from '@/schemas/account.ts'

export const registerAccountResponseSchema = z.object({
  message: z.string(),
})

export type RegisterAccountResponse = z.infer<
  typeof registerAccountResponseSchema
>

export interface RegisterAccountRequestArgs {
  payload: Pick<Account, 'email' | 'password'>
}

export interface LoginAccountRequestArgs {
  payload: Pick<Account, 'email' | 'password'>
}

export const loginAccountResponseSchema = z.object({
  token: z.string(),
})

export type LoginAccountResponse = z.infer<typeof loginAccountResponseSchema>
