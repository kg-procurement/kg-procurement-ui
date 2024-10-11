import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
  isPassword?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, isPassword = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    let inputType = 'text';
    if (isPassword) {
      inputType = showPassword ? 'text' : 'password';
    }

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          ref={ref}
          className={`rounded border p-2 ${className} ${isPassword ? 'pr-10' : ''}`}
          placeholder={placeholder}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
