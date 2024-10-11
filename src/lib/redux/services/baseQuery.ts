import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import { ZodError, ZodSchema } from 'zod'

type BaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: ZodSchema },
  FetchBaseQueryMeta
>

export const baseQueryWithZodValidation: (baseQuery: BaseQuery) => BaseQuery =
  baseQuery => async (args, api, extraOptions) => {
    const returnValue = await baseQuery(args, api, extraOptions)

    const zodSchema = extraOptions?.dataSchema

    if (returnValue.data && zodSchema) {
      try {
        zodSchema.parse(returnValue.data)
      }
      catch (error) {
        console.error(
          `Error while trying to parse response from ${api.endpoint}:`,
          error,
        )
        if (error instanceof ZodError) {
          return {
            error: {
              data: returnValue.data.toString(),
              error: error.toString(),
              originalStatus: returnValue.meta?.response?.status ?? 0,
              status: 'PARSING_ERROR',
            },
          }
        }
        throw error
      }
    }

    return returnValue
  }
