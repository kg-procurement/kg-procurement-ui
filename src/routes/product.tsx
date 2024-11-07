import { CheckedState } from '@radix-ui/react-checkbox'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import Dropdown from '@/components/atoms/dropdown.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import ProductTable from '@/components/features/product-table.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import { Product } from '@/schemas/product.ts'

export const Route = createFileRoute('/product')({
  component: ProductPage,
})

export default function ProductPage() {
  const [page, setPage] = useState<number>(1)
  const [productFilter, setProductFilter] = useState('')
  const [_, setLocationFilter] = useState('')

  const dummyOptionData = [{
    value: 'hai',
    label: 'hello',
  }]

  const dummyProductsData: Product[] = [
    {
      description: 'description',
      id: '1',
      income_tax_id: '1',
      modified_by: 'temp',
      modified_date: new Date().toString(),
      name: 'name',
      product_category_id: '1',
      product_type_id: '1',
      uom_id: '1',
    },
    {
      description: 'description2',
      id: '2',
      income_tax_id: '2',
      modified_by: 'temp2',
      modified_date: new Date().toString(),
      name: 'name2',
      product_category_id: '2',
      product_type_id: '2',
      uom_id: '2',
    },
  ]

  const dummyMetadata = {
    total_page: 1,
    current_page: 1,
    total_entries: 1,
  }

  const [productIds, setProductIds] = useState<Set<string>>(new Set())
  const handleUpdateChosenVendor = (checked: CheckedState, vendorId: string) => {
    const udpatedSet = new Set(productIds)
    if (checked)
      udpatedSet.add(vendorId)
    else
      udpatedSet.delete(vendorId)
    setProductIds(udpatedSet)
  }
  const handleChooseAllProduct = (products: Product[], toggle: boolean) => {
    const updatedSet = new Set(productIds)
    if (toggle)
      products.forEach(product => updatedSet.add(product.id))
    else
      products.forEach(product => updatedSet.delete(product.id))
    setProductIds(updatedSet)
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-10">
      <PageHeader>
        <Typography variant="h2" className="text-white">
          Search Product
        </Typography>
        <Typography variant="body1" className="text-white">
          Lorem Ipsum
        </Typography>
        <div className="flex w-3/4 justify-between">
          <div className="flex-grow flex justify-stretch">
            <Input
              className="w-full flex-grow"
              placeholder="Filter by Product"
              value={productFilter}
              onChange={e => setProductFilter(e.target.value)}
            />
          </div>
          <div className="flex-grow-0 flex justify-stretch items-center">
            <Dropdown
              options={dummyOptionData}
              onSelect={(selectedValue) => {
                setLocationFilter(selectedValue)
              }}
              name="Location"
              data-testid="dropdown-button"
            />
          </div>
        </div>
      </PageHeader>
      <div className="flex w-full justify-center">
        <ProductTable
          products={dummyProductsData}
          metadata={dummyMetadata}
          page={page}
          setPage={setPage}
          productIds={productIds}
          handleChooseAllProduct={handleChooseAllProduct}
          handleUpdateChosenProduct={handleUpdateChosenVendor}
        />
      </div>
      <Footer />
    </div>
  )
}
