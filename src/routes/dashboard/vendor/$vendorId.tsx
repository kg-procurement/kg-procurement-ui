import { createFileRoute } from '@tanstack/react-router'

import VendorDashboardPage from '@/components/pages/dashboard/vendor/[vendorId].tsx'

export const Route = createFileRoute('/dashboard/vendor/$vendorId')({
  component: () => <VendorDashboardPage />,
})
export default function Page() {
  return <VendorDashboardPage />
}
