import type { User, Session } from "@repo/types"

export interface AuthAdapter {
  signIn: (credentials: Record<string, any>) => Promise<Session>
  signUp: (credentials: Record<string, any>) => Promise<Session>
  signOut: () => Promise<void>
  getSession: () => Promise<Session | null>
  getCurrentUser: () => Promise<User | null>
  refreshSession: () => Promise<Session | null>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (password: string, token?: string) => Promise<void>
}
