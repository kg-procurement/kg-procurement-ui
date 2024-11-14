import { api } from '@/lib/redux/services/api.ts'

import {
  GetProductsByVendorArgs,
  GetProductsByVendorResponse,
  getProductsByVendorResponseSchema,
  GetProductVendorsArgs,
  UpdateProductRequestArgs,
  UpdateProductResponse,
  updateProductResponseSchema,
} from './validation.ts'

export const productApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    getProductsByVendor: builder.query<
      GetProductsByVendorResponse,
      GetProductsByVendorArgs
    >({
      extraOptions: { responseValidator: getProductsByVendorResponseSchema },
      query: ({ id, name, page, limit }) => ({
        method: 'GET',
        url: `/product/vendor/${id}`,
        params: {
          name,
          page,
          limit,
        },
      }),
      providesTags: resp =>
        resp
          ? [
              ...(resp.product_vendors ?? []).map(pv => ({
                type: 'Product' as const,
                id: pv.id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [],
    }),
    getProductVendors: builder.query<
      GetProductsByVendorResponse,
      GetProductVendorsArgs
    >({
      extraOptions: { responseValidator: getProductsByVendorResponseSchema },
      query: args => ({
        method: 'GET',
        url: `/product/vendor`,
        params: args,
      }),
      providesTags: resp =>
        resp
          ? [
              ...(resp.product_vendors ?? []).map(pv => ({
                type: 'ProductVendor' as const,
                id: pv.id,
              })),
              { type: 'ProductVendor', id: 'LIST' },
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

export const {
  useGetProductsByVendorQuery,
  useGetProductVendorsQuery,
  useUpdateProductMutation,
} = productApi
