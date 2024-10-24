import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export type ZodParseError = Extract<
  FetchBaseQueryError,
  {
    status: 'PARSING_ERROR'
    originalStatus: number
    data: string
    error: string
  }
>

export function isZodParseError(
  err: SerializedError | FetchBaseQueryError | undefined,
): err is ZodParseError {
  if (!err) return false
  return (
    'data' in err &&
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
