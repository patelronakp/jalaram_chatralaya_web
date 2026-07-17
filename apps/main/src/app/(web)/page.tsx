"use client"

import { Container, HeroSection, Section } from "@repo/web-ui"
import Link from "next/link"
import React from "react"

export default function HomePage() {
  return (
    <div className="space-y-6">
      <HeroSection
        title="Scalable Next.js Workspace Starter Template"
        subtitle="The developer-friendly internal master repository setup with Turborepo, pnpm workspace, clean layouts, and strict architecture boundaries."
        cta={
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary text-primary-foreground px-6 font-medium hover:bg-primary/90 transition-colors shadow"
            >
              Get Started
            </Link>
            <Link
              href="/admin/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-md border bg-background text-foreground px-6 font-medium hover:bg-accent hover:text-accent-foreground transition-colors shadow"
            >
              Admin Dashboard
            </Link>
          </div>
        }
      />
      <Section>
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Turborepo Workspace</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Decoupled packages for UI configuration, auth adapters, types, and utility files.
                Easy split in the future.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Adapter-based Auth</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Interchangeable authentication engines: Supabase, Firebase, Custom REST API, or Mock
                provider out of the box.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Generic DataTable</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Advanced TanStack Grid system with server-side pagination, sorting, searches,
                toggling columns, and bulk updates.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
