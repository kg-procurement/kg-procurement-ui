import { Eye, EyeClosed } from '@phosphor-icons/react'
import React, { useState } from 'react'

import { cn } from '@/utils/cn.ts'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  type?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }
    const getInputType = (type: string) => {
      if (type === 'password') {
        return showPassword ? 'text' : 'password'
      }
      return type
    }
    return (
      <div className="relative flex-grow">
        <input
          type={getInputType(type || 'text')}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:rounded-xl file:border-0 file:bg-gray-200 file:px-4 file:py-[1px] file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
