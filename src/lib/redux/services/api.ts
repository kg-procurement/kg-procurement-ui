import { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

import { API_BASE_URL } from '@/env.ts'
import { RootState } from '@/lib/redux/store.ts'
import { AUTH_COOKIE_KEY } from '@/lib/zustand/auth.ts'

import { baseQueryWithZodValidation } from './baseQuery.ts'

export const HYDRATE = '__REDUX_STORE_HYDRATE__'

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithZodValidation(
    fetchBaseQuery({
      baseUrl: API_BASE_URL,
      prepareHeaders(headers) {
        const token = Cookies.get(AUTH_COOKIE_KEY)
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),
  ),
  // This any is recommended by the official redux docs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo: (action, { reducerPath }): any => {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['Vendor', 'Product'],
  endpoints: () => ({}),
})
