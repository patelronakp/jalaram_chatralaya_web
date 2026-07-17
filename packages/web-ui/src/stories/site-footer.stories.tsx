import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { SiteFooter } from "../site-footer"

const MockLink = ({ href, className, children }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
)

const meta: Meta<typeof SiteFooter> = {
  title: "Web UI/SiteFooter",
  component: SiteFooter,
  tags: ["autodocs"],
  args: {
    LinkComponent: MockLink,
  },
}

export default meta
type Story = StoryObj<typeof SiteFooter>

export const Default: Story = {}
