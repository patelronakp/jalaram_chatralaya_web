# Probietech Next.js Turborepo Starter Template

An enterprise-grade internal master template built with **Next.js App Router**, **Turborepo**, **pnpm workspaces**, **TypeScript**, **Tailwind**, and **shadcn/ui**. It ships a pre-built architecture — auth, layouts, theming, a reusable admin DataTable/CRUD system, and a shared API/data layer — so new projects start at feature work, not plumbing.

> **New here?** Start with **[docs/SETUP.md](docs/SETUP.md)** to configure the project, then read the guide for what you're building:
>
> - 🛠️ **[docs/SETUP.md](docs/SETUP.md)** — one-time setup (run once, then deletable).
> - 🗂️ **[docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)** — building admin features (CRUD, tables, auth, permissions).
> - 🌐 **[docs/WEB_GUIDE.md](docs/WEB_GUIDE.md)** — building the public website (components, styling, theming).

---

## Tech Stack

| Concern      | Choice                                                    |
| ------------ | --------------------------------------------------------- |
| Monorepo     | Turborepo + pnpm workspaces                               |
| Framework    | Next.js (App Router) + React 19 + TypeScript              |
| Styling      | Tailwind CSS + shadcn/ui + CSS-variable themes            |
| Server state | TanStack Query                                            |
| Tables       | TanStack Table (via `@repo/admin-ui` DataTable)           |
| Forms        | React Hook Form + Zod                                     |
| Client state | Zustand (auth session; UI/global state only)              |
| Auth         | Adapter pattern (Custom API / Supabase / Firebase / Mock) |

---

## Folder Structure

```
apps/
  main/                 # The Next.js app — (web) public site + /admin panel
    .env.example        # Env template — copy to .env.local (Next reads it from HERE)
    src/
      app/              # Routes: (web)/* public, admin/* console
      config/           # Single source of truth: env.ts, api.ts (shared client), auth.ts
      modules/          # Feature modules (e.g. users) — thin pages compose these
  storybook/            # Component workshop for the UI packages

packages/
  ui/                   # shadcn primitives (Button, Input, Dialog, Table, …) — shared
  admin-ui/             # Admin building blocks: AdminShell, DataTable, CrudTable, forms
  web-ui/               # Website blocks: SiteHeader/Footer, Container, Section, Hero, AuthCard
  crud/                 # Generic CRUD layer: services, query/mutation hooks, useCrudResource
  api-client/           # Typed fetch client (base URL + bearer token + envelope unwrap)
  auth-core/            # Auth adapter interface, Zustand auth store, provider, guards
  auth-custom-api/      # Custom REST API adapter
  auth-supabase/        # Supabase adapter (placeholder)
  auth-firebase/        # Firebase adapter (placeholder)
  types/                # Shared domain types (User, Session, Permission, ApiResponse)
  utils/                # cn, formatDate, sleep, …
  config/               # Shared tsconfig / eslint / tailwind presets

scripts/
  setup-project.ts      # One-time configurator (see docs/SETUP.md)
```

Path alias: `@/*` → `apps/main/src/*`. Workspace packages are imported as `@repo/<name>` (your scope after setup).

---

## Architecture

**Admin & web are separated by design.**

- Public site lives under `app/(web)/`; the admin console under `app/admin/`, each with its own layout and theme scope.
- `@repo/web-ui` powers the site; `@repo/admin-ui` powers the console. **Admin never imports from web-ui, and web never imports from admin-ui.** Shared primitives live in `@repo/ui`.

**Theme scopes** (CSS variables in `apps/main/src/app/globals.css`):

- `.theme-web` — applied in `(web)/layout.tsx`; meant to be **re-skinned per project**.
- `.theme-admin` — applied in `admin/layout.tsx`; a **stable, reusable** admin look.

**Auth is adapter-based.** The UI only ever calls `@repo/auth-core` (`useAuth`, guards, the Zustand store). The active provider is chosen in `apps/main/src/config/auth.ts`. See [docs/SETUP.md](docs/SETUP.md).

**Config is centralized** in `apps/main/src/config/` — `env.ts`, `api.ts` (one shared API client), `auth.ts`. Everything reads from here.

### Future: splitting into `apps/web` + `apps/admin`

Because layouts, themes, and packages are already decoupled, splitting later is mechanical:

1. Create `apps/web` and `apps/admin`.
2. Move `app/(web)/*` and `app/admin/*` into them.
3. Each app references the design packages it needs (`@repo/web-ui` / `@repo/admin-ui`).

---

## Commands

| Command          | Action                       |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Run the dev server           |
| `pnpm build`     | Build all packages + the app |
| `pnpm typecheck` | TypeScript validation        |
| `pnpm lint`      | ESLint                       |
| `pnpm lint:fix`  | ESLint with autofix          |
| `pnpm format`    | Prettier write               |
| `pnpm storybook` | Run the component workshop   |

For first-time configuration (`pnpm setup-project`), see **[docs/SETUP.md](docs/SETUP.md)**.
