import { createAction } from '@reduxjs/toolkit'
import ReactDOMClient from 'react-dom/client'

import { HYDRATE } from './lib/redux/services/api.ts'
import { configureAppStore } from './lib/redux/store.ts'
import Main from './main.tsx'

const serializedStoreData = document.getElementById('__STORE_DATA__')

const store = configureAppStore()
if (serializedStoreData) {
  const hydrate = createAction<string>(HYDRATE)
  const storeData = JSON.parse(serializedStoreData.innerHTML)
  store.dispatch(hydrate(storeData))
}

ReactDOMClient.hydrateRoot(
  document.getElementById('root')!,
  <Main store={store} />,
)
