import React, { useState } from 'react'

import { Button } from '@/components/atoms/button.tsx'
import { Input } from '@/components/atoms/input.tsx'
import { Typography } from '@/components/atoms/typography.tsx'

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  const handleSubmit = () => {
    const errors: string[] = []

    if (!username) {
      errors.push('Fill the username')
    }
    if (!password) {
      errors.push('Fill the password')
    }

    if (errors.length > 0) {
      setErrorMessages(errors)
      return
    }

    setErrorMessages([])

    console.log('Logging in with:', { username, password })
  }

  return (
    <div>
      <Typography variant="h6" className="mb-4">Sign in to KG Procurement</Typography>
      <div className="mb-2">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <Input
          id="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          id="password"
          placeholder="Password"
          isPassword
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-1 w-full"
        />
      </div>
      <Button onClick={handleSubmit}>
        Login
      </Button>
      {errorMessages.length > 0 && (
        <div className="mt-2 text-red-500">
          {errorMessages.map(error => (
            <p key={error} className="text-sm">{error}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default LoginForm
