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

export const Route = createFileRoute('/vendor')({
  component: VendorPage,
})

export default function VendorPage() {
  const [page, setPage] = useState<number>(1)
  const [productFilter, setProductFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const { setShowLoadingOverlay } = useCommonStore()
  const { vendors, metadata, isSuccess, error } = useGetVendorsQuery(
    { page, product: productFilter, location: locationFilter },
    {
      selectFromResult: result => ({
        ...result,
        vendors: result.data?.vendors,
        metadata: result.data?.metadata,
      }),
    },
  )

  const { data: locationsData, isLoading: isLocationsLoading, error: locationsError } = useGetLocationsQuery()

  useQueryErrorHandler(error)
  useQueryErrorHandler(locationsError)

  useEffect(() => {
    setShowLoadingOverlay(!isSuccess || isLocationsLoading)
  }, [isSuccess, isLocationsLoading, setShowLoadingOverlay])

  const locationOptions = locationsData?.locations.map(location => ({
    value: location.toLowerCase(),
    label: location
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
  })) || []

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
          />
        )}
      </div>
      <Footer />
    </div>
  )
}
