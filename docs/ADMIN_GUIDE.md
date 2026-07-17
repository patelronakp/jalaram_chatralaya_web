# Admin Guide

How to build features in the admin console (`apps/main/src/app/admin/*`). The admin UI lives in `@repo/admin-ui`; the data layer in `@repo/crud`; auth in `@repo/auth-core`.

---

## Module pattern

Business features live in **feature modules** under `apps/main/src/modules/<name>/`, and routes stay thin:

```
modules/users/
  types.ts                 # row shape (entity)
  schema.ts                # Zod form schema + inferred values type
  service.ts               # data source (CrudService) — real API and/or mock
  users-crud.ts            # createCrudHooks(...) → query/mutation hooks
  components/
    columns.tsx            # data columns only
    user-form.tsx          # form fields
    users-table.tsx        # composes CrudTable
  index.ts
```

```tsx
// app/admin/users/page.tsx — the route only composes the feature
import { UsersTable } from "@/modules/users"
export default function UsersPage() {
  return <UsersTable />
}
```

Register the route in the sidebar array in `app/admin/layout.tsx`.

> ⚡ **Shortcut:** run the **`/admin-crud`** skill to scaffold a whole module from a short spec (entity, fields, data source). It writes all the files below for you.

---

## Creating a CRUD module (the recipe)

A full admin CRUD — server-side list, search, sort, pagination, create, edit, single + bulk delete — comes from the reusable layer. **Only the type, schema, columns, and form fields are per-entity.** Example: adding `products`.

**1. `types.ts`** (must have `id`):

```ts
export interface Product {
  id: string
  name: string
  price: number
  status: "draft" | "published"
  createdAt: string
}
```

**2. `schema.ts`:**

```ts
import * as z from "zod"
export const productFormSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().min(0),
  status: z.enum(["draft", "published"]),
})
export type ProductFormValues = z.infer<typeof productFormSchema>
```

**3. `service.ts`** — choose a data source (no CRUD logic to write):

```ts
import { createMockService } from "@repo/crud" // demo / localStorage
// import { createRestService } from "@repo/crud"  // real backend

export const productService = createMockService<Product, ProductFormValues>({
  storageKey: "products",
  seed: SEED_PRODUCTS,
  searchFields: ["name"],
  timestampField: "createdAt",
  // mapValues: (v) => ({ ... })  // when form shape ≠ entity shape
})
// Real API: createRestService<Product, ProductFormValues>(apiClient, "/products")
```

For a backend whose pagination/response shape differs from the default convention, write a small custom `CrudService` (see `modules/users/service.ts`, which maps `items/total/pages` + `page_size` and supports a mock fallback).

**4. `products-crud.ts`** (one line):

```ts
import { createCrudHooks } from "@repo/crud"
export const productsCrud = createCrudHooks<Product, ProductFormValues>("products", productService)
```

**5. `components/columns.tsx`** — just the unique columns:

```tsx
import { badgeColumn, dateColumn, textColumn } from "@repo/admin-ui"
export const productColumns = [
  textColumn<Product>({ accessorKey: "name", title: "Name", bold: true }),
  badgeColumn<Product>({
    accessorKey: "status",
    title: "Status",
    tones: { published: "success", draft: "neutral" },
  }),
  dateColumn<Product>({ accessorKey: "createdAt", title: "Created" }),
]
```

**6. `components/product-form.tsx`** — fields (RHF + validation handled by the dialog):

```tsx
import { SelectField, TextField } from "@repo/admin-ui"
export function ProductFormFields() {
  return (
    <>
      <TextField name="name" label="Name" />
      <TextField name="price" label="Price" type="number" />
      <SelectField
        name="status"
        label="Status"
        options={[
          { value: "draft", label: "Draft" },
          { value: "published", label: "Published" },
        ]}
      />
    </>
  )
}
```

**7. `components/products-table.tsx`** — one declarative call:

```tsx
"use client"
import { CrudTable } from "@repo/admin-ui"
import { productFormSchema, type ProductFormValues } from "../schema"
import type { Product } from "../types"
import { productsCrud } from "../products-crud"
import { productColumns } from "./columns"
import { ProductFormFields } from "./product-form"

export function ProductsTable() {
  return (
    <CrudTable<Product, ProductFormValues>
      crud={productsCrud}
      columns={productColumns}
      entityName="Product"
      getRowName={(p) => p.name}
      schema={productFormSchema}
      formDefaults={{ name: "", price: 0, status: "draft" }}
      toFormValues={(p) => ({ name: p.name, price: p.price, status: p.status })}
      formFields={<ProductFormFields />}
    />
  )
}
```

### Need custom layout?

Drop `CrudTable` and use `useCrudResource(crud)` directly — it returns the list query, table state (`pagination`/`sorting`/`search`), and all dialog open/close + submit/confirm handlers — then compose `DataTable`, `EntityFormDialog`, and `ConfirmDialog` yourself.

---

## DataTable system (`@repo/admin-ui`)

Built on TanStack Table; runs in two modes:

- **Client mode** (default): pass `columns` + `data`; sort/page/filter in-memory.
- **Server mode**: pass controlled `pagination` + `onPaginationChange` (+ `sorting`/`onSortingChange` + `pageCount`). `useCrudResource` wires this.

Building blocks:

- `useDataTable` — the table instance (client/manual switch).
- Column factories — `selectColumn`, `textColumn`, `dateColumn`, `badgeColumn`, `rowActionsColumn` (never hand-roll the checkbox / "…" columns).
- `DataTableColumnHeader`, `DataTablePagination`, `DataTableToolbar`.
- Bulk action bar appears automatically when rows are selected.

For a derived/computed column (e.g. full name from `first_name`+`last_name`), use a TanStack `accessorFn` column — see `modules/users/components/columns.tsx`.

---

## Admin UI catalog

Layout & chrome: `AdminShell` (collapsible sidebar + header), `AdminSidebar`, `AdminHeader`, `AdminBreadcrumbs`, `PageHeader`, `ThemeToggle`.
States: `EmptyState`, `LoadingState`, `ErrorState`.
Dialogs/forms: `ConfirmDialog`, `EntityFormDialog`, `TextField`, `SelectField`.
Access: `PermissionGuard`.

---

## Auth, guards & the auth store

The app binds only to `@repo/auth-core` — never to a provider directly.

```tsx
import { useAuth } from "@repo/auth-core"
const { user, status, isLoading, signIn, signOut } = useAuth()
```

**Single source of truth:** the session (`user`, `token`, `status`) lives in a persisted Zustand store. Read the token outside React (e.g. for a one-off API call) with `getAuthToken()`:

```ts
import { getAuthToken } from "@repo/auth-core"
const token = getAuthToken() // the shared apiClient already uses this
```

**Route guards** (from `@repo/auth-core`) — use in layouts/pages, don't scatter role checks:

- `useRequireAuth(redirect)` — must be logged in.
- `useRequireGuest(redirect)` — guests only (login/register).
- `useRequireAdmin(redirect)` — logged in **and** admin (used by `app/admin/layout.tsx`).

**Permissions** are centralized in `packages/auth-core/src/permissions.ts` (`hasRole`, `hasPermission`, `canAccessAdmin`). Gate UI with `<PermissionGuard permission="users:write">…</PermissionGuard>` rather than inline role checks.

---

## State rules

- **TanStack Query** owns server state (lists/entities) — via the `crud` hooks.
- **Zustand** owns only the auth session + UI/global state. Don't put API response data in Zustand.
- Table filters/search/page/sort are driven through `useCrudResource` (and can be lifted to URL params if needed).
