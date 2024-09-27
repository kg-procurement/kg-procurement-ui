import { Provider } from 'react-redux'

import { configureAppStore } from '@/lib/redux/store.ts'

export function withWrappers(component: React.ReactNode) {
  return <Provider store={configureAppStore()}>{component}</Provider>
}
