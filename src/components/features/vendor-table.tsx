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
import { EmailForm } from '@/components/molecules/email-form.tsx' // Import your EmailForm component
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/molecules/pagination.tsx'
import { useToast } from '@/hooks/use-toast.ts'
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
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([])
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false)
  const { toast } = useToast()

  const toggleVendorSelection = (vendor: Vendor) => {
    setSelectedVendors((prev) => {
      if (prev.some(v => v.id === vendor.id)) {
        // If vendor is already selected, remove it
        return prev.filter(v => v.id !== vendor.id)
      }
      else {
        // If vendor is not selected, add it
        return [...prev, vendor]
      }
    })
  }

  const handleSendEmail = () => {
    if (selectedVendors.length === 0) {
      toast({
        title: 'No Vendors Selected',
        description: 'Please select at least one vendor to send an email.',
      })
      return
    }
    setIsEmailFormOpen(true) // Open the EmailForm when "Email Selected Vendor" is clicked
  }

  return (
    <div className="flex w-3/4 flex-col gap-5 rounded-lg border p-6 shadow-xl">
      <div className="w-full rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedVendors.length === vendors.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedVendors(vendors) // Select all vendors
                    }
                    else {
                      setSelectedVendors([]) // Deselect all vendors
                    }
                  }}
                />
              </TableHead>
              <TableHead className="w-[200px]">Vendor Name</TableHead>
              <TableHead className="w-[200px]">Location</TableHead>
              <TableHead>Performance Score</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map(vendor => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">
                  <Checkbox
                    checked={selectedVendors.some(v => v.id === vendor.id)}
                    onCheckedChange={() => toggleVendorSelection(vendor)}
                  />
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
                        <Button className="h-fit w-full px-3 py-1" variant="ghost">
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))}
              />
            </PaginationItem>
            {Array.from({ length: metadata.total_page }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setPage(index + 1)} isActive={page === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage(prev => (prev < metadata.total_page ? prev + 1 : prev))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex justify-between">
        <Typography variant="body2" className="text-[#71717A]">
          {selectedVendors.length}
          {' '}
          of
          {vendors.length}
          {' '}
          row(s) selected
        </Typography>
        <Button onClick={handleSendEmail}>Email Selected Vendor</Button>
      </div>

      {isEmailFormOpen && (
        <EmailForm
          selectedVendors={selectedVendors}
          onClose={() => setIsEmailFormOpen(false)}
        />
      )}
    </div>
  )
}

export default VendorTable
