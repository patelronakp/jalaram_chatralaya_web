"use client"

import type { Session } from "@repo/types"
import React, { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react"

import { clearAuth, setAuthSession, useAuthStore } from "./auth-store"
import type { AuthAdapter } from "./types"

/**
 * Auth actions are provider-scoped (they need the injected adapter). State lives
 * in the Zustand store; this context only carries the action functions.
 */
export interface AuthActions {
  signIn: (credentials: Record<string, any>) => Promise<Session>
  signUp: (credentials: Record<string, any>) => Promise<Session>
  signOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (password: string, token?: string) => Promise<void>
}

const AuthActionsContext = createContext<AuthActions | null>(null)

export function useAuthActions(): AuthActions {
  const ctx = useContext(AuthActionsContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}

export interface AuthProviderProps {
  children: ReactNode
  adapter: AuthAdapter
}

export function AuthProvider({ children, adapter }: AuthProviderProps) {
  const initialized = useRef(false)

  // Bootstrap: rehydrate the persisted session, then revalidate in the
  // background. Runs once on the client.
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const init = async () => {
      await useAuthStore.persist.rehydrate()
      const { token, setStatus } = useAuthStore.getState()

      if (!token) {
        setStatus("unauthenticated")
        return
      }

      // Trust the cached session immediately (no logged-out flash)…
      setStatus("authenticated")

      // …then confirm it against the adapter.
      try {
        const user = await adapter.getCurrentUser()
        if (user) setAuthSession({ user, token })
      } catch (err) {
        const e = err as { status?: number; code?: string }
        // Only sign out when the token is explicitly rejected.
        if (e?.status === 401 || e?.code === "401") clearAuth()
      }
    }

    void init()
  }, [adapter])

  const actions = useMemo<AuthActions>(
    () => ({
      signIn: async (credentials) => {
        const session = await adapter.signIn(credentials)
        setAuthSession(session)
        return session
      },
      signUp: async (credentials) => {
        const session = await adapter.signUp(credentials)
        setAuthSession(session)
        return session
      },
      signOut: async () => {
        try {
          await adapter.signOut()
        } finally {
          clearAuth()
        }
      },
      forgotPassword: (email) => adapter.forgotPassword(email),
      resetPassword: (password, token) => adapter.resetPassword(password, token),
    }),
    [adapter],
  )

  return <AuthActionsContext.Provider value={actions}>{children}</AuthActionsContext.Provider>
}
