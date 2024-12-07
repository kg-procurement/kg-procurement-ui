import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import EmailStatusTable from '@/components/features/email-status-table.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import { useLoadingOverlay } from '@/hooks/use-loading-overlay.ts'
import { useGetEmailStatusesQuery } from '@/lib/redux/features/vendor/api.ts'
import { useQueryErrorHandler } from '@/lib/redux/hooks.ts'

export const Route = createFileRoute('/email')({
  component: () => <EmailPage />,
})

export default function EmailPage() {
  const [page, setPage] = useState<number>(1)
  const [emailToFilter, setEmailToFilter] = useState('')
  const [sortBy, setSortBy] = useState<'date_sent' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const handleSort = (column: 'date_sent' | '') => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    setSortBy(column)
  }
  const { emails, metadata, isSuccess, error } = useGetEmailStatusesQuery(
    { page, 
      email_to: emailToFilter,
      order_by: sortBy, 
      order: sortOrder },
    {
      selectFromResult: result => ({
        emails: result.data?.email_status,
        metadata: result.data?.metadata,
        ...result,
      }),
    },
  )

  useQueryErrorHandler(error)
  useLoadingOverlay(!isSuccess)

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader>
        <Typography variant="h2" className="text-white">
          Email Status
        </Typography>
        <div className="flex w-3/4 justify-between">
          <div className="flex flex-grow justify-stretch">
            <Input
              className="w-full flex-grow"
              placeholder="Filter by Email"
              value={emailToFilter}
              onChange={e => setEmailToFilter(e.target.value)}
              data-testid="filter-by-email"
            />
          </div>
        </div>
      </PageHeader>
      <div className="mt-4">
        {emails && metadata && (
          <EmailStatusTable
            handleSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
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
