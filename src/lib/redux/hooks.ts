import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'

import { toastForError } from '@/lib/redux/utils.tsx'

export function useQueryErrorHandler(
  error: FetchBaseQueryError | SerializedError | undefined,
) {
  useEffect(() => {
    if (!error) return
    toastForError(error)
  }, [error])
}
