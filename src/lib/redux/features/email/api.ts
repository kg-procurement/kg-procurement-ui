import { api } from '@/lib/redux/services/api.ts'

import {
  GetEmailRequestArgs,
  GetEmailStatusesResponse,
  getEmailStatusesResponseSchema,
} from './validator.ts'

export const emailApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    getEmailStatuses: builder.query<GetEmailStatusesResponse, GetEmailRequestArgs>({
      extraOptions: { responseValidator: getEmailStatusesResponseSchema },
      query: args => ({
        method: 'GET',
        url: `/email-status`,
        params: args,
      }),
    }),
  }),
})

export const { useGetEmailStatusesQuery } = emailApi
