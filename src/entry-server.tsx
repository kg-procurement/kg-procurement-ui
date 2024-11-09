import { renderToString } from 'react-dom/server'

import { configureAppStore } from '@/lib/redux/store.ts'

import Main from './main.tsx'

export async function render(initialStore = configureAppStore()) {
  const appHtml = renderToString(<Main store={initialStore} />)
  const serializedStoreData = JSON.stringify(initialStore.getState())
  return { appHtml, serializedStoreData }
}

export type RenderReturn = typeof render
