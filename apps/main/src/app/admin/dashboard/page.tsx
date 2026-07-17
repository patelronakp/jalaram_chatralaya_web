"use client"

import { PageHeader } from "@repo/admin-ui"
import { Activity, Server, Shield, Users } from "lucide-react"
import React from "react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of the system performance and accounts metrics."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Users Metric */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
            <h3 className="text-2xl font-bold">1,482</h3>
          </div>
        </div>

        {/* Security Metric */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Auth Events</p>
            <h3 className="text-2xl font-bold">42,910</h3>
          </div>
        </div>

        {/* Server status */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">APIs Latency</p>
            <h3 className="text-2xl font-bold">48ms</h3>
          </div>
        </div>

        {/* System load */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-500">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Uptime Rate</p>
            <h3 className="text-2xl font-bold">99.98%</h3>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Recent System Logs</h3>
          <div className="space-y-3">
            {[
              { time: "10:14:02", type: "info", text: "Supabase adapter session refreshed." },
              {
                time: "09:48:19",
                type: "warn",
                text: "Database connection pools high threshold (82%).",
              },
              {
                time: "09:30:05",
                type: "info",
                text: "User account 'sb-user-id' logged in successfully.",
              },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 text-xs font-mono border-b pb-2 last:border-0">
                <span className="text-muted-foreground">{log.time}</span>
                <span
                  className={
                    log.type === "warn" ? "text-amber-500 font-semibold" : "text-emerald-500"
                  }
                >
                  [{log.type.toUpperCase()}]
                </span>
                <span className="text-foreground">{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Workspace Environment</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Framework</span>
              <span className="font-semibold">Next.js 15.0 (App Router)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">CSS Engine</span>
              <span className="font-semibold">Tailwind CSS (theme-admin scope)</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted-foreground">Workspace Builder</span>
              <span className="font-semibold">Turborepo + pnpm workspaces</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
