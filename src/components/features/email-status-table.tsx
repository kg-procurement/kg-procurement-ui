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
import { PaginationSpec } from '@/schemas/common.ts'
import { EmailStatus } from '@/schemas/email.ts'
import { cn } from '@/utils/cn.ts'
import { noop } from '@/utils/common.ts'

interface EmailStatusTableProps {
  emails: EmailStatus[]
  metadata: PaginationSpec['metadata']
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
}

export default function EmailStatusTable({
  emails,
  metadata,
  page = 1,
  setPage = noop,
}: EmailStatusTableProps) {
  return (
    <div className="flex w-full min-w-[1280px] flex-col rounded-lg border shadow-md">
      <Table data-testid="email-status-table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Vendor Name</TableHead>
            <TableHead className="w-[200px]">Email To</TableHead>
            <TableHead className="w-[200px]">Performance Score</TableHead>
            <TableHead>Date Sent</TableHead>
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
                        <div
                          className={cn('rounded-sm px-3 py-1 font-medium', {
                            'bg-red-400': email.status === 'failed',
                          })}
                        >
                          Failed
                        </div>
                        <div
                          className={cn('rounded-sm px-3 py-1 font-medium', {
                            'bg-green-300': email.status === 'success',
                          })}
                        >
                          Success
                        </div>
                        <div
                          className={cn('rounded-sm px-3 py-1 font-medium', {
                            'bg-yellow-400': email.status === 'in_progress',
                          })}
                        >
                          In Progress
                        </div>
                        <div
                          className={cn('rounded-sm px-3 py-1 font-medium', {
                            'bg-green-600': email.status === 'completed',
                          })}
                        >
                          Completed
                        </div>
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
