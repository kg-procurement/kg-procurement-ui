import { RouterHistory, RouterProvider } from '@tanstack/react-router'
import { Provider as ReduxStoreProvider } from 'react-redux'

import { Toaster } from '@/components/atoms/toaster.tsx'
import { configureAppStore } from '@/lib/redux/store.ts'
import { router } from '@/lib/router.ts'
import Root from '@/routes/__root.tsx'

export interface WithoutRouter {
  withRouter?: false | undefined
}

export interface WithRouter {
  withRouter: true
  history: RouterHistory
}

export type WithWrappersOptions = {
  /**
   * If this option is set to true, then the root of the app will be rendered
   * This is required if you want to make use of the `loading-overlay` `data-testid`
   * @default false
   */
  withRoot?: boolean
  /**
   * If this option is set to true, the component will be rendered with a `RouterProvider` component
   * Keep in mind that enabling this means that you'll have to supply a history (preferable memoryHistory) instance
   * @default false
   */
} & (WithoutRouter | WithRouter)

export function withWrappers(
  component: React.ReactNode,
  options: WithWrappersOptions = {
    withRoot: false,
    withRouter: false,
  },
) {
  if (options.withRouter && options.withRoot)
    throw new Error('withRouter and withRoot should not be used together')

  return (
    <ReduxStoreProvider store={configureAppStore()}>
      <Toaster />
      {options.withRouter && (
        <RouterProvider router={router} history={options.history} />
      )}
      {options.withRoot ? <Root mock={true}>{component}</Root> : component}
    </ReduxStoreProvider>
  )
}
