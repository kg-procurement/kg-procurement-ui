import { createMemoryHistory, createRouter } from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

export const router = createRouter({ routeTree })

export function createTestRouter(path: string) {
  const memoryHistory = createMemoryHistory({ initialEntries: [path] })
  return createRouter({ routeTree, history: memoryHistory })
}

export type TestRouter = ReturnType<typeof createTestRouter>

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
