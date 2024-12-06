import { Dispatch, SetStateAction } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table.tsx'
import CustomPagination from '@/components/molecules/custom-pagination.tsx'
import { useUpdateEmailStatusMutation } from '@/lib/redux/features/vendor/api.ts'
import { UpdateEmailStatusRequestArgs } from '@/lib/redux/features/vendor/validation.ts'
import { PaginationSpec } from '@/schemas/common.ts'
import { EmailStatus } from '@/schemas/email.ts'
import { cn } from '@/utils/cn.ts'
import { noop } from '@/utils/common.ts'

interface EmailStatusTableProps {
  emails: EmailStatus[]
  metadata: PaginationSpec['metadata']
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
  handleSort: (column: 'date_sent' | '') => void
  sortBy: 'date_sent' | ''
  sortOrder: 'asc' | 'desc' | ''
}



export default function EmailStatusTable({
  emails,
  metadata,
  page = 1,
  setPage = noop,
  handleSort,
  sortBy,
  sortOrder
}: EmailStatusTableProps) {
  const [updateEmailStatus] = useUpdateEmailStatusMutation()

  const handleSave = async ({ id, payload }: UpdateEmailStatusRequestArgs) => {
    try {
      await updateEmailStatus({
        id: id,
        payload: payload,
      }).unwrap()
    }
    catch (e) {
      console.error('Something went wrong when trying to update vendor:', e)
    }
  }

  return (
    <div className="flex w-full min-w-[1280px] flex-col rounded-lg border shadow-md">
      <Table data-testid="email-status-table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Vendor Name</TableHead>
            <TableHead className="w-[200px]">Email To</TableHead>
            <TableHead className="w-[160px]">Performance Score</TableHead>
            <TableHead
              className="cursor-pointer"
              data-testid = "sort-date-sent"
              onClick={() => handleSort('date_sent')}
            >
              Date Sent
              {sortBy === 'date_sent' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.length > 0
            ? (
                emails.map(email => (
                  <TableRow key={email.id}>
                    <TableCell>{email.vendor_name}</TableCell>
                    <TableCell>{email.email_to}</TableCell>
                    <TableCell>{email.vendor_rating}</TableCell>
                    <TableCell>{email.date_sent}</TableCell>
                    <TableCell>
                      <div className="flex rounded-sm bg-gray-100 p-1">
                        <button
                          data-testid="email-status-button-failed"
                          className={cn('rounded-sm px-3 py-1 font-medium cursor-pointer', {
                            'bg-red-400': email.status === 'failed',
                          })}
                          onClick={() =>
                            handleSave({
                              id: email.id,
                              payload: { ...email, status: 'failed' },
                            })}
                        >
                          Failed
                        </button>
                        <button
                          data-testid="email-status-button-success"
                          className={cn('rounded-sm px-3 py-1 font-medium cursor-pointer', {
                            'bg-green-300': email.status === 'success',
                          })}
                          onClick={() =>
                            handleSave({
                              id: email.id,
                              payload: { ...email, status: 'success' },
                            })}
                        >
                          Success
                        </button>
                        <button
                          data-testid="email-status-button-inprogress"
                          className={cn('rounded-sm px-3 py-1 font-medium cursor-pointer', {
                            'bg-yellow-400': email.status === 'in_progress',
                          })}
                          onClick={() =>
                            handleSave({
                              id: email.id,
                              payload: { ...email, status: 'in_progress' },
                            })}
                        >
                          In Progress
                        </button>
                        <button
                          data-testid="email-status-button-completed"
                          className={cn('rounded-sm px-3 py-1 font-medium cursor-pointer', {
                            'bg-green-600': email.status === 'completed',
                          })}
                          onClick={() =>
                            handleSave({
                              id: email.id,
                              payload: { ...email, status: 'completed' },
                            })}
                        >
                          Completed
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )
            : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No emails sent yet
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
      <div className="flex w-full border-collapse justify-center border py-2">
        <CustomPagination
          current_page={page}
          setPage={setPage}
          total_page={metadata.total_page}
        />
      </div>
    </div>
  )
}
