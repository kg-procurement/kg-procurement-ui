import { CheckedState } from '@radix-ui/react-checkbox'
import { Link } from '@tanstack/react-router'
import { EllipsisVertical } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Checkbox } from '@/components/atoms/checkbox.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { PaginationSpec } from '@/schemas/common.ts'
import { Vendor } from '@/schemas/vendor.ts'
import { noop } from '@/utils/common.ts'

import CustomPagination from '../molecules/custom-pagination.tsx'
import { EmailForm } from '../molecules/email-form.tsx'

interface VendorTableProps {
  vendors: Vendor[]
  metadata: PaginationSpec['metadata']
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
  vendorIds: Set<string>
  handleUpdateChosenVendor: (checked: CheckedState, vendorId: string) => void
  chooseAllVendor: (vendors: Vendor[], toggle: boolean) => void
  handleSort: (column: 'name' | 'area_group_name' | 'rating') => void
  sortBy: 'name' | 'area_group_name' | 'rating' | ''
  sortOrder: 'asc' | 'desc' | ''
}

function VendorTable({
  vendors,
  metadata,
  page = 1,
  setPage = noop,
  vendorIds,
  chooseAllVendor,
  handleUpdateChosenVendor,
  handleSort,
  sortBy,
  sortOrder
}: VendorTableProps) {
  const [toggleDialog, setToggleDialog] = useState<boolean>(false)
  const [togglePopover, setTogglePopover] = useState<boolean>(false)

  const handleOpenDialog = () => {
    if (vendorIds.size > 0) {
      setToggleDialog(!toggleDialog)
    }
    else {
      setTogglePopover(true)
      setTimeout(() => setTogglePopover(false), 2000)
    }
  }

  return (
    <div className="flex w-3/4 flex-col gap-5 rounded-lg border p-6 shadow-xl">
      <div className="w-full rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox onCheckedChange={check => chooseAllVendor(vendors, Boolean(check))} />
              </TableHead>
              <TableHead className="w-[200px]">Vendor Name</TableHead>
              <TableHead className="w-[200px]">Location</TableHead>
              <TableHead
                className="cursor-pointer"
                data-testid = "sort-rating"
                onClick={() => handleSort('rating')}
              >
                Performance Score
                {sortBy === 'rating' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <Checkbox checked={vendorIds.has(vendor.id)} onCheckedChange={event => handleUpdateChosenVendor(event, vendor.id)} />
                </TableCell>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.area_group_name}</TableCell>
                <TableCell>{vendor.rating}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button>
                        <EllipsisVertical size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-2">
                      <Link to="/dashboard/vendor/$vendorId" params={{ vendorId: vendor.id }}>
                        <Button
                          className="h-fit w-full px-3 py-1"
                          variant="ghost"
                        >
                          Detailed View
                        </Button>
                      </Link>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full justify-center">
        <CustomPagination current_page={page} setPage={setPage} total_page={metadata.total_page} />
      </div>
      <div className="flex justify-between">
        <Typography variant="body2" className="text- text-[#71717A]">
          0 of 99 row(s) selected
        </Typography>
        <EmailForm vendorIds={[...vendorIds]} toggleDialog={toggleDialog} setToggleDialog={setToggleDialog} />
        <Popover open={togglePopover}>
          <PopoverTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>Email Selected Vendor</Button>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-fit">
            <Typography variant="body2" className="text-red-600">
              Please choose at leat one vendor to continue
            </Typography>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default VendorTable
