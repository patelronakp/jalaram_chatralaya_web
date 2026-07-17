"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./use-auth"
import { canAccessAdmin } from "./permissions"

export function useRequireAuth(redirectTo: string = "/login") {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo)
    }
  }, [user, isLoading, router, redirectTo])

  return { user, isLoading }
}

export function useRequireGuest(redirectTo: string = "/") {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push(redirectTo)
    }
  }, [user, isLoading, router, redirectTo])

  return { user, isLoading }
}

export function useRequireAdmin(redirectTo: string = "/admin/login") {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user || !canAccessAdmin(user)) {
        router.push(redirectTo)
      }
    }
  }, [user, isLoading, router, redirectTo])

  return { user, isLoading }
}
