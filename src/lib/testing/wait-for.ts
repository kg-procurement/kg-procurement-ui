import { screen, waitFor, waitForOptions } from '@testing-library/react'

export async function waitForNoLoadingOverlay(options?: waitForOptions) {
  await waitFor(async () => {
    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
  }, options)
}
