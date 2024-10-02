import * as React from 'react'

interface ButtonProps {
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>
}

Button.displayName = 'Button'

export { Button }
