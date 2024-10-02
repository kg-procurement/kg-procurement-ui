import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children }, ref) => {
    return <button ref={ref}>{children}</button>
  },
)

Button.displayName = 'Button'

export { Button }
