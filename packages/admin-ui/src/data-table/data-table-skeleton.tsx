"use client"

import { Skeleton, TableCell, TableRow } from "@repo/ui"
import { cn } from "@repo/utils"
import type { ColumnDef } from "@tanstack/react-table"
import React from "react"

/** Natural-looking varied bar widths for text columns. */
const TEXT_WIDTHS = ["w-[70%]", "w-[55%]", "w-[80%]", "w-[45%]", "w-[65%]"]

function barClass<TData, TValue>(column: ColumnDef<TData, TValue>, index: number): string {
  if (column.id === "select") return "h-4 w-4 rounded-sm"
  if (column.id === "actions") return "ml-auto h-4 w-6"
  return cn("h-4", TEXT_WIDTHS[index % TEXT_WIDTHS.length])
}

export interface DataTableSkeletonProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  rows?: number
}

/**
 * Placeholder rows shown while the table's first page loads. Renders one
 * shimmering bar per cell so the layout stays stable (no spinner jump).
 */
export function DataTableSkeleton<TData, TValue>({
  columns,
  rows = 8,
}: DataTableSkeletonProps<TData, TValue>) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="hover:bg-transparent">
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className={barClass(column, colIndex)} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
