import { api } from '../../services/api.ts'
import {
  GetProductsByVendorArgs,
  GetProductsByVendorResponse,
  getProductsByVendorResponseSchema,
} from './validation.ts'

export const productApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    getProductsByVendor: builder.query<
      GetProductsByVendorResponse,
      GetProductsByVendorArgs
    >({
      extraOptions: { dataSchema: getProductsByVendorResponseSchema },
      query: args => ({
        method: 'GET',
        url: `/product/vendor/${args.id}`,
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
  }),
})

export const { useGetProductsByVendorQuery } = productApi
