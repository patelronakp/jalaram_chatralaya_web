import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { AdminShell } from "../admin-shell"
import { AuthProvider } from "@repo/auth-core"
import { LayoutDashboard, Users, Settings } from "lucide-react"

const MockLink = ({ href, className, children }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
)

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: React.createElement(LayoutDashboard, { className: "h-4 w-4" }),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: React.createElement(Users, { className: "h-4 w-4" }),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: React.createElement(Settings, { className: "h-4 w-4" }),
  },
]

const breadcrumbItems = [{ label: "Admin", href: "/admin" }, { label: "Dashboard" }]

const mockAdapter: any = {
  signIn: async () => ({
    user: { id: "1", email: "admin@example.com", role: "admin", createdAt: "", updatedAt: "" },
    token: "jwt",
  }),
  signUp: async () => ({
    user: { id: "1", email: "admin@example.com", role: "admin", createdAt: "", updatedAt: "" },
    token: "jwt",
  }),
  signOut: async () => {},
  getSession: async () => ({
    user: { id: "1", email: "admin@example.com", role: "admin", createdAt: "", updatedAt: "" },
    token: "jwt",
  }),
  getCurrentUser: async () => ({
    id: "1",
    email: "admin@example.com",
    role: "admin",
    createdAt: "",
    updatedAt: "",
  }),
  refreshSession: async () => null,
  forgotPassword: async () => {},
  resetPassword: async () => {},
}

const meta: Meta<typeof AdminShell> = {
  title: "Admin UI/AdminShell",
  component: AdminShell,
  tags: ["autodocs"],
  args: {
    sidebarItems,
    currentPath: "/admin/dashboard",
    LinkComponent: MockLink,
    breadcrumbItems,
  },
  decorators: [
    (Story) =>
      React.createElement(AuthProvider, { adapter: mockAdapter }, React.createElement(Story)),
  ],
}

export default meta
type Story = StoryObj<typeof AdminShell>

export const Default: Story = {
  args: {
    children: React.createElement(
      "div",
      { className: "space-y-6" },
      React.createElement(
        "div",
        { className: "border-b pb-4" },
        React.createElement(
          "h2",
          { className: "text-2xl font-bold tracking-tight" },
          "Overview Dashboard",
        ),
        React.createElement(
          "p",
          { className: "text-sm text-muted-foreground" },
          "Welcome back, administrator.",
        ),
      ),
      React.createElement(
        "div",
        { className: "grid gap-4 sm:grid-cols-3" },
        React.createElement(
          "div",
          { className: "rounded-xl border bg-card p-6 shadow-sm" },
          React.createElement(
            "h4",
            { className: "text-sm font-medium text-muted-foreground" },
            "Total Database Nodes",
          ),
          React.createElement("div", { className: "text-2xl font-bold mt-2" }, "12 Nodes"),
        ),
        React.createElement(
          "div",
          { className: "rounded-xl border bg-card p-6 shadow-sm" },
          React.createElement(
            "h4",
            { className: "text-sm font-medium text-muted-foreground" },
            "Average API Latency",
          ),
          React.createElement("div", { className: "text-2xl font-bold mt-2" }, "42ms"),
        ),
        React.createElement(
          "div",
          { className: "rounded-xl border bg-card p-6 shadow-sm" },
          React.createElement(
            "h4",
            { className: "text-sm font-medium text-muted-foreground" },
            "Current Active Connections",
          ),
          React.createElement("div", { className: "text-2xl font-bold mt-2" }, "1,940"),
        ),
      ),
    ),
  },
}
