import type { AuthAdapter } from "@repo/auth-core"
import type { ApiClient } from "@repo/api-client"
import type { Session, User } from "@repo/types"

export interface ApiUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  profile_image_url?: string
  is_guest?: boolean
  is_admin?: boolean
  status?: number
  created_at?: string
  updated_at?: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: ApiUser
}

export interface CustomApiAuthOptions {
  endpoints?: {
    signIn?: string
    signUp?: string
    signOut?: string
    me?: string
    forgotPassword?: string
    resetPassword?: string
  }
}

export function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    name:
      apiUser.first_name || apiUser.last_name
        ? `${apiUser.first_name || ""} ${apiUser.last_name || ""}`.trim()
        : undefined,
    role: apiUser.is_admin ? "admin" : apiUser.is_guest ? "guest" : "user",
    createdAt: apiUser.created_at || new Date().toISOString(),
    updatedAt: apiUser.updated_at || new Date().toISOString(),
  }
}

export function createCustomApiAuthAdapter(
  apiClient: ApiClient,
  options?: CustomApiAuthOptions,
): AuthAdapter {
  const endpoints = {
    signIn: "/admin/v1/auth/login",
    signUp: "/admin/v1/auth/register",
    signOut: "/admin/v1/auth/logout",
    me: "/admin/v1/auth/me",
    forgotPassword: "/admin/v1/auth/forgot-password",
    resetPassword: "/admin/v1/auth/reset-password",
    ...options?.endpoints,
  }

  // Stateless: the auth store (auth-core) owns persistence. The shared apiClient
  // reads the bearer token from that store, so requests here are authenticated
  // automatically.
  return {
    signIn: async (credentials) => {
      const data = await apiClient.post<LoginResponse>(endpoints.signIn, {
        email: credentials.email,
        password: credentials.password,
      })
      return { user: mapApiUserToUser(data.user), token: data.access_token } satisfies Session
    },

    signUp: async (credentials) => {
      const data = await apiClient.post<LoginResponse>(endpoints.signUp, credentials)
      return { user: mapApiUserToUser(data.user), token: data.access_token } satisfies Session
    },

    signOut: async () => {
      // Best-effort server-side logout; the store is cleared by the provider.
      await apiClient.post(endpoints.signOut).catch(() => {})
    },

    // The store holds the persisted session; revalidation happens via /me.
    getSession: async () => null,

    // Validate the current token against /me. Throws (status 401) when the token
    // is rejected, which the provider uses to sign out.
    getCurrentUser: async () => {
      const apiUser = await apiClient.get<ApiUser>(endpoints.me)
      return mapApiUserToUser(apiUser)
    },

    refreshSession: async () => null,

    forgotPassword: async (email) => {
      await apiClient.post(endpoints.forgotPassword, { email })
    },

    resetPassword: async (password, token) => {
      await apiClient.post(endpoints.resetPassword, { password, token })
    },
  }
}
