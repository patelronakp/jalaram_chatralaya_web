"use client"

import type { Session } from "@repo/types"

import { useAuthActions } from "./auth-provider"
import { useAuthStore } from "./auth-store"

/**
 * Primary auth hook. State comes from the Zustand store (single source of
 * truth); actions come from the provider-scoped adapter. The API is unchanged
 * for existing consumers (`user`, `isLoading`, `signIn`, `signOut`, …).
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const status = useAuthStore((s) => s.status)
  const actions = useAuthActions()

  const session: Session | null = user && token ? { user, token } : null

  return {
    user,
    token,
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    ...actions,
  }
}
