import { useState } from 'react'

import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import VendorTable, { Vendor } from '@/components/features/vendor-table.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'

const VendorPage = () => {
  const [productFilter, setProductFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  const sampleVendors: Vendor[] = [
    { email: 'a@gmail.com', name: '001', performanceScore: '89' },
    { email: 'a@gmail.com', name: '001', performanceScore: '89' },
    { email: 'a@gmail.com', name: '001', performanceScore: '89' },
    { email: 'a@gmail.com', name: '001', performanceScore: '89' },
    { email: 'a@gmail.com', name: '001', performanceScore: '89' },
    { email: 'a@gmail.com', name: '001', performanceScore: '89' },
  ]
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
        <VendorTable vendors={sampleVendors} />
      </div>
      <Footer />
    </div>
  )
}

export default VendorPage
