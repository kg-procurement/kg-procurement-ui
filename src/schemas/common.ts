import { z } from 'zod'

export const paginationSpecSchema = z.object({
  metadata: z.object({
    total_page: z.number(),
    current_page: z.number(),
    total_entries: z.number(),
  }),
})

export type PaginationSpec = z.infer<typeof paginationSpecSchema>

export interface PaginationArgs {
  /**
   * One-based indexing for page number to be fetched
   * @default 1
   */
  page?: number
  /**
   * Ascending or descending
   * `ASC` | `DESC`
   * @default `ASC`
   */
  order?: string
  order_by?: string
}
