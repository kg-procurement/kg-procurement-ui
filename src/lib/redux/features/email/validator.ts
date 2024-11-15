import { z } from 'zod'

import { paginationSpecSchema } from '@/schemas/common.ts'
import { emailStatusSchema } from '@/schemas/email.ts'

export const getEmailStatusesResponseSchema = paginationSpecSchema.extend({
  email_status: z.array(emailStatusSchema),
})

export type GetEmailStatusesResponse = z.infer<
  typeof getEmailStatusesResponseSchema
>
