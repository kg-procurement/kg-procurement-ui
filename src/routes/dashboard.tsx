import { createFileRoute } from '@tanstack/react-router'

import DashboardPage from '@/components/pages/dashboard.tsx'

export const Route = createFileRoute('/dashboard')({
  component: Page,
})

export default function Page() {
  return <DashboardPage />
}
