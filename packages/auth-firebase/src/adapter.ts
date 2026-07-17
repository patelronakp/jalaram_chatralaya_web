import type { AuthAdapter } from "@repo/auth-core"
import type { Session } from "@repo/types"

/**
 * Placeholder Firebase adapter. Stateless — persistence is owned by the auth
 * store in @repo/auth-core. Replace the bodies with real `firebase/auth` calls;
 * keep returning a `Session` from signIn/signUp and a `User` from getCurrentUser.
 */
export function createFirebaseAuthAdapter(): AuthAdapter {
  const mockSession = (email?: string, name?: string): Session => ({
    user: {
      id: "fb-user-id",
      email: email || "firebase-admin@example.com",
      name: name || "Firebase Admin",
      role: (email || "admin").includes("admin") ? "admin" : "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    token: "firebase-mock-jwt-token",
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
