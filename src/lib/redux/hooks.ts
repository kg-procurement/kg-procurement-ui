import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'

import { useToast } from '@/hooks/use-toast.ts'
import {
  extractZodError,
  isErrorWithMessage,
  isZodParseError,
} from '@/lib/redux/utils.tsx'

export function useErrorToast(
  error: FetchBaseQueryError | SerializedError | undefined,
) {
  const { toast } = useToast()
  useEffect(() => {
    if (!error) return
    if (isZodParseError(error)) {
      toast({
        variant: 'destructive',
        title: error.status,
        description: extractZodError(error),
      })
    }
    else if ('status' in error) {
      toast({
        variant: 'destructive',
        title: error.status.toString(),
        description: isErrorWithMessage(error)
          ? error.data.error
          : error.data?.toString(),
      })
    }
    else {
      toast({
        variant: 'destructive',
        title: error.name,
        description: error.stack,
      })
    }
  }, [error, toast])
}
