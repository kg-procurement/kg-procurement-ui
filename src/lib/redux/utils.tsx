import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { toast } from '@/hooks/use-toast.ts'

export interface ZodParseError
  extends Extract<
    FetchBaseQueryError,
    {
      status: 'CUSTOM_ERROR'
      data?: unknown
      error: string
    }
  > {
  status: 'CUSTOM_ERROR'
  data: string
  error: string
  originalStatus: number
}

export function isZodParseError(
  err: SerializedError | FetchBaseQueryError | undefined,
): err is ZodParseError {
  if (!err) return false
  return (
    'data' in err &&
    err.status === 'CUSTOM_ERROR' &&
    'error' in err &&
    'originalStatus' in err &&
    'status' in err
  )
}

export function extractZodError(err: ZodParseError): React.ReactNode {
  const errorList = err.error.split('\n').slice(0, -1)
  return (
    <div className="flex flex-col">
      <div className="font-semibold">
        Response does not match validator schema:
      </div>
      <ul className="list-inside list-disc">
        {errorList.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  )
}

export function isErrorWithMessage(
  err: FetchBaseQueryError,
): err is { status: number, data: { error: string } } {
  if (!err.data) return false
  return (
    typeof err.data === 'object' &&
    'error' in err.data &&
    typeof err.data.error === 'string'
  )
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  err: unknown,
): err is FetchBaseQueryError {
  return typeof err === 'object' && err != null && 'status' in err
}

export function isSerializedError(err: unknown): err is SerializedError {
  return (
    typeof err === 'object' && err != null && 'stack' in err && 'message' in err
  )
}

export function toastForError(err: unknown) {
  if (isFetchBaseQueryError(err)) {
    if (isZodParseError(err)) {
      toast({
        variant: 'destructive',
        title: 'ZOD_PARSING_ERROR',
        description: extractZodError(err),
      })
    }
    else {
      toast({
        variant: 'destructive',
        title: err.status.toString(),
        description: isErrorWithMessage(err)
          ? err.data.error
          : err.data?.toString(),
      })
    }
  }
  else if (isSerializedError(err)) {
    toast({
      variant: 'destructive',
      title: err.message,
      description: err.stack,
    })
  }
  else if (err instanceof Error) {
    toast({
      variant: 'destructive',
      title: err.message,
      description: err.stack,
    })
  }
  else {
    // This means that some other error occured
    console.error('Some unknown error occured: ', err)
  }
}
