import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Container } from "../container"

const meta: Meta<typeof Container> = {
  title: "Web UI/Container",
  component: Container,
  tags: ["autodocs"],
  args: {
    children: React.createElement(
      "div",
      { className: "bg-muted p-8 text-center rounded-lg border font-mono text-sm" },
      "Container Content (responsive maximum width boundaries)",
    ),
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {}
