/**
 * Centralized, typed access to public environment variables.
 *
 * `NEXT_PUBLIC_API_BASE_URL` is set by `pnpm setup-project` (written to
 * apps/main/.env.local). When it is empty, the app runs in zero-backend demo
 * mode: auth and data services fall back to local mock data. The moment a base
 * URL is present, everything switches to the real custom API — no code changes.
 */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim()

/** True once a real API base URL is configured. Drives the mock→real fallback. */
export const IS_API_CONFIGURED = API_BASE_URL.length > 0
