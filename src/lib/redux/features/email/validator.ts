import { z } from 'zod'

import { PaginationArgs, paginationSpecSchema } from '@/schemas/common.ts'
import { emailStatusSchema } from '@/schemas/email.ts'

export interface GetEmailRequestArgs extends PaginationArgs {
  email_to: string
}


export const getEmailStatusesResponseSchema = paginationSpecSchema.extend({
  email_status: z.array(emailStatusSchema),
})

export type GetEmailStatusesResponse = z.infer<
  typeof getEmailStatusesResponseSchema
>
