import { CheckedState } from '@radix-ui/react-checkbox'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import ProductTable from '@/components/features/product-table.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import { useLoadingOverlay } from '@/hooks/use-loading-overlay.ts'
import { useGetProductVendorsQuery } from '@/lib/redux/features/product/api.ts'
import { useQueryErrorHandler } from '@/lib/redux/hooks.ts'
import { ProductVendor } from '@/schemas/product.ts'

export const Route = createLazyFileRoute('/product')({
  component: ProductPage,
})

export default function ProductPage() {
  const [page, setPage] = useState<number>(1)
  const [nameFilter, setNameFilter] = useState('')
  const { productVendors, metadata, isSuccess, error } =
    useGetProductVendorsQuery(
      { page, name: nameFilter },
      {
        selectFromResult: result => ({
          ...result,
          productVendors: result.data?.product_vendors ?? [],
          metadata: result.data?.metadata,
        }),
      },
    )

  useQueryErrorHandler(error)
  useLoadingOverlay(!isSuccess)

  const [productIds, setProductIds] = useState<Set<string>>(new Set())
  const handleUpdateChosenVendor = (
    checked: CheckedState,
    vendorId: string,
  ) => {
    const udpatedSet = new Set(productIds)
    if (checked) udpatedSet.add(vendorId)
    else udpatedSet.delete(vendorId)
    setProductIds(udpatedSet)
  }
  const handleChooseAllProduct = (
    productVendors: ProductVendor[],
    toggle: boolean,
  ) => {
    const updatedSet = new Set(productIds)
    if (toggle) productVendors.forEach(pv => updatedSet.add(pv.id))
    else productVendors.forEach(pv => updatedSet.delete(pv.id))
    setProductIds(updatedSet)
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <PageHeader>
        <Typography variant="h2" className="text-white">
          Search Product
        </Typography>
        <div className="flex w-3/4 justify-between">
          <div className="flex flex-grow justify-stretch">
            <Input
              className="w-full flex-grow"
              placeholder="Filter by Product"
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
        </div>
      </PageHeader>
      <div className="flex w-full justify-center">
        {productVendors && metadata && isSuccess && (
          <ProductTable
            productVendors={productVendors}
            metadata={metadata}
            page={page}
            setPage={setPage}
            productIds={productIds}
            handleChooseAllProduct={handleChooseAllProduct}
            handleUpdateChosenProduct={handleUpdateChosenVendor}
          />
        )}
      </div>
    </div>
  )
}
