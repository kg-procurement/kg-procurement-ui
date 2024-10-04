import PageHeader from '@/components/molecules/page-header.tsx'

import { Typography } from '../atoms/typography.tsx'
import VendorTable, { Vendor } from '../features/vendor-table.tsx'
import { Footer } from '../molecules/footer.tsx'

const VendorPage = () => {
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
      </PageHeader>
      <div className="w-full flex justify-center">
        <VendorTable vendors={sampleVendors} />
      </div>
      <Footer />
    </div>
  )
}

export default VendorPage
