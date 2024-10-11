import { z } from 'zod'

// PaginationSpec schema
// TODO: Will probably have to change this to something else when the backend inevitable changes the format
export const paginationSpecSchema = z.object({
  Metadata: z.object({
    TotalPage: z.number(),
    CurrentPage: z.number(),
    TotalEntries: z.number(),
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
