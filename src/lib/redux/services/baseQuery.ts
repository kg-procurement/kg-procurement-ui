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
  { responseValidator?: ZodSchema },
  FetchBaseQueryMeta
>

export const baseQueryWithZodValidation: (baseQuery: BaseQuery) => BaseQuery =
  baseQuery => async (args, api, extraOptions) => {
    const returnValue = await baseQuery(args, api, extraOptions)

    const zodSchema = extraOptions?.responseValidator

    if (returnValue.data && zodSchema) {
      try {
        zodSchema.parse(returnValue.data)
      }
      catch (error) {
        if (error instanceof ZodError) {
          let accumulatedError = ''
          const fieldErrors = error.flatten().fieldErrors
          for (const [fieldName, errorMessage] of Object.entries(fieldErrors)) {
            if (errorMessage) {
              accumulatedError += `${fieldName}: ${errorMessage?.join(' ')}\n`
            }
          }
          return {
            error: {
              data: JSON.stringify(returnValue.data),
              error: accumulatedError,
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
