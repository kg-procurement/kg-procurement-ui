import { api } from '@/lib/redux/services/api.ts'

import {
  UpdateProductRequestArgs,
  UpdateProductResponse,
  updateProductResponseSchema,
} from './validation.ts'

export const productApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    updateProduct: builder.mutation<
      UpdateProductResponse,
      UpdateProductRequestArgs
    >({
      extraOptions: { responseValidator: updateProductResponseSchema },
      query: ({ id, payload }) => ({
        method: 'PUT',
        url: `/product/${id}`,
        body: payload,
      }),
      invalidatesTags: (resp, _, arg) =>
        resp ? [{ type: 'Product', id: arg.id }] : [],
    }),
  }),
})

export const { useUpdateProductMutation } = productApi
