import { Provider as ReduxStoreProvider } from 'react-redux'

import { Toaster } from '@/components/atoms/toaster.tsx'
import { configureAppStore } from '@/lib/redux/store.ts'
import Root from '@/routes/__root.tsx'

export type WithWrappersOptions = {
  /**
   * If this option is set to true, then the root of the app will be rendered
   * This is required if you want to make use of the `loading-overlay` `data-testid`
   * @default false
   */
  withRoot?: boolean
}

export function withWrappers(
  component: React.ReactNode,
  options: WithWrappersOptions = {
    withRoot: false,
  },
) {
  return (
    <ReduxStoreProvider store={configureAppStore()}>
      <Toaster />
      {options.withRoot ? <Root mock={true}>{component}</Root> : component}
    </ReduxStoreProvider>
  )
}
