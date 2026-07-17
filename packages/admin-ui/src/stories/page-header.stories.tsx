import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { PageHeader } from "../page-header"

const meta: Meta<typeof PageHeader> = {
  title: "Admin UI/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: {
    title: "System Users",
    description: "Manage and audit registered user accounts and authorization roles.",
  },
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    action: React.createElement(
      "button",
      {
        className:
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2",
      },
      "Add User",
    ),
  },
}
