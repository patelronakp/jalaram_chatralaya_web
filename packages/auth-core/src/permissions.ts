import type { User, UserRole, Permission } from "@repo/types"

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: ["users:read", "users:write", "users:delete", "settings:read", "settings:write"],
  user: ["users:read", "settings:read"],
  guest: [],
}

export function hasRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false
  return roles.includes(user.role)
}

export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false
  const permissions = ROLE_PERMISSIONS[user.role] || []
  return permissions.includes(permission)
}

export function canAccessAdmin(user: User | null): boolean {
  if (!user) return false
  return user.role === "admin"
}
