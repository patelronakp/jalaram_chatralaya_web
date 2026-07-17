import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ConfirmDialog } from "../confirm-dialog"

const meta: Meta<typeof ConfirmDialog> = {
  title: "Admin UI/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  args: {
    isOpen: true,
    title: "Delete Account Record",
    description:
      "Are you sure you want to delete this user? This action is permanent and cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel",
    onClose: () => console.log("Close clicked"),
    onConfirm: () => console.log("Confirm clicked"),
  },
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

export const Standard: Story = {
  args: {
    isDestructive: false,
    title: "Save Changes",
    description: "Confirm updating this user's settings profile details.",
    confirmText: "Save",
  },
}

export const Destructive: Story = {
  args: {
    isDestructive: true,
  },
}
