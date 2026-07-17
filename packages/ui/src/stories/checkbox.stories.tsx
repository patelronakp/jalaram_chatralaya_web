import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Checkbox } from "../components/checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "UI Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2 p-4">
        <Story />
        <span className="text-sm text-foreground">Accept terms and conditions</span>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const CheckedByDefault: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
