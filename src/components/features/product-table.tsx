import { CheckedState } from '@radix-ui/react-checkbox'
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
import { Product } from '@/schemas/product.ts'
import { noop } from '@/utils/common.ts'

import CustomPagination from '../molecules/custom-pagination.tsx'
interface ProductTableProps {
  products: Product[]
  metadata: PaginationSpec['metadata']
  page?: number
  productIds: Set<string>
  setPage?: Dispatch<SetStateAction<number>>
  handleUpdateChosenProduct: (checked: CheckedState, productId: string) => void
  handleChooseAllProduct: (products: Product[], toggle: boolean) => void
}

function ProductTable({
  products,
  metadata,
  page = 1,
  productIds,
  setPage = noop,
  handleChooseAllProduct,
  handleUpdateChosenProduct,
}: ProductTableProps) {
  return (
    <div className="flex w-3/4 flex-col gap-5 rounded-lg border p-6 shadow-xl">
      <div className="w-full rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox onCheckedChange={check => handleChooseAllProduct(products, Boolean(check))} />
              </TableHead>
              <TableHead className="w-[200px]">Product Name</TableHead>
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <Checkbox checked={productIds.has(product.id)} onCheckedChange={event => handleUpdateChosenProduct(event, product.id)} />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.modified_date}</TableCell>
                <TableCell className="text-right">
                  <EllipsisVertical size={16} />

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
      </div>
    </div>
  )
}

export default ProductTable
