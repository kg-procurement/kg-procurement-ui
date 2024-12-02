import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { useToast } from '@/hooks/use-toast.ts'
import { useLoginAccountMutation } from '@/lib/redux/features/account/api.ts'
import { LoginAccountRequestArgs } from '@/lib/redux/features/account/validation.ts'
import { toastForError } from '@/lib/redux/utils.tsx'
import { useAuthStore } from '@/lib/zustand/auth.ts'

export const Route = createFileRoute('/login')({
  component: () => <LoginPage />,
})

const initialValue = {
  email: '',
  password: '',
}

export default function LoginPage() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [account, setAccount] =
    useState<LoginAccountRequestArgs['payload']>(initialValue)
  const [loginAccount, { isLoading }] = useLoginAccountMutation()
  const login = useAuthStore(state => state.login)

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(prev => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleLoginAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { token } = await loginAccount({ payload: account }).unwrap()
      if (token) {
        login(token)
        toast({
          title: 'Success',
          description: 'Login successful!',
        })
        setAccount(initialValue)
        navigate({
          to: '/vendor',
          search: { page: 1, product_name: '', location: '' },
        })
      }
    }
    catch (err) {
      toastForError(err)
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto my-auto max-w-[300px] space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <Typography variant="h3" className="text-center text-primary">
          Login
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={handleLoginAccount}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={account.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={account.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
        <div className="text-center">
          <p>Don't have an account?</p>
          <a href="/register" className="text-primary underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  )
}
