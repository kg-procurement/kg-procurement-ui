import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/atoms/button.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { Footer } from '@/components/molecules/footer.tsx'

export const Route = createFileRoute('/login')({
  component: () => <LoginPage />,
})

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="mx-auto my-auto max-w-[300px] space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <Typography variant="h3" className="text-center text-primary">
        Login
        </Typography>
        <Input
          name="email"
          type="email"
          placeholder="Email"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="text-center">
          <p>Don't have an account?</p>
          <a href="/register" className="text-primary underline">
            Register here
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
