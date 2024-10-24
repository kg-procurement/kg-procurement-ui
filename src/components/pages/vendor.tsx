import { useEffect, useState } from 'react'

import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import VendorTable from '@/components/features/vendor-table.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import { useGetVendorsQuery } from '@/lib/redux/features/vendor/api.ts'
import { useErrorToast } from '@/lib/redux/hooks.ts'
import { useCommonStore } from '@/lib/zustand/common.ts'

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

  useErrorToast(error)

  useEffect(() => {
    setShowLoadingOverlay(!isSuccess)
  }, [isSuccess, setShowLoadingOverlay])

  return (
    <div className="flex min-h-screen w-full flex-col gap-10">
      <PageHeader>
        <Typography variant="h2" className="text-white">
          Search Vendor
        </Typography>
        <Typography variant="body1" className="text-white">
          Lorem Ipsum
        </Typography>
        <div className="flex justify-center gap-4">
          <Input
            placeholder="Filter by Product"
            value={productFilter}
            onChange={e => setProductFilter(e.target.value)}
            className="w-1/2"
          />
          <Input
            placeholder="Filter by Location"
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="w-1/2"
          />
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
