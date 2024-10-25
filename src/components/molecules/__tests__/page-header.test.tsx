import { render, screen } from '@testing-library/react'

import { Typography } from '@/components/atoms/typography.tsx'

import PageHeader from '../page-header.tsx'

describe('<PageHeader />', () => {
  it('should render the background image', () => {
    render(
      <PageHeader>
        <Typography variant="h2">Test Title</Typography>
      </PageHeader>,
    )

    const backgroundImage = screen.getByAltText(
      'Kompas Gramedia Logo Background',
    )
    expect(backgroundImage).toBeInTheDocument()
    expect(backgroundImage).toHaveAttribute(
      'src',
      '/kompas-gramedia-logo-bg.svg',
    )
  })

  it('should render the children passed to it', () => {
    render(
      <PageHeader>
        <Typography variant="h2">Test Title</Typography>
        <Typography variant="subtitle1">Test Subtitle</Typography>
      </PageHeader>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })
})
