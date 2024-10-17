import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useState } from 'react'

import { Input } from '../atoms/input.tsx'
import { Typography } from '../atoms/typography.tsx'
import { Footer } from '../molecules/footer.tsx'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="mx-auto my-auto max-w-[300px] space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <Typography variant="h3" className="text-center text-primary">
          Register
        </Typography>
        <div className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" className="w-full" />
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <button className="rounded-md bg-primary p-2 text-white">
            Register
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
