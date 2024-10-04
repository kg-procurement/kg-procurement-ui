import { render } from '@testing-library/react'

import { withWrappers } from '@/lib/testing/utils.tsx'

import DashboardPage from '../dashboard.tsx'

describe('<DashboardPage />', () => {
  it('should render correctly without crashing', () => {
    render(withWrappers(<DashboardPage />))
  })
})
