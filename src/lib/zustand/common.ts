import { create } from 'zustand'

export interface CommonStore {
  showLoadingOverlay: boolean
  setShowLoadingOverlay: (newValue: boolean) => void
}

export const useCommonStore = create<CommonStore>(set => ({
  showLoadingOverlay: false,
  setShowLoadingOverlay: newValue =>
    set(state => ({ ...state, showLoadingOverlay: newValue })),
}))
