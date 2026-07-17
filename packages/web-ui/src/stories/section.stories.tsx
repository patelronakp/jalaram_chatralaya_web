import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Section } from "../section"

const meta: Meta<typeof Section> = {
  title: "Web UI/Section",
  component: Section,
  tags: ["autodocs"],
  args: {
    children: React.createElement(
      "div",
      { className: "bg-muted p-12 text-center rounded-lg border font-mono text-sm" },
      "Section Container Wrapper (padded layout block)",
    ),
  },
}

export default meta
type Story = StoryObj<typeof Section>

export const Default: Story = {}
