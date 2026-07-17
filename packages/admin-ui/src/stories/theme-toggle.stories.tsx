import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ThemeToggle } from "../theme-toggle"

const meta: Meta<typeof ThemeToggle> = {
  title: "Admin UI/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8 bg-card rounded-lg border max-w-sm mx-auto shadow-sm">
        <Story />
        <span className="ml-3 text-sm font-medium text-muted-foreground">
          Toggle Light/Dark Theme
        </span>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {}
