import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  Table,
} from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  /** Background refetch in progress (shows a subtle indicator, keeps rows visible). */
  isFetching?: boolean
  error?: string | null

  // Search (controlled by the caller).
  searchKey?: string
  searchValue?: string
  onSearchChange?: (value: string) => void

  // Server-side controlled state. Pass `pagination` + `onPaginationChange`
  // together to switch the table into manual (server-side) mode; `sorting`
  // is then lifted as well. Omit them for in-memory client mode.
  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  /** Total page count from the server (required in manual mode). */
  pageCount?: number

  // Composable slots.
  toolbarActions?: React.ReactNode
  bulkActions?: (selectedRows: TData[], table: Table<TData>) => React.ReactNode
}
