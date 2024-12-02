import { useEffect } from 'react'

import { useCommonStore } from '@/lib/zustand/common.ts'

export function useLoadingOverlay(showOverlay: boolean) {
  const setShowLoadingOverlay = useCommonStore(
    state => state.setShowLoadingOverlay,
  )

  useEffect(() => {
    setShowLoadingOverlay(showOverlay)

    return () => {
      // If for any reason we exit from the useEffect
      // Clean up the loading overlay, (this might happen when page is redirected when data is still being fetched)
      setShowLoadingOverlay(false)
    }
  }, [showOverlay, setShowLoadingOverlay])
}
