"use client"

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { useState } from "react"

import type { DataTableProps } from "./types"

/**
 * Builds the TanStack Table instance for `DataTable`.
 *
 * Runs in one of two modes:
 *  - **Client mode** (default): all sorting/pagination/filtering happens
 *    in-memory. Use for small, fully-loaded datasets.
 *  - **Server/manual mode**: enabled when the caller passes controlled
 *    `pagination` + `onPaginationChange`. Sorting and pagination state is
 *    lifted to the caller (typically `useCrudResource`) and round-tripped to
 *    the API; the table renders exactly the rows it is given.
 */
export function useDataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, data, pagination, onPaginationChange, sorting, onSortingChange, pageCount } =
    props

  const isManual = pagination !== undefined && onPaginationChange !== undefined

  // Internal fallbacks for client mode (and for state we never lift server-side).
  const [internalSorting, setInternalSorting] = useState<SortingState>([])
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    pageCount: isManual ? (pageCount ?? -1) : undefined,
    state: {
      sorting: sorting ?? internalSorting,
      pagination: pagination ?? internalPagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    manualPagination: isManual,
    manualSorting: isManual,
    manualFiltering: isManual,
    onSortingChange: onSortingChange ?? setInternalSorting,
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    // Client row models are only meaningful when NOT in manual mode.
    getPaginationRowModel: isManual ? undefined : getPaginationRowModel(),
    getSortedRowModel: isManual ? undefined : getSortedRowModel(),
    getFilteredRowModel: isManual ? undefined : getFilteredRowModel(),
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((r) => r.original)

  return { table, selectedRows, isManual }
}
