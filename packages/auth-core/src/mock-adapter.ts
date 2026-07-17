import type { Session, User } from "@repo/types"

import type { AuthAdapter } from "./types"

function makeUser(email?: string): User {
  return {
    id: "mock-admin",
    email: email || "admin@demo.local",
    name: "Demo Admin",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Zero-backend auth adapter for demo / "None" mode. Accepts any credentials and
 * signs the user in as an admin so the panel is fully explorable without a
 * backend. Used as the fallback when no API base URL is set, and by the "None"
 * provider option.
 *
 * Stateless: persistence is owned by the auth store (see auth-store.ts).
 */
export function createMockAuthAdapter(): AuthAdapter {
  return {
    signIn: async (credentials: Record<string, unknown>) => {
      return { user: makeUser(credentials.email as string), token: "mock-token" } satisfies Session
    },
    signUp: async (credentials: Record<string, unknown>) => {
      return { user: makeUser(credentials.email as string), token: "mock-token" } satisfies Session
    },
    signOut: async () => {},
    getSession: async () => null,
    // No backend to validate against — the store keeps the cached session.
    getCurrentUser: async () => null,
    refreshSession: async () => null,
    forgotPassword: async () => {},
    resetPassword: async () => {},
  }
}
