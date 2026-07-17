import type { CrudService, HasId, ListParams, ListResult } from "./types"

export interface MockServiceOptions<T extends HasId, FormValues> {
  /** localStorage key used to persist the collection in the browser. */
  storageKey: string
  /** Initial rows used to seed an empty store. */
  seed: T[]
  /** Fields scanned by the `search` param (case-insensitive substring match). */
  searchFields?: (keyof T)[]
  /** Simulated network latency in ms (defaults to 400). */
  delay?: number
  /** Generate an id for newly created rows. */
  makeId?: () => string
  /** Stamp set on create (and the field name used). Defaults to `createdAt`. */
  timestampField?: keyof T
  /**
   * Map form values to stored entity fields on create/update. Use when the form
   * shape differs from the entity shape (e.g. a `role` select that becomes
   * `is_admin`/`is_guest` booleans). Defaults to a shallow copy.
   */
  mapValues?: (values: FormValues) => Partial<T>
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Build a localStorage-backed CrudService — the default for template/demo mode
 * so the UI works end-to-end with no backend. Swap to `createRestService` once
 * a real API exists; the hooks and UI never change.
 *
 * Implements server-style `list` semantics (search, sort, pagination) against
 * the in-memory collection so it exercises the exact same code paths as a real
 * paginated API.
 *
 * @example
 *   export const userService = createMockService<User, UserFormValues>({
 *     storageKey: "users",
 *     seed: SEED_USERS,
 *     searchFields: ["name", "email"],
 *   })
 */
export function createMockService<T extends HasId, FormValues>(
  options: MockServiceOptions<T, FormValues>,
): CrudService<T, FormValues> {
  const {
    storageKey,
    seed,
    searchFields = [],
    delay = 400,
    makeId = () => Math.random().toString(36).slice(2, 11),
    timestampField,
    mapValues = (values: FormValues) => values as unknown as Partial<T>,
  } = options

  const key = `mock_${storageKey}`

  function read(): T[] {
    if (typeof window === "undefined") return seed
    const stored = window.localStorage.getItem(key)
    if (!stored) {
      window.localStorage.setItem(key, JSON.stringify(seed))
      return seed
    }
    try {
      return JSON.parse(stored) as T[]
    } catch {
      return seed
    }
  }

  function write(rows: T[]): void {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(rows))
    }
  }

  return {
    list: async (params: ListParams): Promise<ListResult<T>> => {
      await sleep(delay)
      let rows = read()

      if (params.search && searchFields.length) {
        const needle = params.search.toLowerCase()
        rows = rows.filter((row) =>
          searchFields.some((field) =>
            String(row[field] ?? "")
              .toLowerCase()
              .includes(needle),
          ),
        )
      }

      if (params.filters) {
        for (const [field, value] of Object.entries(params.filters)) {
          if (value == null || value === "") continue
          rows = rows.filter(
            (row) => String((row as Record<string, unknown>)[field]) === String(value),
          )
        }
      }

      if (params.sortBy) {
        const { sortBy, sortDir = "asc" } = params
        const dir = sortDir === "asc" ? 1 : -1
        rows = [...rows].sort((a, b) => {
          const av = (a as Record<string, unknown>)[sortBy]
          const bv = (b as Record<string, unknown>)[sortBy]
          if (av == null) return 1
          if (bv == null) return -1
          return av < bv ? -dir : av > bv ? dir : 0
        })
      }

      const total = rows.length
      const page = params.page ?? 1
      const pageSize = params.pageSize ?? (total || 1)
      const pageCount = Math.max(1, Math.ceil(total / pageSize))
      const start = (page - 1) * pageSize
      const data = rows.slice(start, start + pageSize)

      return { data, total, pageCount }
    },

    get: async (id: string): Promise<T> => {
      await sleep(delay)
      const row = read().find((r) => r.id === id)
      if (!row) throw new Error(`${storageKey} ${id} not found`)
      return row
    },

    create: async (values: FormValues): Promise<T> => {
      await sleep(delay)
      const rows = read()
      const row = {
        ...mapValues(values),
        id: makeId(),
        ...(timestampField ? { [timestampField]: new Date().toISOString() } : {}),
      } as T
      rows.push(row)
      write(rows)
      return row
    },

    update: async (id: string, values: FormValues): Promise<T> => {
      await sleep(delay)
      const rows = read()
      const idx = rows.findIndex((r) => r.id === id)
      if (idx === -1) throw new Error(`${storageKey} ${id} not found`)
      const updated = { ...rows[idx], ...mapValues(values) } as T
      rows[idx] = updated
      write(rows)
      return updated
    },

    remove: async (id: string): Promise<void> => {
      await sleep(delay)
      write(read().filter((r) => r.id !== id))
    },

    removeBulk: async (ids: string[]): Promise<void> => {
      await sleep(delay)
      write(read().filter((r) => !ids.includes(r.id)))
    },
  }
}
