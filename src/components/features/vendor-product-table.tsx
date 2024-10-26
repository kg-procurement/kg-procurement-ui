import { EllipsisVertical } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Checkbox } from '@/components/atoms/checkbox.tsx'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table.tsx'
import CustomPagination from '@/components/molecules/custom-pagination.tsx'
import ProductForm from '@/components/organisms/product/form.tsx'
import { Product } from '@/schemas/product.ts'

interface VendorProductTableProps {
  products: Product[]
  total_page: number
  current_page: number
  setPage: Dispatch<SetStateAction<number>>
}

function VendorProductTable({
  products,
  total_page,
  current_page,
  setPage,
}: Readonly<VendorProductTableProps>) {
  const [currentlyActiveDialog, setCurrentlyActiveDialog] =
    useState<string>('')
  return (
    <Table data-testid="vendor-product-table" className="rounded-md border">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Modified Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          return (
            <TableRow key={product.id}>
              <Dialog
                open={currentlyActiveDialog === product.id}
                onOpenChange={open =>
                  open && setCurrentlyActiveDialog(product.id)}
              >
                <DialogContent>
                  <DialogTitle>Product Form</DialogTitle>
                  <ProductForm
                    initialData={product}
                    onDone={() => setCurrentlyActiveDialog('')}
                  />
                </DialogContent>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.modified_date}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger data-testid="elip-button" asChild>
                      <button>
                        <EllipsisVertical size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-2">
                      <DialogTrigger>
                        <Button
                          className="h-fit w-full px-3 py-1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </Dialog>
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="py-2.5">
            <CustomPagination
              current_page={current_page}
              total_page={total_page}
              setPage={setPage}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default VendorProductTable
