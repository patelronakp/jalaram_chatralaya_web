---
name: admin-crud
description: Scaffold a complete admin CRUD module (list/search/sort/paginate + create/edit/delete + bulk delete) in this Turborepo template. Use when the developer asks to "add a CRUD", "create an admin resource/module", "scaffold a new entity/table/page" (e.g. products, orders, categories) under apps/main/src/modules + app/admin. Generates files from fixed templates against the @repo/crud + @repo/admin-ui layer — no codebase exploration needed.
---

# admin-crud — generate a CRUD module

Generate a full admin CRUD from the reusable layer (`@repo/crud`, `@repo/admin-ui`). The reference implementation is `apps/main/src/modules/users/`. **Do NOT explore the repo or read the users module** — everything needed is in this file. Keep token usage minimal.

## Step 1 — Collect the spec (one message)

If the developer's request already contains the entity name, fields, and data source, skip asking and proceed. Otherwise ask them to fill this compact intake **in a single reply**:

```
Entity (singular, PascalCase): e.g. Product
Plural (optional, defaults to Entity+"s"):
Data source: mock | rest
  if rest → API resource path: e.g. /products
Search fields: e.g. name, sku
Add to admin sidebar? yes/no  (icon: a lucide-react name, e.g. Package)
Fields (one per line) — name : type : control : table
  type    = string | email | number | enum(a,b,c) | date | boolean
  control = text | number | email | select | none      (none = not in the form)
  table   = text | bold | badge | date | none           (none = not a column)
  e.g.
    name   : string        : text   : bold
    price  : number        : number : text
    status : enum(draft,published) : select : badge
    createdAt : date        : none   : date
```

Defaults if omitted: data source = `mock`, plural = `Entity` + `s`, an `id: string` field is always present, `createdAt` date column is included.

## Step 2 — Derive names

- `Entity` = PascalCase singular (Product) · `EntityPlural` (Products)
- `module` = kebab/lower plural (`products`) → folder `apps/main/src/modules/{module}/`
- `entity` = lower singular (`product`) · route = `/admin/{module}`
- Types/values type alias = `{Entity}` · form values = `{Entity}FormValues`

## Step 3 — Generate files

Create exactly these files. Substitute placeholders; map each spec field per the rules in **Field mapping** below.

### `apps/main/src/modules/{module}/types.ts`
```ts
export interface {Entity} {
  id: string
  // one line per field: `{fieldName}: {tsType}` (enum → union of literals)
  createdAt: string
}
```

### `apps/main/src/modules/{module}/schema.ts`
```ts
import * as z from "zod"

export const {entity}FormSchema = z.object({
  // one line per field whose control != none — see Field mapping (zod column)
})

export type {Entity}FormValues = z.infer<typeof {entity}FormSchema>
```

### `apps/main/src/modules/{module}/service.ts`
Mock data source:
```ts
import { createMockService } from "@repo/crud"

import type { {Entity}FormValues } from "./schema"
import type { {Entity} } from "./types"

const SEED_{ENTITY_UPPER}: {Entity}[] = [
  // 3 realistic example rows with id "1".."3"
]

export const {entity}Service = createMockService<{Entity}, {Entity}FormValues>({
  storageKey: "{module}",
  seed: SEED_{ENTITY_UPPER},
  searchFields: [/* quoted search field names */],
  timestampField: "createdAt",
})
```
REST data source (use instead when data source = rest):
```ts
import { createRestService } from "@repo/crud"

import { apiClient } from "@/config/api" // create this if it does not exist (see note)
import type { {Entity}FormValues } from "./schema"
import type { {Entity} } from "./types"

export const {entity}Service = createRestService<{Entity}, {Entity}FormValues>(apiClient, "{apiPath}")
```

### `apps/main/src/modules/{module}/{module}-crud.ts`
```ts
import { createCrudHooks } from "@repo/crud"

import type { {Entity}FormValues } from "./schema"
import { {entity}Service } from "./service"
import type { {Entity} } from "./types"

export const {module}Crud = createCrudHooks<{Entity}, {Entity}FormValues>("{module}", {entity}Service)
```

### `apps/main/src/modules/{module}/components/columns.tsx`
```ts
import { badgeColumn, dateColumn, textColumn } from "@repo/admin-ui"
import type { ColumnDef } from "@tanstack/react-table"

import type { {Entity} } from "../types"

export const {entity}Columns: ColumnDef<{Entity}>[] = [
  // one entry per field whose table != none — see Field mapping (column)
]
```

### `apps/main/src/modules/{module}/components/{entity}-form.tsx`
```tsx
"use client"

import { SelectField, TextField } from "@repo/admin-ui"
import React from "react"

export function {Entity}FormFields() {
  return (
    <>
      {/* one field per spec field whose control != none — see Field mapping (field) */}
    </>
  )
}
```

### `apps/main/src/modules/{module}/components/{entity}-table.tsx`
```tsx
"use client"

import { CrudTable } from "@repo/admin-ui"
import React from "react"

import { {entity}FormSchema, type {Entity}FormValues } from "../schema"
import type { {Entity} } from "../types"
import { {module}Crud } from "../{module}-crud"
import { {entity}Columns } from "./columns"
import { {Entity}FormFields } from "./{entity}-form"

export function {Entity}Table() {
  return (
    <CrudTable<{Entity}, {Entity}FormValues>
      crud={{module}Crud}
      columns={{entity}Columns}
      entityName="{Entity}"
      getRowName={(row) => row.{firstStringField}}
      schema={{entity}FormSchema}
      formDefaults={{ /* control != none fields → sensible empty default */ }}
      toFormValues={(row) => ({ /* control != none fields → row.<field> */ })}
      formFields={<{Entity}FormFields />}
      searchPlaceholder="{searchFields joined by " or "}"
    />
  )
}
```

### `apps/main/src/modules/{module}/index.ts`
```ts
export * from "./components/{entity}-table"
export * from "./schema"
export * from "./types"
```

### `apps/main/src/app/admin/{module}/page.tsx`
```tsx
import { {Entity}Table } from "@/modules/{module}"

export default function {Entity}Page() {
  return <{Entity}Table />
}
```

## Step 4 — Register the route (if sidebar = yes)

Edit `apps/main/src/app/admin/layout.tsx`:
1. Add the chosen icon to the existing `lucide-react` import.
2. Add one entry to the `sidebarItems` array:
   `{ label: "{EntityPlural}", href: "/admin/{module}", icon: <{Icon} className="h-4 w-4" /> }`

## Step 5 — Verify

Run `cd apps/main && pnpm typecheck`. Fix any errors. Report the created files and the route URL. Do not run the dev server unless asked.

---

## Field mapping (single source of truth)

For each spec field `name : type : control : table`:

| type | tsType (types.ts) | zod (schema.ts, if control != none) |
|---|---|---|
| string | `string` | `name: z.string().min(1, "Required")` |
| email | `string` | `name: z.string().email("Invalid email")` |
| number | `number` | `name: z.coerce.number().min(0)` |
| enum(a,b,c) | `"a" \| "b" \| "c"` | `name: z.enum(["a","b","c"])` |
| date | `string` | `name: z.string()` |
| boolean | `boolean` | `name: z.boolean()` |

| table | column entry (columns.tsx) |
|---|---|
| text | `textColumn<{Entity}>({ accessorKey: "name", title: "Name" })` |
| bold | `textColumn<{Entity}>({ accessorKey: "name", title: "Name", bold: true })` |
| date | `dateColumn<{Entity}>({ accessorKey: "name", title: "Name" })` |
| badge | `badgeColumn<{Entity}>({ accessorKey: "name", title: "Name", tones: { ... } })` |
| none | (omit) |

- `title` = field name Title-Cased.
- Badge `tones`: map each enum value to one of `success \| warning \| danger \| info \| purple \| neutral`. Pick sensibly (active/published/approved→success, pending/draft→warning or neutral, suspended/failed/rejected→danger, others→info/neutral).

| control | field entry ({entity}-form.tsx) | formDefaults | toFormValues |
|---|---|---|---|
| text | `<TextField name="x" label="X" />` | `x: ""` | `x: row.x` |
| email | `<TextField name="x" label="X" type="email" />` | `x: ""` | `x: row.x` |
| number | `<TextField name="x" label="X" type="number" />` | `x: 0` | `x: row.x` |
| select | `<SelectField name="x" label="X" options={[{ value: "a", label: "A" }, ...]} />` | `x: "<first option>"` | `x: row.x` |
| none | (omit from form, defaults, toFormValues) | — | — |

- `{firstStringField}` for `getRowName` = the first field with type string/email (fallback `id`).
- Wrap two related select/short fields in `<div className="grid grid-cols-2 gap-4">…</div>` for layout parity with the users form.

## Notes
- REST mode references `@/config/api` exporting an `apiClient` (`new ApiClient({ baseUrl, getToken })` from `@repo/api-client`). If it does not exist, create `apps/main/src/config/api.ts` and read `NEXT_PUBLIC_API_BASE_URL` from env; add it to `.env.example`.
- Need a custom layout instead of `CrudTable`? Use the `useCrudResource({module}Crud)` hook directly and compose `DataTable` + `EntityFormDialog` + `ConfirmDialog` (all from `@repo/admin-ui`).
- This skill only edits `apps/main` — never modify the reusable packages.
