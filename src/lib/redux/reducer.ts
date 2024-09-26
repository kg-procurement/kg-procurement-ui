import { combineReducers } from '@reduxjs/toolkit'

import { api } from './services/api.ts'

export const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
})
