import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/molecules/pagination.tsx'
export interface CustomPaginationProps {
  total_page: number
  current_page: number
  setPage: (page: number) => void
}
function CustomPagination(
  {
    current_page,
    total_page,
    setPage,
  }: CustomPaginationProps,
) {
  return (
    <>
      <Pagination>
        <PaginationContent>
          {current_page - 1 > 0
            ? (
                <PaginationItem>
                  <PaginationPrevious className="cursor-pointer hover:border" onClick={() => setPage(current_page - 1)} />
                </PaginationItem>
              )
            : ''}
          {current_page - 2 > 0
            ? (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            : ''}
          {current_page - 1 > 0
            ? (
                <PaginationItem>
                  <PaginationLink className="cursor-pointer hover:border">{current_page - 1}</PaginationLink>
                </PaginationItem>
              )
            : ''}
          <PaginationItem>
            <PaginationLink isActive>{current_page}</PaginationLink>
          </PaginationItem>
          {current_page + 1 < total_page
            ? (
                <PaginationItem>
                  <PaginationLink className="cursor-pointer hover:border" onClick={() => setPage(current_page + 1)}>{current_page + 1}</PaginationLink>
                </PaginationItem>
              )
            : ''}
          {current_page + 2 < total_page
            ? (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            : ''}
          {current_page + 1 < total_page
            ? (
                <PaginationItem>
                  <PaginationNext className="cursor-pointer hover:border" onClick={() => setPage(current_page + 1)} />
                </PaginationItem>
              )
            : ''}
        </PaginationContent>
      </Pagination>
    </>
  )
}
export default CustomPagination
