import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { SiteHeader } from "../site-header"

const MockLink = ({ href, className, children }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
)

const meta: Meta<typeof SiteHeader> = {
  title: "Web UI/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  args: {
    LinkComponent: MockLink,
  },
}

export default meta
type Story = StoryObj<typeof SiteHeader>

export const Guest: Story = {
  args: {
    isAuthenticated: false,
  },
}

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    userName: "Alice Vance",
  },
}
