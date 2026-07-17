# Web Guide

How to build the public website (`apps/main/src/app/(web)/*`). The site UI lives in `@repo/web-ui` and shares primitives with `@repo/ui`.

> **Golden rule:** web code **never imports from `@repo/admin-ui`**, and admin code never imports from `@repo/web-ui`. Anything truly shared is a primitive in `@repo/ui`.

---

## Where does a component go?

Decide by **reuse scope**:

| Put it in…                   | When…                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `apps/main/src/app/(web)/**` | It's specific to one page/route (a section only that page uses). Co-locate it.         |
| `packages/web-ui`            | It's a reusable **website** block used across pages (hero, feature grid, CTA, footer). |
| `packages/ui`                | It's a low-level **primitive** used by _both_ site and admin (button, input, dialog).  |

Rule of thumb: start page-local. Promote to `web-ui` the second a second page needs it. Promote to `ui` only if admin needs it too.

### Existing building blocks (`@repo/web-ui`)

`SiteHeader`, `SiteFooter`, `Container`, `Section`, `HeroSection`, `AuthCard`, plus form/state helpers. Compose pages from these:

```tsx
import { Container, Section, HeroSection } from "@repo/web-ui"

export default function HomePage() {
  return (
    <>
      <HeroSection title="…" subtitle="…" />
      <Section>
        <Container>{/* page content */}</Container>
      </Section>
    </>
  )
}
```

`Container` = max-width + horizontal padding. `Section` = vertical rhythm. Use them instead of ad-hoc `max-w-*`/`py-*` so spacing stays consistent.

---

## Styling conventions (generalized components)

Keep components themeable and consistent by following these:

1. **Use semantic tokens, never hardcoded colors.** Style with `bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-primary text-primary-foreground`, `bg-card`, etc. Avoid `text-gray-700`, `bg-[#fff]`. Tokens are what make the theme swappable (see [Theming](#theming)).
2. **Merge classes with `cn`** (`@repo/utils`) so consumers can override:
   ```tsx
   import { cn } from "@repo/utils"
   export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
     return (
       <span
         className={cn(
           "inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs",
           className,
         )}
         {...props}
       />
     )
   }
   ```
3. **Accept `className` (and spread `...props`)** on reusable components so they're composable.
4. **Variants via a prop + a lookup map.** Mirror the `Button` pattern in `@repo/ui` — a `variant`/`size` prop mapped to token-based class strings — so styles are centralized, not duplicated at call sites.
5. **`"use client"` only when needed** (state, effects, event handlers). Keep presentational/layout components as server components.
6. **Forms** use React Hook Form + Zod. `AuthCard` + the shared `Input`/`Label`/`Button` cover login/register; validate with a Zod schema and `zodResolver`.

---

## Theming

Theme tokens are CSS variables in `apps/main/src/app/globals.css`, scoped by class:

- `.theme-web` — applied in `(web)/layout.tsx`. **This is the per-project skin** — change `--primary`, `--radius`, etc. here and the whole site (and any token-based component) updates.
- `.theme-admin` — the admin scope; leave it stable.

To re-skin a project, edit the `.theme-web` block (and its `.theme-web.dark` variant). Because components use tokens, you rarely touch component files.

```css
.theme-web {
  --primary: 173 80% 40%; /* HSL channels */
  --ring: 173 80% 40%;
  --radius: 0.5rem;
}
```

Dark mode is the `.dark` class on `<html>` (toggled by `ThemeToggle`); tokens have `.dark` overrides.

---

## Auth on the website

Use `@repo/auth-core` (same as admin) — never a provider directly.

```tsx
import { useAuth } from "@repo/auth-core"
const { user, signIn, signOut, status } = useAuth()
```

Guards (from `@repo/auth-core`):

- Public marketing pages — no guard.
- `login` / `register` — `useRequireGuest("/")` (redirect signed-in users away).
- `profile` / account pages — `useRequireAuth("/login")`.

Data fetching uses the same shared `apiClient` (`@/config/api`) and TanStack Query as admin — the bearer token comes from the auth store automatically.

---

## Checklist for a new website component

- [ ] Lives at the right level (page-local → `web-ui` → `ui`).
- [ ] Uses semantic tokens, not hardcoded colors.
- [ ] Accepts `className` + spreads props; merges with `cn`.
- [ ] Variants via prop + map (if it has visual variants).
- [ ] `"use client"` only if it needs interactivity.
- [ ] Does **not** import from `@repo/admin-ui`.
