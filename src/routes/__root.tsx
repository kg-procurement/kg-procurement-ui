import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Cookies from 'js-cookie'
import { LoaderCircle } from 'lucide-react'
import { ReactNode, useEffect } from 'react'

import Navbar from '@/components/molecules/navbar.tsx'
import { AUTH_COOKIE_KEY } from '@/lib/zustand/auth.ts'
import { useCommonStore } from '@/lib/zustand/common.ts'

export type RootProps =
  | {
    children: ReactNode
    mock: true
  }
  | {
    mock: false
  }

export const Route = createRootRoute({
  component: Root,
})

export default function Root(props: RootProps) {
  const navigate = useNavigate()
  const showLoadingOverlay = useCommonStore(
    state => state.showLoadingOverlay,
  )

  useEffect(() => {
    if (!props.mock && !Cookies.get(AUTH_COOKIE_KEY)) {
      navigate({ to: '/login' })
    }
  }, [props.mock, navigate])

  return (
    <div className="relative min-h-dvh min-w-full">
      {showLoadingOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <LoaderCircle
            data-testid="loading-overlay"
            className="h-20 w-20 animate-spin stroke-blue-600"
          />
        </div>
      )}
      <Navbar />
      {props.mock ? props.children : <Outlet />}
      {import.meta.env.DEV && process.env.NODE_ENV !== 'test' && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  )
}
