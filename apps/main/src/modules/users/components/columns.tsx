"use client"

import { DataTableColumnHeader } from "@repo/admin-ui"
import { cn, formatDate } from "@repo/utils"
import type { ColumnDef } from "@tanstack/react-table"
import React from "react"

import type { UserModuleData } from "../types"

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * Data columns for the users table. Name and Role are derived from the backend
 * fields; CrudTable adds the select + row-actions columns automatically.
 */
export const userColumns: ColumnDef<UserModuleData>[] = [
  {
    id: "name",
    accessorFn: (user) => `${user.first_name} ${user.last_name}`.trim(),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground">{getValue<string>()}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    enableSorting: false,
  },
  {
    id: "role",
    accessorFn: (user) => (user.is_admin ? "admin" : user.is_guest ? "guest" : "user"),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ getValue }) => {
      const role = getValue<string>()
      return (
        <Pill
          className={
            role === "admin"
              ? "bg-purple-500/10 text-purple-700 ring-purple-600/20 dark:text-purple-300"
              : role === "guest"
                ? "bg-muted text-muted-foreground ring-border"
                : "bg-blue-500/10 text-blue-700 ring-blue-600/20 dark:text-blue-300"
          }
        >
          {role}
        </Pill>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const active = row.original.status === 1
      return (
        <Pill
          className={
            active
              ? "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300"
              : "bg-amber-500/10 text-amber-700 ring-amber-600/20 dark:text-amber-300"
          }
        >
          {active ? "Active" : "Inactive"}
        </Pill>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => <span>{formatDate(row.original.created_at)}</span>,
    enableSorting: false,
  },
]
