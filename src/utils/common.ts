import { useSyncExternalStore } from 'react'

export const noop = () => {}

const subscribe = () => {
  return noop
}

export const useHydrated = () => {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
