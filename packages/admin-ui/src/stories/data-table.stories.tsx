import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { DataTable } from "../data-table/data-table"
import type { ColumnDef } from "@tanstack/react-table"

interface MockData {
  id: string
  name: string
  role: string
  status: string
}

const columns: ColumnDef<MockData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

const data: MockData[] = [
  { id: "1", name: "Alice Vance", role: "Admin", status: "Active" },
  { id: "2", name: "Bob Carter", role: "User", status: "Active" },
  { id: "3", name: "Charlie Ding", role: "Guest", status: "Inactive" },
]

const meta: Meta<typeof DataTable> = {
  title: "Admin UI/DataTable",
  component: DataTable as any,
  tags: ["autodocs"],
  args: {
    columns: columns as any,
    data: data as any,
    loading: false,
    error: null,
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
  },
}
