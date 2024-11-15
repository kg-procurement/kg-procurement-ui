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
    <div className="flex w-[1024px] flex-col rounded-lg border shadow-md">
      <Table data-testid="email-status-table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">ID</TableHead>
            <TableHead className="w-[200px]">Email To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Modified Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.length > 0
            ? (
                emails.map(email => (
                  <TableRow key={email.id}>
                    <TableCell>{email.id}</TableCell>
                    <TableCell>{email.email_to}</TableCell>
                    <TableCell>{email.status}</TableCell>
                    <TableCell className="text-right">
                      {email.modified_date}
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
