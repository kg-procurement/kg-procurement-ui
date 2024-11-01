import { fireEvent, render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { act } from 'react'

import { mswServer } from '@/lib/msw/index.ts'
import { withWrappers } from '@/lib/testing/utils.tsx'

import CustomPagination from '../custom-pagination.tsx'

describe('<CustomPagination />', () => {
  it('should render the current page correctly', () => {
    render(
      withWrappers(
        <CustomPagination current_page={2} total_page={5} setPage={() => {}} />,
      ),
    )
    const currentPage = screen.getByText('2')
    const nextPage = screen.getByText('3')
    const prevPage = screen.getByText('1')
    expect(currentPage).toBeInTheDocument()
    expect(nextPage).toBeInTheDocument()
    expect(prevPage).toBeInTheDocument()
  })
  it('should render the "Previous" button and disable "Next" button', () => {
    mswServer.use(
      http.get(`/product/vendor/1`, () =>
        HttpResponse.json({ current_page: 5, total_page: 5 }),
      ),
    )
    render(
      withWrappers(
        <CustomPagination current_page={5} total_page={5} setPage={() => {}} />,
      ),
    )
    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    })
    const nextButton = screen.getByRole('button', { name: 'Go to next page' })
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeDisabled()
  })

  it('should render the "Next" button and disable "Previous" button', () => {
    mswServer.use(
      http.get(`/product/vendor/1`, () =>
        HttpResponse.json({ current_page: 1, total_page: 5 }),
      ),
    )
    render(
      withWrappers(
        <CustomPagination current_page={1} total_page={5} setPage={() => {}} />,
      ),
    )
    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    })
    const nextButton = screen.getByRole('button', { name: 'Go to next page' })
    expect(nextButton).toBeInTheDocument()
    expect(prevButton).toBeDisabled()
  })

  it('should go to the next page', () => {
    const mockHandleSetPage = vi.fn()
    render(
      withWrappers(
        <CustomPagination
          current_page={1}
          total_page={5}
          setPage={mockHandleSetPage}
        />,
      ),
    )
    const nextpage = screen.getByText('2')
    act(() => {
      fireEvent.click(nextpage)
    })
    expect(mockHandleSetPage).toHaveBeenCalledWith(2)
  })

  it('should go to the prev page', () => {
    const mockHandleSetPage = vi.fn()
    render(
      withWrappers(
        <CustomPagination
          current_page={2}
          total_page={5}
          setPage={mockHandleSetPage}
        />,
      ),
    )
    const prevPage = screen.getByText('Previous')
    act(() => {
      fireEvent.click(prevPage)
    })
    expect(mockHandleSetPage).toHaveBeenCalledWith(1)
  })
})
