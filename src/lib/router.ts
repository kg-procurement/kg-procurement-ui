import { createMemoryHistory, createRouter } from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

export const router = createRouter({ routeTree })

export function createTestRouter(
  path: string,
  replace?: Record<string, string | number>,
) {
  const finalPath = path
  if (replace) {
    for (const [key, replacement] of Object.entries(replace)) {
      finalPath.replace(`$${key}`, replacement.toString())
    }
  }
  const memoryHistory = createMemoryHistory({
    initialEntries: [finalPath],
  })
  return createRouter({ routeTree, history: memoryHistory })
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
