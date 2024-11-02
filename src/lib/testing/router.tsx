import { RouterProvider } from '@tanstack/react-router'
import { render } from '@testing-library/react'
import { Provider as ReduxStoreProvider } from 'react-redux'

import { Toaster } from '@/components/atoms/toaster.tsx'
import store from '@/lib/redux/store.ts'
import { createTestRouter } from '@/lib/router.ts'
import { FileRoutesByFullPath } from '@/routeTree.gen'

export function renderRoute(path: keyof FileRoutesByFullPath) {
  const testRouter = createTestRouter(path)

  render(
    <ReduxStoreProvider store={store}>
      <Toaster />
      <RouterProvider router={testRouter} />
    </ReduxStoreProvider>,
  )
}
