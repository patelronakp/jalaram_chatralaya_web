import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Button } from "../components/button"

const meta: Meta<typeof Button> = {
  title: "UI Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button Label",
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: "default",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Action",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
  },
}
