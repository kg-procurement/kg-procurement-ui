import { api } from '@/lib/redux/services/api.ts'

import {
  GetProductsByVendorArgs,
  GetProductsByVendorResponse,
  getProductsByVendorResponseSchema,
  UpdateProductRequestArgs,
  UpdateProductResponse,
  updateProductResponseSchema,
} from './validation.ts'

export const productApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    getProductsByVendor: builder.query<
      GetProductsByVendorResponse | null,
      GetProductsByVendorArgs
    >({
      extraOptions: { responseValidator: getProductsByVendorResponseSchema },
      query: args => ({
        method: 'GET',
        url: `/product/vendor/${args.id}`,
        params: args,
      }),
      providesTags: resp =>
        resp
          ? [
              ...resp.products.map(product => ({
                type: 'Product' as const,
                id: product.id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [],
    }),
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

export const { useGetProductsByVendorQuery, useUpdateProductMutation } = productApi
