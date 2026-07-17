export type UserRole = "admin" | "user" | "guest"

export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: User
  token: string
}

export type Permission =
  | "users:read"
  | "users:write"
  | "users:delete"
  | "settings:read"
  | "settings:write"

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  code: number
  message: string | null
  data: T
  error: any | null
}
