import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { useToast } from '@/hooks/use-toast.ts'
import { useRegisterAccountMutation } from '@/lib/redux/features/account/api.ts'
import { RegisterAccountRequestArgs } from '@/lib/redux/features/account/validation.ts'
import { toastForError } from '@/lib/redux/utils.tsx'

export const Route = createLazyFileRoute('/register')({
  component: () => <RegisterPage />,
})

const initialValue = {
  email: '',
  password: '',
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [account, setAccount] =
    useState<RegisterAccountRequestArgs['payload']>(initialValue)
  const [registerAccount, { isLoading }] = useRegisterAccountMutation()

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(prev => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleRegisterAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { message } = await registerAccount({ payload: account }).unwrap()
      toast({
        title: 'Success',
        description: message,
      })
      setAccount(initialValue)
      navigate({ to: '/login' })
    }
    catch (err) {
      toastForError(err)
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto my-auto max-w-[300px] space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <Typography variant="h3" className="text-center text-primary">
          Register
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={handleRegisterAccount}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={account.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={account.password}
            onChange={handleChange}
          />
          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
