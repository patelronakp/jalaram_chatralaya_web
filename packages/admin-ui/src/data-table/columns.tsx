"use client"

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui"
import { cn, formatDate } from "@repo/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import React from "react"

import { DataTableColumnHeader } from "./data-table-column-header"

/**
 * Column factory helpers. Every table needs the same select checkbox column,
 * the same row-actions dropdown, and the same badge/date cell treatments —
 * these build them so a feature module only writes its genuinely unique columns.
 */

/** Leading checkbox column for row selection / bulk actions. */
export function selectColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}

export interface TextColumnOptions<T> {
  accessorKey: Extract<keyof T, string>
  title: string
  /** Render the value with emphasis (e.g. the primary name column). */
  bold?: boolean
  enableSorting?: boolean
}

/** Sortable text column with a standard header. */
export function textColumn<T>({
  accessorKey,
  title,
  bold,
  enableSorting = true,
}: TextColumnOptions<T>): ColumnDef<T> {
  return {
    accessorKey,
    enableSorting,
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
    cell: ({ row }) => {
      const value = row.getValue<string>(accessorKey)
      return bold ? (
        <span className="font-medium text-foreground">{value}</span>
      ) : (
        <span>{value}</span>
      )
    },
  }
}

export interface DateColumnOptions<T> {
  accessorKey: Extract<keyof T, string>
  title: string
}

/** Column that renders an ISO date string via the shared `formatDate`. */
export function dateColumn<T>({ accessorKey, title }: DateColumnOptions<T>): ColumnDef<T> {
  return {
    accessorKey,
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
    cell: ({ row }) => <span>{formatDate(row.getValue<string>(accessorKey))}</span>,
  }
}

/** Semantic badge tones, mapped to token-based classes (no hardcoded hex). */
export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info" | "purple"

const BADGE_TONES: Record<BadgeTone, string> = {
  neutral: "bg-muted text-muted-foreground ring-border",
  success:
    "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/20 dark:text-emerald-300",
  warning:
    "bg-amber-500/10 text-amber-700 ring-amber-600/20 dark:bg-amber-500/20 dark:text-amber-300",
  danger: "bg-red-500/10 text-red-700 ring-red-600/20 dark:bg-red-500/20 dark:text-red-300",
  info: "bg-blue-500/10 text-blue-700 ring-blue-600/20 dark:bg-blue-500/20 dark:text-blue-300",
  purple:
    "bg-purple-500/10 text-purple-700 ring-purple-600/20 dark:bg-purple-500/20 dark:text-purple-300",
}

export interface BadgeColumnOptions<T> {
  accessorKey: Extract<keyof T, string>
  title: string
  /** Map each possible value to a semantic tone. Unmapped values fall back to neutral. */
  tones?: Record<string, BadgeTone>
}

/** Column that renders an enum-ish value as a colored pill. */
export function badgeColumn<T>({
  accessorKey,
  title,
  tones = {},
}: BadgeColumnOptions<T>): ColumnDef<T> {
  return {
    accessorKey,
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
    cell: ({ row }) => {
      const value = row.getValue<string>(accessorKey)
      const tone = BADGE_TONES[tones[value] ?? "neutral"]
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
            tone,
          )}
        >
          {value}
        </span>
      )
    },
  }
}

export interface RowAction<T> {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  onClick: (item: T) => void
  destructive?: boolean
}

export interface RowActionsColumnOptions<T> {
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  /** Additional actions appended after Edit (before Delete). */
  extraActions?: RowAction<T>[]
}

/** Trailing "..." dropdown column with Edit / Delete and optional custom actions. */
export function rowActionsColumn<T>({
  onEdit,
  onDelete,
  extraActions = [],
}: RowActionsColumnOptions<T>): ColumnDef<T> {
  return {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[140px]">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(item)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}
            {extraActions.map((action) => {
              const Icon = action.icon
              return (
                <DropdownMenuItem
                  key={action.label}
                  onClick={() => action.onClick(item)}
                  className={cn(
                    action.destructive &&
                      "text-destructive focus:bg-destructive focus:text-destructive-foreground",
                  )}
                >
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {action.label}
                </DropdownMenuItem>
              )
            })}
            {onDelete && (onEdit || extraActions.length > 0) && <DropdownMenuSeparator />}
            {onDelete && (
              <DropdownMenuItem
                onClick={() => onDelete(item)}
                className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}
