import { api } from '@/lib/redux/services/api.ts'

import {
  GetLocationsResponse,
  getLocationsResponseSchema,
  GetVendorByIdRequestArgs,
  GetVendorByIdResponse,
  getVendorByIdResponseSchema,
  GetVendorsRequestArgs,
  GetVendorsResponse,
  getVendorsResponseSchema,
  UpdateVendorRequestArgs,
  UpdateVendorResponse,
  updateVendorResponseSchema,
} from './validation.ts'

export const vendorApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: builder => ({
    getVendors: builder.query<GetVendorsResponse, GetVendorsRequestArgs>({
      extraOptions: { responseValidator: getVendorsResponseSchema },
      query: args => ({
        method: 'GET',
        url: `/vendor`,
        params: args,
      }),
      providesTags: resp =>
        resp
          ? [
              ...resp.vendors.map(vendor => ({
                type: 'Vendor' as const,
                id: vendor.id,
              })),
              { type: 'Vendor', id: 'LIST' },
            ]
          : [],
    }),
    getVendorById: builder.query<
      GetVendorByIdResponse,
      GetVendorByIdRequestArgs
    >({
      extraOptions: { responseValidator: getVendorByIdResponseSchema },
      query: ({ id }) => ({
        method: 'GET',
        url: `/vendor/${id}`,
      }),
      providesTags: (resp, _, args) =>
        resp
          ? [{ type: 'Vendor', id: args.id }]
          : [{ type: 'Vendor', id: 'LIST' }],
    }),

    getLocations: builder.query<GetLocationsResponse, void>({
      extraOptions: { responseValidator: getLocationsResponseSchema },
      query: () => ({
        method: 'GET',
        url: `/vendor/location`,
      }),
      providesTags: [{ type: 'Vendor', id: 'LOCATIONS' }],
    }),

    updateVendor: builder.mutation<
      UpdateVendorResponse,
      UpdateVendorRequestArgs
    >({
      extraOptions: { responseValidator: updateVendorResponseSchema },
      query: ({ id, payload }) => ({
        method: 'PUT',
        url: `/vendor/${id}`,
        body: payload,
      }),
      invalidatesTags: (resp, _, arg) =>
        resp
          ? [{ type: 'Vendor', id: arg.id }]
          : [{ type: 'Vendor', id: 'LIST' }],

    }),
  }),
})

export const { useGetVendorsQuery, useGetVendorByIdQuery, useGetLocationsQuery, useUpdateVendorMutation } = vendorApi
