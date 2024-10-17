import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { Footer } from '@/components/molecules/footer.tsx'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="mx-auto my-auto max-w-[300px] space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <Typography variant="h3" className="text-center text-primary">
          Register
        </Typography>
        <div className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <button className="rounded-md bg-primary p-2 text-white">
            Register
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
