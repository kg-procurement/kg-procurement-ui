import { CheckedState } from '@radix-ui/react-checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Link } from '@tanstack/react-router'
import { EllipsisVertical } from 'lucide-react'
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
import CustomPagination from '@/components/molecules/custom-pagination.tsx'
import { PaginationSpec } from '@/schemas/common.ts'
import { ProductVendor } from '@/schemas/product.ts'
import { formatPrice, noop } from '@/utils/common.ts'

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
              <TableHead className="w-[200px]">Category</TableHead>
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead className="w-[200px]">Price</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productVendors.map((pv) => {
              return (
                <TableRow key={pv.id}>
                  <TableCell className="font-medium">
                    <Checkbox
                      checked={productIds.has(pv.id)}
                      onCheckedChange={event =>
                        handleUpdateChosenProduct(event, pv.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {pv.product.name}
                  </TableCell>
                  <TableCell>
                    {pv.product.product_category.category_name}
                  </TableCell>
                  <TableCell>{pv.product.description}</TableCell>
                  <TableCell>
                    {formatPrice(
                      pv.price.price,
                      pv.price.price_quantity,
                      pv.price.currency_code,
                      pv.price.uom.uom_name,
                    )}
                  </TableCell>
                  <TableCell>{pv.modified_date}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button>
                          <EllipsisVertical size={16} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="flex w-fit flex-col gap-1 rounded-lg bg-slate-200 p-2">
                        <Button
                          className="h-fit w-full px-3 py-1"
                          variant="outline"
                          onClick={() => console.log('hai')}
                        >
                          Send email to all vendors of this product
                        </Button>
                        <Button
                          className="h-fit w-full px-3 py-1"
                          variant="outline"
                        >
                          <Link
                            to="/vendor"
                            search={{
                              page: 1,
                              product_name: pv.product.name,
                              location: '',
                            }}
                          >
                            See all vendors with this product
                          </Link>
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
