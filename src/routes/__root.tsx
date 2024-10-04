import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import Navbar from '@/components/molecules/navbar/index.tsx'

export const Route = createRootRoute({
  component: Root,
})

export default function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
      {import.meta.env.DEV && process.env.NODE_ENV !== 'test' && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  )
}
