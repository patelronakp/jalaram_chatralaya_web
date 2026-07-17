"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui"
import { flexRender } from "@tanstack/react-table"
import React from "react"

import { EmptyState } from "../empty-state"
import { ErrorState } from "../error-state"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableSkeleton } from "./data-table-skeleton"
import { DataTableToolbar } from "./data-table-toolbar"
import type { DataTableProps } from "./types"
import { useDataTable } from "./use-data-table"

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    loading = false,
    isFetching = false,
    error = null,
    searchKey,
    searchValue,
    onSearchChange,
    toolbarActions,
    bulkActions,
  } = props

  const { table, selectedRows } = useDataTable(props)

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <div className="animate-in fade-in-50 space-y-4">
      {/* Bulk action header, shown when rows are selected. */}
      {selectedRows.length > 0 && bulkActions && (
        <div className="animate-in fade-in slide-in-from-top-1 flex items-center justify-between rounded-md border bg-muted p-3 text-sm">
          <span className="font-medium text-muted-foreground">
            {selectedRows.length} item(s) selected
          </span>
          <div className="flex items-center gap-2">{bulkActions(selectedRows, table)}</div>
        </div>
      )}

      <DataTableToolbar
        table={table}
        searchKey={searchKey}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        toolbarActions={toolbarActions}
      />

      <div className="relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
        {/* Subtle top progress bar during background refetch (sort/page change). */}
        {isFetching && !loading && (
          <div className="absolute inset-x-0 top-0 h-0.5 animate-pulse bg-primary/60" />
        )}
        <Table>
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <DataTableSkeleton
                columns={columns}
                rows={Math.min(props.pagination?.pageSize ?? 8, 8)}
              />
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {!loading && data.length > 0 && <DataTablePagination table={table} />}
      </div>
    </div>
  )
}
