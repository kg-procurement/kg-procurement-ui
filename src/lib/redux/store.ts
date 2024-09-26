import {
  Action,
  configureStore,
  ThunkAction,
  type ThunkDispatch,
  type UnknownAction,
} from '@reduxjs/toolkit'

import { reducer } from '@/lib/redux/reducer.ts'
import { api } from '@/lib/redux/services/api.ts'

export const configureAppStore = () => {
  const store = configureStore({
    reducer,
    devTools: import.meta.env.DEV,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
  })
  return store
}

const store = configureAppStore()

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'] &
  ThunkDispatch<RootState, void, UnknownAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
