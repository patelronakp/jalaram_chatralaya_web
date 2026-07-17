"use client"

import { useRequireAuth } from "@repo/auth-core"
import { Container, Section } from "@repo/web-ui"
import React from "react"

export default function ProfilePage() {
  const { user, isLoading } = useRequireAuth()

  if (isLoading || !user) {
    return (
      <div className="flex h-[calc(100vh-16rem)] items-center justify-center">
        <p className="text-sm text-muted-foreground animate-pulse">Verifying access...</p>
      </div>
    )
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8 animate-in fade-in-50">
          <h2 className="text-2xl font-bold tracking-tight mb-6">User Profile</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 border-b pb-4">
              <span className="text-sm font-medium text-muted-foreground">Name</span>
              <span className="col-span-2 text-sm font-semibold text-foreground">
                {user.name || "N/A"}
              </span>
            </div>
            <div className="grid grid-cols-3 border-b pb-4">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <span className="col-span-2 text-sm font-semibold text-foreground">{user.email}</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-4">
              <span className="text-sm font-medium text-muted-foreground">Account Role</span>
              <span className="col-span-2 text-sm font-semibold text-foreground capitalize">
                {user.role}
              </span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-sm font-medium text-muted-foreground">Created At</span>
              <span className="col-span-2 text-sm font-semibold text-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
