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
import { ProductVendor } from '@/schemas/product.ts'
import { formatPrice } from '@/utils/common.ts'

interface VendorProductTableProps {
  product_vendors: ProductVendor[]
  total_page: number
  current_page: number
  setPage: Dispatch<SetStateAction<number>>
}

function VendorProductTable({
  product_vendors,
  total_page,
  current_page,
  setPage,
}: Readonly<VendorProductTableProps>) {
  const [currentlyActiveDialog, setCurrentlyActiveDialog] = useState<string>('')
  return (
    <Table className="rounded-md border" data-testid="product-table">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product_vendors.map((pv) => {
          const product = pv.product
          return (
            <TableRow key={product.id}>
              <Dialog
                open={currentlyActiveDialog === product.id}
                onOpenChange={open => setCurrentlyActiveDialog(open ? product.id : '')}
              >
                <DialogContent aria-describedby="dialog-description">
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
                <TableCell>{product.product_category.category_name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  {formatPrice(
                    pv.price.price,
                    pv.price.price_quantity,
                    pv.price.currency_code,
                    pv.price.uom.uom_name,
                  )}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button data-testid="elip-button">
                        <EllipsisVertical size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-2">
                      <DialogTrigger
                        data-testid="edit-button"
                        aria-label="final-button"
                      >
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
        <TableRow className="">
          <TableCell colSpan={6} className="py-2.5">
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
