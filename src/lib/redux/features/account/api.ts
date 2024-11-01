import { api } from '@/lib/redux/services/api.ts'

import {
  RegisterAccountRequestArgs,
  RegisterAccountResponse,
  registerAccountResponseSchema,
  LoginAccountRequestArgs,
  LoginAccountResponse,
  loginAccountResponseSchema,
} from './validation.ts'

export const accountApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    registerAccount: builder.mutation<
      RegisterAccountResponse,
      RegisterAccountRequestArgs
    >({
      extraOptions: { responseValidator: registerAccountResponseSchema },
      query: ({ payload }) => ({
        method: 'POST',
        url: `/account/register`,
        body: payload,
      }),
    }),
    loginAccount: builder.mutation<LoginAccountResponse, LoginAccountRequestArgs>({
      extraOptions: { responseValidator: loginAccountResponseSchema },
      query: ({ payload }) => ({
        method: 'POST',
        url: `/account/login`,
        body: payload,
      }),
    }),
  }),
})

export const { useRegisterAccountMutation, useLoginAccountMutation } = accountApi
