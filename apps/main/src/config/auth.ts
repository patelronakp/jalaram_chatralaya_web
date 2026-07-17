import { createAuth, createMockAuthAdapter } from "@repo/auth-core"
import { createCustomApiAuthAdapter } from "@repo/auth-custom-api"

import { apiClient } from "./api"
import { IS_API_CONFIGURED } from "./env"

// Smart fallback: mock auth with no API base URL (instant demo), real custom
// API the moment one is set. See config/env.ts.
export const auth = createAuth(
  IS_API_CONFIGURED ? createCustomApiAuthAdapter(apiClient) : createMockAuthAdapter(),
)
