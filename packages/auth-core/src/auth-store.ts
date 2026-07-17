import type { Session, User } from "@repo/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/**
 * Single source of truth for authentication state.
 *
 * This is intentional, well-scoped client/global state (the current identity +
 * token) — NOT server/query data. Lists and entities still belong in TanStack
 * Query. Persisting the session here gives us one canonical place readable from
 * both React (components/hooks) and non-React code (the API client), under one
 * localStorage key instead of per-adapter keys.
 */

export type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface AuthState {
  user: User | null
  token: string | null
  status: AuthStatus
  setSession: (session: Session | null) => void
  setStatus: (status: AuthStatus) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      status: "loading",
      setSession: (session) =>
        set({
          user: session?.user ?? null,
          token: session?.token ?? null,
          status: session ? "authenticated" : "unauthenticated",
        }),
      setStatus: (status) => set({ status }),
      clear: () => set({ user: null, token: null, status: "unauthenticated" }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      // Persist only the durable session; `status` is derived at runtime.
      partialize: (state) => ({ user: state.user, token: state.token }),
      // Rehydration is driven explicitly by AuthProvider to stay SSR-safe.
      skipHydration: true,
    },
  ),
)

// --- Non-React accessors (API client, adapters, interceptors) ---

/** Current bearer token, or null. Use in the shared API client. */
export const getAuthToken = (): string | null => useAuthStore.getState().token

/** Current user, or null. */
export const getAuthUser = (): User | null => useAuthStore.getState().user

/** Replace the active session (or clear it with `null`). */
export const setAuthSession = (session: Session | null): void =>
  useAuthStore.getState().setSession(session)

/** Clear the session (sign out). */
export const clearAuth = (): void => useAuthStore.getState().clear()
