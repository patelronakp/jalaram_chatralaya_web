import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { AuthCard } from "../auth-card"

const meta: Meta<typeof AuthCard> = {
  title: "Web UI/AuthCard",
  component: AuthCard,
  tags: ["autodocs"],
  args: {
    title: "Sign In",
    subtitle: "Provide credentials to access console features",
  },
}

export default meta
type Story = StoryObj<typeof AuthCard>

export const Default: Story = {
  args: {
    children: React.createElement(
      "div",
      { className: "space-y-4" },
      React.createElement(
        "div",
        { className: "flex flex-col gap-1" },
        React.createElement("label", { className: "text-sm font-medium" }, "Email Address"),
        React.createElement("input", {
          className: "h-9 w-full rounded border bg-transparent px-3 text-sm focus:outline-none",
          placeholder: "name@example.com",
        }),
      ),
      React.createElement(
        "div",
        { className: "flex flex-col gap-1" },
        React.createElement("label", { className: "text-sm font-medium" }, "Password"),
        React.createElement("input", {
          className: "h-9 w-full rounded border bg-transparent px-3 text-sm focus:outline-none",
          type: "password",
          placeholder: "••••••••",
        }),
      ),
      React.createElement(
        "button",
        {
          className:
            "h-9 w-full rounded bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90",
        },
        "Continue",
      ),
    ),
    footer: React.createElement(
      "p",
      { className: "text-xs text-muted-foreground" },
      "Don't have an account? ",
      React.createElement(
        "span",
        { className: "text-primary hover:underline cursor-pointer" },
        "Register",
      ),
    ),
  },
}
