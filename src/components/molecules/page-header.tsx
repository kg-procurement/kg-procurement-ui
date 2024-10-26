import { ReactNode } from 'react'

export default function PageHeader({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-80 w-full flex-col items-center justify-center gap-2 bg-primary">
      <img
        src="/kompas-gramedia-logo-bg.svg"
        alt="Kompas Gramedia Logo Background"
        className="absolute left-0 top-0 w-96"
      />
      {children}
    </div>
  )
}
