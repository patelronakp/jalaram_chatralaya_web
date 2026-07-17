import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "gu"],
  defaultLocale: "gu",
  localePrefix: "as-needed", // Use "as-needed" to omit prefix for default locale
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
