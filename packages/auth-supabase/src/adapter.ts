import type { AuthAdapter } from "@repo/auth-core"
import type { Session } from "@repo/types"

/**
 * Placeholder Supabase adapter. Stateless — persistence is owned by the auth
 * store in @repo/auth-core. Replace the bodies with real `@supabase/supabase-js`
 * calls; keep returning a `Session` from signIn/signUp and a `User` from
 * getCurrentUser.
 */
export function createSupabaseAuthAdapter(): AuthAdapter {
  const mockSession = (email?: string, name?: string): Session => ({
    user: {
      id: "sb-user-id",
      email: email || "supabase-admin@example.com",
      name: name || "Supabase Admin",
      role: (email || "admin").includes("admin") ? "admin" : "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    token: "supabase-mock-jwt-token",
  })

  return {
    signIn: async (credentials) => mockSession(credentials.email, credentials.name),
    signUp: async (credentials) => mockSession(credentials.email, credentials.name),
    signOut: async () => {},
    getSession: async () => null,
    getCurrentUser: async () => null,
    refreshSession: async () => null,
    forgotPassword: async () => {},
    resetPassword: async () => {},
  }
}
