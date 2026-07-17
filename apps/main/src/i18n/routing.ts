import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "gu"],
  defaultLocale: "gu",
  localePrefix: "always", // Use "always" or "as-needed". "always" matches the user's step: "Provide links to /en and /gu routes"
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
