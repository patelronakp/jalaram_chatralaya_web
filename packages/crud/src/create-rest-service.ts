import type { ApiClient } from "@repo/api-client"

import type { CrudService, HasId, ListParams, ListResult } from "./types"

function toQueryString(params: ListParams): string {
  const sp = new URLSearchParams()
  if (params.search) sp.set("search", params.search)
  if (params.page != null) sp.set("page", String(params.page))
  if (params.pageSize != null) sp.set("pageSize", String(params.pageSize))
  if (params.sortBy) sp.set("sortBy", params.sortBy)
  if (params.sortDir) sp.set("sortDir", params.sortDir)
  if (params.filters) {
    for (const [key, value] of Object.entries(params.filters)) {
      if (value != null && value !== "") sp.set(key, String(value))
    }
  }
  const qs = sp.toString()
  return qs ? `?${qs}` : ""
}

/**
 * Build a REST-backed CrudService for a resource collection.
 *
 * Assumes a conventional endpoint shape:
 *   GET    {resource}?search=&page=&pageSize=&sortBy=&sortDir=  -> ListResult<T>
 *   GET    {resource}/{id}                                      -> T
 *   POST   {resource}                                           -> T
 *   PUT    {resource}/{id}                                      -> T
 *   DELETE {resource}/{id}                                      -> void
 *   POST   {resource}/bulk-delete  { ids }                      -> void
 *
 * @example
 *   export const userService = createRestService<User, UserFormValues>(apiClient, "/users")
 */
export function createRestService<T extends HasId, FormValues, ID = string>(
  client: ApiClient,
  resource: string,
): CrudService<T, FormValues, ID> {
  return {
    list: (params) => client.get<ListResult<T>>(`${resource}${toQueryString(params)}`),
    get: (id) => client.get<T>(`${resource}/${String(id)}`),
    create: (values) => client.post<T>(resource, values),
    update: (id, values) => client.put<T>(`${resource}/${String(id)}`, values),
    remove: (id) => client.delete<void>(`${resource}/${String(id)}`),
    removeBulk: (ids) => client.post<void>(`${resource}/bulk-delete`, { ids }),
  }
}
