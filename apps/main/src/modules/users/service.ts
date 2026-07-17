import { createMockService, type CrudService, type ListParams, type ListResult } from "@repo/crud"

import { apiClient } from "@/config/api"
import { IS_API_CONFIGURED } from "@/config/env"

import type { UserFormValues } from "./schema"
import type { UserModuleData } from "./types"

const RESOURCE = "/admin/v1/users"

/** Backend list envelope (after ApiClient unwraps the `{ success, data }` wrapper). */
interface ApiListResponse {
  items: UserModuleData[]
  total: number
  page: number
  page_size: number
  pages: number
}

/** Map friendly form values to the backend user payload (includes password on create). */
function toApiPayload(values: UserFormValues): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    is_admin: values.role === "admin",
    is_guest: values.role === "guest",
    status: values.status === "active" ? 1 : 0,
  }
  // Only sent when present — required on create, omitted on edit.
  if (values.password) payload.password = values.password
  return payload
}

/** Map form values to a stored mock entity (no password field on the entity). */
function toMockEntity(values: UserFormValues): Partial<UserModuleData> {
  return {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    is_admin: values.role === "admin",
    is_guest: values.role === "guest",
    status: values.status === "active" ? 1 : 0,
  }
}

/** Real backend service. Translates this API's pagination params + envelope. */
const apiUserService: CrudService<UserModuleData, UserFormValues> = {
  list: async (params: ListParams): Promise<ListResult<UserModuleData>> => {
    const sp = new URLSearchParams()
    sp.set("page", String(params.page ?? 1))
    sp.set("page_size", String(params.pageSize ?? 20))
    if (params.search) sp.set("search", params.search)
    if (params.sortBy) {
      sp.set("sort_by", params.sortBy)
      sp.set("sort_dir", params.sortDir ?? "asc")
    }
    const res = await apiClient.get<ApiListResponse>(`${RESOURCE}?${sp.toString()}`)
    return { data: res.items, total: res.total, pageCount: res.pages }
  },
  get: (id) => apiClient.get<UserModuleData>(`${RESOURCE}/${id}`),
  create: (values) => apiClient.post<UserModuleData>(RESOURCE, toApiPayload(values)),
  update: (id, values) => apiClient.put<UserModuleData>(`${RESOURCE}/${id}`, toApiPayload(values)),
  remove: (id) => apiClient.delete<void>(`${RESOURCE}/${id}`),
  removeBulk: async (ids) => {
    await Promise.all(ids.map((id) => apiClient.delete<void>(`${RESOURCE}/${id}`)))
  },
}

const SEED_USERS: UserModuleData[] = [
  {
    id: "1",
    first_name: "Alice",
    last_name: "Vance",
    email: "alice@example.com",
    is_admin: true,
    is_guest: false,
    status: 1,
    created_at: "2026-01-15T08:00:00Z",
  },
  {
    id: "2",
    first_name: "Bob",
    last_name: "Carter",
    email: "bob@example.com",
    is_admin: false,
    is_guest: false,
    status: 1,
    created_at: "2026-02-18T09:30:00Z",
  },
  {
    id: "3",
    first_name: "Charlie",
    last_name: "Ding",
    email: "charlie@example.com",
    is_admin: false,
    is_guest: true,
    status: 0,
    created_at: "2026-03-22T10:15:00Z",
  },
]

/** Zero-backend demo service. Same shape + mapping as the real one. */
const mockUserService = createMockService<UserModuleData, UserFormValues>({
  storageKey: "users",
  seed: SEED_USERS,
  searchFields: ["first_name", "last_name", "email"],
  timestampField: "created_at",
  mapValues: toMockEntity,
})

/**
 * The active users data source. Uses the real API when a base URL is configured
 * (see config/env.ts), and a localStorage mock otherwise — so the module works
 * end-to-end with or without a backend, and switches automatically.
 */
export const userService: CrudService<UserModuleData, UserFormValues> = IS_API_CONFIGURED
  ? apiUserService
  : mockUserService
