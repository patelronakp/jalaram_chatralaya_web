import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { EmptyState } from "../empty-state"
import { LoadingState } from "../loading-state"
import { ErrorState } from "../error-state"

const meta: Meta = {
  title: "Admin UI/States",
  tags: ["autodocs"],
}

export default meta

export const Loading: StoryObj<typeof LoadingState> = {
  render: () => React.createElement(LoadingState, { message: "Fetching system status..." }),
}

export const Empty: StoryObj<typeof EmptyState> = {
  render: () =>
    React.createElement(EmptyState, {
      title: "No Accounts Registered",
      description: "Select the add user button to populate the table values.",
    }),
}

export const Error: StoryObj<typeof ErrorState> = {
  render: () =>
    React.createElement(ErrorState, {
      title: "Server Connection Failure",
      message: "Lost connection to PostgreSQL. Check your system environment configurations.",
      retry: () => alert("Retrying..."),
    }),
}
