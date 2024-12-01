import { createFileRoute, useParams } from '@tanstack/react-router'
import { Edit, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import VendorProductTable from '@/components/features/vendor-product-table.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'
import EditVendorForm from '@/components/organisms/vendor/form-edit-vendor.tsx'
import { useGetProductsByVendorQuery } from '@/lib/redux/features/product/api.ts'
import { useGetVendorByIdQuery } from '@/lib/redux/features/vendor/api.ts'
import { useQueryErrorHandler } from '@/lib/redux/hooks.ts'
import { useCommonStore } from '@/lib/zustand/common.ts'

export const Route = createFileRoute('/dashboard/vendor/$vendorId')({
  component: () => <VendorDetailPage />,
})

export default function VendorDetailPage() {
  const { vendorId } = useParams({ from: '/dashboard/vendor/$vendorId' })
  const [filter, setFilter] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const { product_vendors, isSuccess, error, metadata } =
    useGetProductsByVendorQuery(
      { id: vendorId, name: filter, limit: 1, page },
      {
        selectFromResult: result => ({
          ...result,
          product_vendors: result.data?.product_vendors ?? [],
          metadata: result.data?.metadata,
        }),
      },
    )

  const {
    data: vendorData,
    error: vendorError,
    isSuccess: isVendorSuccess,
  } = useGetVendorByIdQuery({
    id: vendorId,
  })

  useQueryErrorHandler(error)
  useQueryErrorHandler(vendorError)
  const { setShowLoadingOverlay } = useCommonStore()

  useEffect(() => {
    setShowLoadingOverlay(!isSuccess && !isVendorSuccess)
  }, [isSuccess, isVendorSuccess, setShowLoadingOverlay])

  useQueryErrorHandler(error)
  return (
    <div className="flex w-full flex-col">
      <PageHeader>
        <div className="relative">
          <Typography variant="h2" className="text-white">
            {vendorData?.name}
          </Typography>
          <Dialog>
            <DialogTrigger className="absolute -right-16 top-0">
              <Edit color="white" size={24} />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Edit Vendor</DialogTitle>
              {vendorData && <EditVendorForm initialData={vendorData} />}
            </DialogContent>
          </Dialog>
        </div>
        <Typography
          variant="caption"
          className="max-w-prose text-center text-sm text-white"
        >
          {vendorData?.description}
        </Typography>
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-white" />
          <Typography variant="subtitle2" className="text-white">
            {vendorData?.area_group_name}
          </Typography>
        </div>
        <div className="mt-1 flex gap-2">
          <Typography variant="subtitle2" className="text-white">
            Rating:
            {' '}
            {vendorData?.rating}
          </Typography>
        </div>
      </PageHeader>
      <div className="flex flex-grow items-center justify-center bg-[#F8F8F8] p-16">
        <div className="h-full w-full flex-grow items-center gap-2 rounded-md bg-white p-4 shadow-md">
          <div className="flex flex-col gap-4">
            <Typography variant="h6">Inventory List</Typography>
            <Input
              className="text-sm"
              placeholder="Filter product name ..."
              onChange={e => setFilter(e.target.value)}
              value={filter}
            />
            {product_vendors && metadata && isSuccess && (
              <VendorProductTable
                current_page={metadata.current_page}
                product_vendors={product_vendors}
                setPage={setPage}
                total_page={metadata.total_page}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
