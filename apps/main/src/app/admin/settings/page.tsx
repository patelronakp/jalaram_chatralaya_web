"use client"

import { PageHeader } from "@repo/admin-ui"
import React from "react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <PageHeader
        title="System Settings"
        description="Configure application modules and adapters settings."
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Core Adapter Configuration</h3>
        <p className="text-sm text-muted-foreground">
          System settings are currently managed via workspace environment files and the central
          setup script CLI configuration.
        </p>
      </div>
    </div>
  )
}
