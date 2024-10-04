import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <input
        type="text"
        ref={ref}
        className={`border rounded p-2 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
