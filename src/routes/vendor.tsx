import { CheckedState } from '@radix-ui/react-checkbox'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import Dropdown from '@/components/atoms/dropdown.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import VendorTable from '@/components/features/vendor-table.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import { useGetLocationsQuery, useGetVendorsQuery } from '@/lib/redux/features/vendor/api.ts'
import { useQueryErrorHandler } from '@/lib/redux/hooks.ts'
import { useCommonStore } from '@/lib/zustand/common.ts'
import { Vendor } from '@/schemas/vendor.ts'

export const Route = createFileRoute('/vendor')({
  component: VendorPage,
})

export default function VendorPage() {
  const [page, setPage] = useState<number>(1)
  const [productFilter, setProductFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const { setShowLoadingOverlay } = useCommonStore()
  const [sortBy, setSortBy] = useState<'name' | 'area_group_name' | 'rating' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

  const { vendors, metadata, isSuccess, error } = useGetVendorsQuery(
    { page, 
      product: productFilter, 
      location: locationFilter, 
      order_by: sortBy, 
      order: sortOrder },
    {
      selectFromResult: result => ({
        ...result,
        vendors: result.data?.vendors,
        metadata: result.data?.metadata,
      }),
    },
  )

  const { data: locationsData, isSuccess: isLocationsSuccess, error: locationsError } = useGetLocationsQuery()

  useQueryErrorHandler(error)
  useQueryErrorHandler(locationsError)

  useEffect(() => {
    setShowLoadingOverlay(!isSuccess && !isLocationsSuccess)
  }, [isSuccess, isLocationsSuccess, setShowLoadingOverlay])

  const locationOptions = locationsData?.locations.map(location => ({
    value: location,
    label: location
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
  })) || []

  const [vendorIds, setVendorIds] = useState<Set<string>>(new Set())
  const handleUpdateChosenVendor = (checked: CheckedState, vendorId: string) => {
    const udpatedSet = new Set(vendorIds)
    if (checked)
      udpatedSet.add(vendorId)
    else
      udpatedSet.delete(vendorId)
    setVendorIds(udpatedSet)
  }
  const chooseAllVendor = (vendors: Vendor[], toggle: boolean) => {
    const updatedSet = new Set(vendorIds)
    if (toggle)
      vendors.forEach(vendor => updatedSet.add(vendor.id))
    else
      vendors.forEach(vendor => updatedSet.delete(vendor.id))
    setVendorIds(updatedSet)
  }

  const handleSort = (column: 'name' | 'area_group_name' | 'rating') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-10">
      <PageHeader>
        <Typography variant="h2" className="text-white">
          Search Vendor
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
              options={locationOptions}
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
        {vendors && metadata && isSuccess && (
          <VendorTable
            vendors={vendors}
            metadata={metadata}
            page={page}
            setPage={setPage}
            vendorIds={vendorIds}
            chooseAllVendor={chooseAllVendor}
            handleUpdateChosenVendor={handleUpdateChosenVendor}
            handleSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        )}
      </div>
      <Footer />
    </div>
  )
}
