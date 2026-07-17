You are a senior frontend architect with 15+ years of experience building scalable production-grade Next.js applications, design systems, admin panels, and reusable monorepo templates.

Your task is to create a high-quality internal master template for a Next.js project using Turborepo.

The goal is to create a reusable GitHub template repository for our organization. Whenever we start a new project, developers should be able to create a new repo from this template, run a setup command, choose project options, and start building actual business features without rebuilding structure, auth, layout, table, theme, linting, formatting, or basic architecture again.

Build this as a clean, scalable, production-ready Turborepo.

Core requirements:

1. Use Turborepo.
2. Use pnpm workspaces.
3. Use Next.js App Router.
4. Use TypeScript everywhere.
5. Use Tailwind CSS.
6. Use shadcn/ui design pattern.
7. Use TanStack Query.
8. Use TanStack Table.
9. Use Zustand only for client UI/global state where appropriate.
10. Use React Hook Form + Zod.
11. Use ESLint with strict rules.
12. Use Prettier with consistent formatting.
13. Use Husky + lint-staged.
14. Use path aliases correctly.
15. Use clean folder structure.
16. Avoid unnecessary coupling.
17. Keep the template modular and future-proof.

Repository structure should be:

apps/
main/

packages/
admin-ui/
web-ui/
auth-core/
auth-supabase/
auth-firebase/
auth-custom-api/
api-client/
config/
types/
utils/

The project should initially deploy as a single Next.js app:

example.com
example.com/login
example.com/register
example.com/admin
example.com/admin/login
example.com/admin/dashboard

But it should be designed so that in the future we can split it into:

apps/web
apps/admin

with minimal refactoring.

Inside apps/main, use route separation:

src/app/
(web)/
layout.tsx
page.tsx
login/
register/
profile/

admin/
layout.tsx
login/
dashboard/
users/
settings/

The public website and admin panel must have separate layouts, separate theme scopes, and separate design rules.

Theme requirements:

1. Admin panel theme should be stable and reusable across all projects.
2. Website theme should be easy to replace per project.
3. Use CSS variables for design tokens.
4. Admin layout should apply an admin theme class.
5. Web layout should apply a web theme class.
6. shadcn/ui components should use semantic tokens like background, foreground, primary, border, muted, card, etc.
7. Do not hardcode colors directly inside components unless absolutely necessary.

Auth requirements:

Create an adapter-based auth system.

Do not make the UI depend directly on Firebase, Supabase, or a custom API.

Create:

packages/auth-core/
src/
types.ts
create-auth.ts
auth-provider.tsx
use-auth.ts
guards.ts
permissions.ts
index.ts

packages/auth-supabase/
src/
adapter.ts
index.ts

packages/auth-firebase/
src/
adapter.ts
index.ts

packages/auth-custom-api/
src/
adapter.ts
index.ts

auth-core should define a generic AuthAdapter interface:

signIn
signUp
signOut
getSession
getCurrentUser
refreshSession
forgotPassword
resetPassword

The app should only use:

auth.signIn()
auth.signOut()
auth.getSession()
auth.getCurrentUser()

The login page, register page, guards, admin guard, and permission logic should work through auth-core only.

Create this app-level config:

apps/main/src/config/auth.ts

This file should select the active auth adapter.

Example:

import { createAuth } from "@repo/auth-core"
import { createSupabaseAuthAdapter } from "@repo/auth-supabase"

export const auth = createAuth(createSupabaseAuthAdapter())

The setup script should generate this file based on user selection.

Setup script requirements:

Create:

scripts/setup-project.ts

Add command:

pnpm setup-project

The script should ask:

1. Project name
2. Package name
3. Auth provider:
   - Supabase
   - Firebase
   - Custom API
   - None

4. Include admin panel?
5. Include web auth pages?
6. Use example user module?
7. Use example dashboard?

Based on selection, the script should:

1. Update package names.
2. Generate apps/main/src/config/auth.ts.
3. Generate .env.example.
4. Remove unused auth packages.
5. Remove unused example modules if not selected.
6. Update README with selected configuration.
7. Print next steps.

For example, if Supabase is selected, keep:

auth-core
auth-supabase

and remove:

auth-firebase
auth-custom-api

If Firebase is selected, keep:

auth-core
auth-firebase

and remove:

auth-supabase
auth-custom-api

If Custom API is selected, keep:

auth-core
auth-custom-api

and remove:

auth-supabase
auth-firebase

If None is selected, keep only auth-core with mock/no-op auth support and remove all provider adapters.

Admin panel requirements:

Create reusable admin UI package:

packages/admin-ui/

It should include:

1. AdminShell
2. AdminSidebar
3. AdminHeader
4. AdminBreadcrumbs
5. PageHeader
6. DataTable
7. DataTablePagination
8. DataTableToolbar
9. DataTableColumnHeader
10. DataTableViewOptions
11. ConfirmDialog
12. EmptyState
13. LoadingState
14. ErrorState
15. PermissionGuard
16. ThemeToggle

The admin DataTable must be generic and reusable.

Use TanStack Table and support:

1. Server-side pagination
2. Server-side sorting
3. Server-side search
4. Server-side filters
5. Row selection
6. Bulk actions
7. Column visibility
8. Loading state
9. Error state
10. Empty state
11. Custom row actions

Do not make one giant unmaintainable table component. Create a clean table system with small composable components.

Recommended structure:

packages/admin-ui/src/data-table/
data-table.tsx
data-table-pagination.tsx
data-table-toolbar.tsx
data-table-column-header.tsx
data-table-view-options.tsx
data-table-row-actions.tsx
use-data-table.ts
types.ts
index.ts

Feature module pattern:

Create example users module:

apps/main/src/modules/users/
components/
users-table.tsx
user-form.tsx
user-delete-dialog.tsx
columns.tsx
queries.ts
mutations.ts
service.ts
schema.ts
types.ts

The page should be thin:

apps/main/src/app/admin/users/page.tsx

It should only compose the feature:

export default function UsersPage() {
return <UsersTable />
}

Web UI requirements:

Create:

packages/web-ui/

It should include website-friendly reusable components:

1. SiteHeader
2. SiteFooter
3. Container
4. Section
5. HeroSection
6. AuthCard
7. Form components
8. EmptyState
9. LoadingState

Website UI must be separate from admin UI. Admin should not import from web-ui. Web should not import from admin-ui unless absolutely necessary.

Shared packages:

packages/api-client/

Create a reusable fetch client with:

1. Base URL support
2. Bearer token support
3. Error handling
4. Typed response helpers
5. Query helper utilities for TanStack Query

packages/types/

Shared global types.

packages/utils/

Shared utilities like cn, formatDate, sleep, object helpers, etc.

packages/config/

Shared ESLint config, TypeScript config, Prettier config, Tailwind preset if needed.

State management rules:

1. TanStack Query owns server state.
2. Zustand owns only client UI/global state.
3. URL query params should be used for table filters, search, page, and sorting where appropriate.
4. Do not store API response data in Zustand.
5. Do not mix business logic inside UI components.

Auth guard rules:

Website:

1. Public pages are open.
2. Login/register are guest-only.
3. Profile/account pages require logged-in user.

Admin:

1. /admin/login is public for guests.
2. /admin/\* requires authenticated admin user.
3. Admin pages must check role or permission.
4. Permissions should be centralized.
5. Do not scatter role checks randomly in components.

Create helpers:

requireAuth
requireGuest
requireAdmin
hasRole
hasPermission
canAccessAdmin

Quality requirements:

1. The project must run without TypeScript errors.
2. The project must run without ESLint errors.
3. The project must be formatted with Prettier.
4. All packages must have clean exports.
5. Use strict TypeScript.
6. Avoid any unless truly justified.
7. Avoid deeply nested components.
8. Use barrel exports carefully, not blindly.
9. Keep server and client components clearly separated.
10. Add "use client" only where needed.
11. Use accessible shadcn/ui patterns.
12. Use semantic naming.
13. Use scalable imports.
14. Add helpful comments only where architecture may not be obvious.
15. Do not over-engineer beyond the stated goal.

Linting and formatting requirements:

Set up:

1. ESLint
2. Prettier
3. eslint-config-next
4. eslint-config-prettier
5. typescript-eslint
6. eslint-plugin-import or equivalent import ordering
7. eslint-plugin-unused-imports
8. eslint-plugin-simple-import-sort
9. lint-staged
10. husky

Add scripts at root:

pnpm lint
pnpm lint:fix
pnpm typecheck
pnpm format
pnpm format:check
pnpm dev
pnpm build
pnpm setup-project

Add pre-commit hook:

1. Run lint-staged.
2. Format staged files.
3. Fix lint issues where possible.

README requirements:

Create a detailed README that explains:

1. What this template is.
2. How to create a new repo from it.
3. How to run setup-project.
4. How to select auth provider.
5. Folder structure.
6. How admin and web are separated.
7. How themes work.
8. How auth adapters work.
9. How to create a new feature module.
10. How to use the reusable DataTable.
11. How to add a new auth adapter.
12. How to split into apps/web and apps/admin in the future.
13. Development commands.
14. Code quality rules.

Important architecture decisions:

1. Use one Next.js app initially: apps/main.
2. Use /admin route inside the same app.
3. Keep admin and web logically separated.
4. Use Turborepo packages so future split is easy.
5. Use auth-core adapter pattern.
6. Use optional auth provider packages.
7. Use setup-project script to remove unused packages after repo creation.
8. Keep the admin theme fixed and reusable.
9. Keep the website theme replaceable per project.
10. Keep shared utilities in packages, not inside app folders.

Deliverables:

1. Fully working Turborepo.
2. Fully working Next.js app.
3. Admin layout.
4. Web layout.
5. Login page.
6. Register page.
7. Admin login page.
8. Admin dashboard page.
9. Example users table page.
10. Auth adapter architecture.
11. Supabase adapter placeholder implementation.
12. Firebase adapter placeholder implementation.
13. Custom API adapter placeholder implementation.
14. Setup script.
15. ESLint config.
16. Prettier config.
17. Husky + lint-staged.
18. README.
19. .env.example.
20. TypeScript path aliases.
21. shadcn/ui configured properly.
22. Tailwind configured properly.
23. TanStack Query provider.
24. Zustand store only where suitable.
25. Reusable DataTable system.

Before finishing:

1. Run install.
2. Run typecheck.
3. Run lint.
4. Run format check.
5. Run build.
6. Fix all errors.
7. Make sure no unused selected auth providers are imported into the main app.
8. Make sure the app does not directly import Firebase/Supabase/custom API except through the selected adapter.
9. Make sure setup-project works.
10. Make sure README instructions are accurate.

Do not create a basic demo. Create a serious production-grade internal starter template with clean architecture and reusable patterns.
