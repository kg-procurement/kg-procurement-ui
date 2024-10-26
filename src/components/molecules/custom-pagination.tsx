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
  }: Readonly<CustomPaginationProps>,
) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={current_page - 1 <= 0} className="cursor-pointer hover:border" onClick={() => setPage(current_page - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis className={`${current_page - 2 <= 0 ? 'opacity-0' : ''}`} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className={`${current_page - 1 <= 0 ? 'opacity-0' : ''} cursor-pointer hover:border`} onClick={(() => setPage(current_page - 1))}>{current_page - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{current_page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className={`${current_page + 1 > total_page ? 'opacity-0' : ''} cursor-pointer hover:border`} onClick={() => setPage(current_page + 1)}>{current_page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis className={`${current_page + 2 > total_page ? 'opacity-0' : ''}`} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled={current_page + 1 > total_page} className="cursor-pointer hover:border" onClick={() => setPage(current_page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default CustomPagination
