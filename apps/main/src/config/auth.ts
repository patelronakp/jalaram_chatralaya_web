import { createAuth, createMockAuthAdapter } from "@repo/auth-core"
import { createCustomApiAuthAdapter } from "@repo/auth-custom-api"

import { apiClient } from "./api"
import { IS_API_CONFIGURED } from "./env"

/**
 * Single source of truth for the active auth adapter.
 * `pnpm setup-project` rewrites this file based on the chosen provider.
 *
 * Default (Custom API) uses a smart fallback: with no API base URL configured
 * it runs the mock adapter (instant demo, sign in with anything), and switches
 * to the real custom API the moment a base URL is set — no code changes.
 */
export const auth = createAuth(
  IS_API_CONFIGURED ? createCustomApiAuthAdapter(apiClient) : createMockAuthAdapter(),
)
