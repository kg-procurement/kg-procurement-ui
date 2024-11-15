import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '@/env.ts'
import { GetEmailStatusesResponse } from '@/lib/redux/features/email/validator.ts'

export const emailHandlers = [
  http.get(`${API_BASE_URL}/email-status`, () =>
    HttpResponse.json({
      email_status: [
        {
          id: '1',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '10',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '11',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '2',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '3',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '4',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '5',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '6',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '7',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
        {
          id: '8',
          email_to: 'andrewjeremy12345@gmail.com',
          status: 'SENT',
          modified_date: '2024-11-14T09:14:46.914Z',
        },
      ],
      metadata: {
        total_page: 2,
        current_page: 1,
        total_entries: 11,
      },
    } satisfies GetEmailStatusesResponse),
  ),
]
