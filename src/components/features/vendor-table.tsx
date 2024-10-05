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

export interface Vendor {
  name: string
  email: string
  performanceScore: string
}

interface VendorTableProps {
  vendors: Vendor[]
}

const VendorTable = ({ vendors }: VendorTableProps) => {
  return (
    <div className="flex w-3/4 flex-col gap-5 rounded-lg border p-6 shadow-xl">
      <div className="w-full rounded-lg border">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[200px]">Vendor Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
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
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.performanceScore}</TableCell>
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
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
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
