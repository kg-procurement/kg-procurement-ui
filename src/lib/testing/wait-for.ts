import { screen, waitFor } from '@testing-library/react'

export async function waitForNoLoadingOverlay() {
  await waitFor(async () => {
    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
  })
}
