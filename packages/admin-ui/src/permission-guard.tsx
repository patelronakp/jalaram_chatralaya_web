"use client"

import React, { type ReactNode } from "react"
import { useAuth, hasPermission, hasRole } from "@repo/auth-core"
import type { Permission, UserRole } from "@repo/types"

export interface PermissionGuardProps {
  children: ReactNode
  fallback?: ReactNode
  permission?: Permission
  roles?: UserRole[]
}

export function PermissionGuard({
  children,
  fallback = null,
  permission,
  roles,
}: PermissionGuardProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (permission && !hasPermission(user, permission)) {
    return <>{fallback}</>
  }

  if (roles && !hasRole(user, roles)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
