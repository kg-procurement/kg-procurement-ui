import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

// import { z } from 'zod'
import { mswServer } from '@/lib/msw/index.ts'
// import { GetProductsByVendorArgs, getProductsByVendorResponseSchema } from '@/lib/redux/features/product/validation.ts'
// import { api } from '@/lib/redux/services/api.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import CustomPagination from '../custom-pagination.tsx'
// const responseSchema = z.object({
//   total_page: z.number(),
//   current_page: z.number(),
// })
// type Metadata = z.infer<typeof responseSchema>
// const mockApi = api.injectEndpoints({
//   overrideExisting: false,
//   endpoints: builder => ({
//     getProductsByVendor: builder.query<
//       Metadata,
//       GetProductsByVendorArgs
//     >({
//       extraOptions: { responseValidator: getProductsByVendorResponseSchema },
//       query: args => ({
//         method: 'GET',
//         url: `/product/vendor/${args.id}`,
//         params: args,
//       }),
//     }),
//   }),
// })
// const { useGetProductsByVendorQuery } = mockApi
describe('<CustomPagination />', () => {
  it('should render the current page correctly', () => {
    render(withWrappers(<CustomPagination current_page={2} total_page={5} setPage={() => {}} />))
    const currentPage = screen.getByText('2')
    const nextPage = screen.getByText('3')
    const prevPage = screen.getByText('1')
    expect(currentPage).toBeInTheDocument()
    expect(nextPage).toBeInTheDocument()
    expect(prevPage).toBeInTheDocument()
  })
  it('should render the "Previous" button and disable "Next" button', () => {
    mswServer.use(http.get(`/product/vendor/1`, () =>
      HttpResponse.json({ current_page: 5, total_page: 5 }),
    ))
    render(withWrappers(<CustomPagination current_page={5} total_page={5} setPage={() => {}} />))
    const prevButton = screen.getByRole('button', { name: 'Go to previous page' })
    const nextButton = screen.getByRole('button', { name: 'Go to next page' })
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeDisabled()
  })

  it('should render the "Next" button and disable "Previous" button', () => {
    mswServer.use(http.get(`/product/vendor/1`, () =>
      HttpResponse.json({ current_page: 1, total_page: 5 }),
    ))
    render(withWrappers(<CustomPagination current_page={1} total_page={5} setPage={() => {}} />))
    const prevButton = screen.getByRole('button', { name: 'Go to previous page' })
    const nextButton = screen.getByRole('button', { name: 'Go to next page' })
    expect(nextButton).toBeInTheDocument()
    expect(prevButton).toBeDisabled()
  })
})
