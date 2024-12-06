import { api } from '@/lib/redux/services/api.ts'

import {
  createVendorEvaluationResponseSchema,
  EmailVendorsArgs,
  GetEmailRequestArgs,
  GetEmailStatusesResponse,
  getEmailStatusesResponseSchema,
  GetLocationsResponse,
  getLocationsResponseSchema,
  GetVendorByIdRequestArgs,
  GetVendorByIdResponse,
  getVendorByIdResponseSchema,
  GetVendorsRequestArgs,
  GetVendorsResponse,
  getVendorsResponseSchema,
  UpdateEmailStatusRequestArgs,
  UpdateEmailStatusResponse,
  updateEmailStatusResponseSchema,
  UpdateVendorRequestArgs,
  UpdateVendorResponse,
  updateVendorResponseSchema,
  VendorEvaluationReponse,
  VendorEvaluationRequestArgs,
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
    blastEmail: builder.mutation<void, EmailVendorsArgs>({
      query: (args) => {
        const bodyFormData = new FormData()
        bodyFormData.append('vendor_ids', JSON.stringify(args.vendor_ids))
        bodyFormData.append('body', args.body)
        bodyFormData.append('subject', args.subject)
        for (const attachment of args.attachments) {
          bodyFormData.append('attachments', attachment)
        }
        return {
          method: 'POST',
          url: `/vendor/blast`,
          body: bodyFormData,
        }
      },
      invalidatesTags: ['EmailStatus'],
    }),
    getEmailStatuses: builder.query<
      GetEmailStatusesResponse,
      GetEmailRequestArgs
    >({
      extraOptions: { responseValidator: getEmailStatusesResponseSchema },
      query: args => ({
        method: 'GET',
        url: `/vendor/email`,
        params: args,
      }),
      providesTags: ['EmailStatus'],
    }),
    updateEmailStatus: builder.mutation<
      UpdateEmailStatusResponse,
      UpdateEmailStatusRequestArgs
    >({
      extraOptions: { responseValidator: updateEmailStatusResponseSchema },
      query: ({ id, payload }) => ({
        method: 'PUT',
        url: `/email-status/${id}`,
        body: payload,
      }),
      invalidatesTags: ['EmailStatus'],
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

    createVendorEvaluation: builder.mutation<
      VendorEvaluationReponse,
      VendorEvaluationRequestArgs
    >({
      extraOptions: { responseValidator: createVendorEvaluationResponseSchema },
      query: payload => ({
        method: 'POST',
        url: `/vendor/evaluation`,
        body: payload,
      }),
      invalidatesTags: (resp, _, arg) =>
        resp
          ? [{ type: 'Vendor', id: arg.vendor_id }]
          : [{ type: 'Vendor', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetVendorsQuery,
  useBlastEmailMutation,
  useGetVendorByIdQuery,
  useUpdateVendorMutation,
  useGetLocationsQuery,
  useGetEmailStatusesQuery,
  useCreateVendorEvaluationMutation,
  useUpdateEmailStatusMutation,
} = vendorApi
