import { createFileRoute } from '@tanstack/react-router'

import RegisterPage from '@/components/pages/register.tsx'

export const Route = createFileRoute('/register')({
  component: () => <RegisterPage />,
})

export default function Page() {
  return <RegisterPage />
}
