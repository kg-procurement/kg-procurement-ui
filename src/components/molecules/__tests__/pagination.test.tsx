import { render, screen } from '@testing-library/react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination.tsx'

describe('<Pagination />', () => {
  it('should render pagination container', () => {
    render(<Pagination data-testid="pagination" />)
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('renders PaginationContent', () => {
    render(<PaginationContent data-testid="pagination-content" />)
    expect(screen.getByTestId('pagination-content')).toBeInTheDocument()
  })

  it('renders PaginationItem', () => {
    render(<PaginationItem data-testid="pagination-item" />)
    expect(screen.getByTestId('pagination-item')).toBeInTheDocument()
  })

  it('renders active PaginationLink', () => {
    render(
      <PaginationLink isActive={true} data-testid="pagination-link">
        1
      </PaginationLink>,
    )
    const link = screen.getByTestId('pagination-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('aria-current', 'page')
  })

  it('renders inactive PaginationLink', () => {
    render(
      <PaginationLink isActive={false} data-testid="pagination-link">
        2
      </PaginationLink>,
    )
    const link = screen.getByTestId('pagination-link')
    expect(link).toBeInTheDocument()
    expect(link).not.toHaveAttribute('aria-current')
  })

  it('should renders PaginationPrevious', () => {
    render(<PaginationPrevious data-testid="pagination-previous" />)
    expect(screen.getByTestId('pagination-previous')).toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeInTheDocument()
  })

  it('renders PaginationNext', () => {
    render(<PaginationNext data-testid="pagination-next" />)
    expect(screen.getByTestId('pagination-next')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('renders PaginationEllipsis', () => {
    render(<PaginationEllipsis data-testid="pagination-ellipsis" />)
    expect(screen.getByTestId('pagination-ellipsis')).toBeInTheDocument()
    expect(screen.getByText('More pages')).toHaveClass('sr-only')
  })
})
