import {
  createMemoryHistory,
  createRouter,
  RouterHistory,
} from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

export const router = createRouter({ routeTree })

export function createTestRouter(path: string | RouterHistory) {
  let memoryHistory: RouterHistory
  if (typeof path === 'string') {
    memoryHistory = createMemoryHistory({ initialEntries: [path] })
  }
  else {
    // This means that path is already a RouterHistory instance
    memoryHistory = path
  }
  return createRouter({ routeTree, history: memoryHistory })
}

export type TestRouter = ReturnType<typeof createTestRouter>

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
