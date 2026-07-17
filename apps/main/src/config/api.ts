import { ApiClient } from "@repo/api-client"
import { getAuthToken } from "@repo/auth-core"

import { API_BASE_URL } from "./env"

/**
 * The single shared HTTP client for every data API (admin and web).
 *
 * The bearer token comes from the auth store (the single source of truth), so
 * all requests are authenticated and point at the same base URL as auth. Import
 * this anywhere you talk to the backend.
 */
export const apiClient = new ApiClient({
  baseUrl: API_BASE_URL,
  getToken: () => getAuthToken(),
})
