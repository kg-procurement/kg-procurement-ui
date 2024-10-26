import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { RegisterAccountResponse } from '@/lib/redux/features/account/validation.ts'

export const accountHandlers = [
  http.post(`${API_BASE_URL}/account/register`, () => {
    return HttpResponse.json({
      message: 'Account registered successfully',
    } satisfies RegisterAccountResponse)
  }),
]
