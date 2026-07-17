/**
 * Generic CRUD contracts shared by every admin resource.
 *
 * A "resource" is any entity exposed through a list + create + update + delete
 * surface (users, products, orders, ...). These types let us build the data
 * layer (services, query/mutation hooks, table-state orchestration) once and
 * reuse it per entity — the only entity-specific code becomes the schema, the
 * type, and the columns.
 */

/** Any record the CRUD layer can manage must be addressable by a stable id. */
export interface HasId {
  id: string
}

export type SortDir = "asc" | "desc"

/** Parameters sent to a list endpoint for server-side data fetching. */
export interface ListParams {
  search?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortDir?: SortDir
  /** Arbitrary column filters, e.g. `{ status: "active" }`. */
  filters?: Record<string, unknown>
}

/** Envelope returned by a list endpoint. */
export interface ListResult<T> {
  data: T[]
  /** Total number of rows matching the query (across all pages). */
  total: number
  /** Total number of pages for the current page size. */
  pageCount: number
}

/**
 * The single interface every data source must implement. Swap the
 * implementation (REST, mock, GraphQL, ...) without touching hooks or UI.
 */
export interface CrudService<T extends HasId, FormValues, ID = string> {
  list(params: ListParams): Promise<ListResult<T>>
  get(id: ID): Promise<T>
  create(values: FormValues): Promise<T>
  update(id: ID, values: FormValues): Promise<T>
  remove(id: ID): Promise<void>
  removeBulk(ids: ID[]): Promise<void>
}
