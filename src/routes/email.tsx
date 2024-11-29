import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import EmailStatusTable from '@/components/features/email-status-table.tsx'
import { useGetEmailStatusesQuery } from '@/lib/redux/features/email/api.ts'
import { useQueryErrorHandler } from '@/lib/redux/hooks.ts'
import { useCommonStore } from '@/lib/zustand/common.ts'

export const Route = createFileRoute('/email')({
  component: () => <EmailPage />,
})

export default function EmailPage() {
  const [page, setPage] = useState<number>(1)
  const setShowLoadingOverlay = useCommonStore(
    state => state.setShowLoadingOverlay,
  )
  const { emails, metadata, isSuccess, error } = useGetEmailStatusesQuery(
    { page },
    {
      selectFromResult: result => ({
        emails: result.data?.email_status,
        metadata: result.data?.metadata,
        ...result,
      }),
    },
  )

  useQueryErrorHandler(error)

  useEffect(() => {
    setShowLoadingOverlay(!isSuccess)
  }, [isSuccess, setShowLoadingOverlay])

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-4">
        {emails && metadata && (
          <EmailStatusTable
            emails={emails}
            metadata={metadata}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  )
}
