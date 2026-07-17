"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth, useRequireGuest } from "@repo/auth-core"
import { AuthCard } from "@repo/web-ui"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>

export default function AdminLoginPage() {
  useRequireGuest("/admin/dashboard")
  const { signIn } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "supabase-admin@example.com",
      password: "password123",
    },
  })

  const onSubmit = async (data: AdminLoginFormValues) => {
    setError(null)
    setLoading(true)
    try {
      const session = await signIn(data)
      if (session.user.role !== "admin") {
        throw new Error("Access denied: Not an administrator.")
      }
      router.push("/admin/dashboard")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to authenticate administrator"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Admin Login" subtitle="Access administrative console">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
            {error}
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Admin Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            {...register("email")}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shadow mt-2"
        >
          {loading ? "Verifying..." : "Access Console"}
        </button>
      </form>
    </AuthCard>
  )
}
