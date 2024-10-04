import { createFileRoute } from '@tanstack/react-router'

import VendorPage from '@/components/pages/vendor.tsx'

export const Route = createFileRoute('/vendor/')({
  component: Page,
})

export default function Page() {
  return <VendorPage />
}
