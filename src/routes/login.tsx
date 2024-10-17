import { createFileRoute } from '@tanstack/react-router'

import LoginPage from '@/components/pages/login.tsx'

export const Route = createFileRoute('/login')({
  component: Page,
})

export default function Page() {
  return <LoginPage />
}
