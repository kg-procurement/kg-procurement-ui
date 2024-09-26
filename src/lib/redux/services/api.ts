import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    async prepareHeaders() {
      // TODO: Do JWT Fetching logic and attach it to the header here
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
})
