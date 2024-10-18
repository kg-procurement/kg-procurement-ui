import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Checkbox } from '@/components/atoms/checkbox.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/molecules/pagination.tsx'
import { PaginationSpec } from '@/schemas/common.ts'
import { Vendor } from '@/schemas/vendor.ts'
import { noop } from '@/utils/common.ts'

interface VendorTableProps {
  vendors: Vendor[]
  metadata: PaginationSpec['metadata']
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
}

function VendorTable({
  vendors,
  metadata,
  page = 1,
  setPage = noop,
}: VendorTableProps) {
  return (
    <div className="flex w-3/4 flex-col gap-5 rounded-lg border p-6 shadow-xl">
      <div className="w-full rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[200px]">Vendor Name</TableHead>
              <TableHead className="w-[200px]">Location</TableHead>
              <TableHead>Performance Score</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.area_group_name}</TableCell>
                <TableCell>{vendor.rating}</TableCell>
                <TableCell className="text-right">...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(1)} isActive={page === 1}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(2)} isActive={page === 2}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(3)} isActive={page === 3}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage(prev =>
                    prev < metadata.total_page ? prev + 1 : prev,
                  )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex justify-between">
        <Typography variant="body2" className="text- text-[#71717A]">
          0 of 99 row(s) selected
        </Typography>
        <Button>Email Selected Vendor</Button>
      </div>
    </div>
  )
}

export default VendorTable
