import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children }, ref) => {
    return (
      <button className={className} ref={ref}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
