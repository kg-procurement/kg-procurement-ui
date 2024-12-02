import { useEffect } from 'react'

import { useCommonStore } from '@/lib/zustand/common.ts'

export function useLoadingOverlay(showOverlay: boolean) {
  const setShowLoadingOverlay = useCommonStore(
    state => state.setShowLoadingOverlay,
  )

  useEffect(() => {
    setShowLoadingOverlay(showOverlay)

    return () => {
      setShowLoadingOverlay(false)
    }
  }, [showOverlay, setShowLoadingOverlay])
}
