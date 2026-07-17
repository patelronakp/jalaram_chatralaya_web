"use client"

import { AuthProvider } from "@repo/auth-core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"

import { auth } from "@/config/auth"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider adapter={auth}>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
