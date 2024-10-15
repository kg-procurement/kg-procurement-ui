import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/env.ts'

import { baseQueryWithZodValidation } from './baseQuery.ts'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithZodValidation(
    fetchBaseQuery({
      baseUrl: API_BASE_URL,
      async prepareHeaders() {
        // TODO: Do JWT Fetching logic and attach it to the header here
      },
    }),
  ),
  tagTypes: ['Vendor'],
  endpoints: () => ({}),
})
