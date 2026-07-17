import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Input } from "../components/input"

const meta: Meta<typeof Input> = {
  title: "UI Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Type something...",
  },
}

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
}
