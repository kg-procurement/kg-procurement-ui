import { CheckedState } from '@radix-ui/react-checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { EllipsisVertical } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

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
import { PaginationSpec } from '@/schemas/common.ts'
import { ProductVendor } from '@/schemas/product.ts'
import { noop } from '@/utils/common.ts'

import { Button } from '../atoms/button.tsx'
import CustomPagination from '../molecules/custom-pagination.tsx'
interface ProductTableProps {
  productVendors: ProductVendor[]
  metadata: PaginationSpec['metadata']
  page?: number
  productIds: Set<string>
  setPage?: Dispatch<SetStateAction<number>>
  handleUpdateChosenProduct: (checked: CheckedState, productId: string) => void
  handleChooseAllProduct: (
    productVendors: ProductVendor[],
    toggle: boolean,
  ) => void
}

function ProductTable({
  productVendors,
  metadata,
  page = 1,
  productIds,
  setPage = noop,
  handleChooseAllProduct,
  handleUpdateChosenProduct,
}: Readonly<ProductTableProps>) {
  return (
    <div className="flex w-3/4 flex-col gap-5 rounded-lg border p-6 shadow-xl">
      <div className="w-full rounded-lg border">
        <Table data-testid="product-vendors-table">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  onCheckedChange={check =>
                    handleChooseAllProduct(productVendors, Boolean(check))}
                />
              </TableHead>
              <TableHead className="w-[200px]">Product Name</TableHead>
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead className="w-[200px]">Price</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productVendors.map((pv) => {
              const price = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: pv.price.currency_code,
              }).format(pv.price.price)
              return (
                <TableRow key={pv.id}>
                  <TableCell className="font-medium">
                    <Checkbox
                      checked={productIds.has(pv.id)}
                      onCheckedChange={event => handleUpdateChosenProduct(event, pv.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {pv.product.name}
                  </TableCell>
                  <TableCell>{pv.product.description}</TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>{pv.modified_date}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button>
                          <EllipsisVertical size={16} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit p-2 bg-slate-200 rounded-lg">
                        <Button
                          className="h-fit w-full px-3 py-1"
                          variant="ghost"
                          onClick={() => console.log('hai')}
                        >
                          Send email to all vendors of this product
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full justify-center">
        <CustomPagination
          current_page={page}
          setPage={setPage}
          total_page={metadata.total_page}
        />
      </div>
      <div className="flex justify-between">
        <Typography variant="body2" className="text- text-[#71717A]">
          0 of 99 row(s) selected
        </Typography>
      </div>
    </div>
  )
}

export default ProductTable
