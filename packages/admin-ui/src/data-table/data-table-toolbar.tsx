"use client"

import React from "react"
import type { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "./data-table-view-options"
import { X } from "lucide-react"
import { Input, Button } from "@repo/ui"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  toolbarActions?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchValue,
  onSearchChange,
  toolbarActions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = searchValue && searchValue.length > 0

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && onSearchChange && (
          <div className="relative flex items-center">
            <Input
              placeholder={`Filter by ${searchKey}...`}
              value={searchValue ?? ""}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-9 w-[150px] lg:w-[250px] pr-8"
            />
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => onSearchChange("")}
                className="absolute right-0 top-0 h-9 w-9 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {toolbarActions}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
