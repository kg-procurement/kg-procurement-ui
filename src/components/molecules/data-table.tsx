import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

interface WithPagination {
  pagination: true
  paginationProps: {
    itemPerPage: number
    currentPage: number
    totalPages: number
    onPreviousPage: () => void
    onNextPage: () => void
    onItemPerPageChange: (newValue: number) => void
    onCurrentPageChange: (newValue: number) => void
  }
}

interface BaseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  pagination: false | undefined
  loading?: boolean
}

type DataTableProps<TData, TValue> =
  | BaseDataTableProps<TData, TValue>
  | (Omit<BaseDataTableProps<TData, TValue>, 'pagination'> & WithPagination)

export default function DataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  const { columns, data = [], pagination = false, loading = false } = props

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
}
