import type { AuthAdapter } from "./types"

export function createAuth(adapter: AuthAdapter): AuthAdapter {
  return adapter
}
