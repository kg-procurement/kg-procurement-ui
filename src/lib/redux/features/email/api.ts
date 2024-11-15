import { api } from '@/lib/redux/services/api.ts'
import { PaginationArgs } from '@/schemas/common.ts'

import {
  GetEmailStatusesResponse,
  getEmailStatusesResponseSchema,
} from './validator.ts'

export const emailApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    getEmailStatuses: builder.query<GetEmailStatusesResponse, PaginationArgs>({
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
