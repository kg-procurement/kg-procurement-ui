import { createFileRoute } from '@tanstack/react-router'

import DashboardPage from '@/components/pages/dashboard/vendor/[vendorId].tsx'

export const Route = createFileRoute('/dashboard/vendor/$vendorId')({
  component: () => <DashboardPage />,
})
export default function Page() {
  return <DashboardPage />
}
