"use client"

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { CrudService, HasId, ListParams, ListResult } from "./types"

/** Stable, hierarchical query keys for a resource (TanStack Query best practice). */
export interface CrudKeys {
  all: readonly [string]
  lists: () => readonly [string, "list"]
  list: (params: ListParams) => readonly [string, "list", ListParams]
  detail: (id: string) => readonly [string, "detail", string]
}

export function createCrudKeys(resource: string): CrudKeys {
  return {
    all: [resource] as const,
    lists: () => [resource, "list"] as const,
    list: (params: ListParams) => [resource, "list", params] as const,
    detail: (id: string) => [resource, "detail", id] as const,
  }
}

/**
 * Build the full TanStack Query hook set for a resource from its service.
 * Replaces hand-written `queries.ts` + `mutations.ts` per entity.
 *
 * @example
 *   export const usersCrud = createCrudHooks<User, UserFormValues>("users", userService)
 *   // usersCrud.useList(params), .useCreate(), .useUpdate(), .useDelete(), .useBulkDelete()
 */
export function createCrudHooks<T extends HasId, FormValues>(
  resource: string,
  service: CrudService<T, FormValues>,
) {
  const keys = createCrudKeys(resource)

  function useList(params: ListParams = {}) {
    return useQuery<ListResult<T>>({
      queryKey: keys.list(params),
      queryFn: () => service.list(params),
      // Keep showing the previous page while the next one loads (no flicker).
      placeholderData: keepPreviousData,
    })
  }

  function useDetail(id: string | null | undefined) {
    return useQuery<T>({
      queryKey: keys.detail(String(id)),
      queryFn: () => service.get(String(id)),
      enabled: id != null,
    })
  }

  function useCreate() {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (values: FormValues) => service.create(values),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.lists() }),
    })
  }

  function useUpdate() {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, values }: { id: string; values: FormValues }) =>
        service.update(id, values),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.lists() }),
    })
  }

  function useDelete() {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (id: string) => service.remove(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.lists() }),
    })
  }

  function useBulkDelete() {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (ids: string[]) => service.removeBulk(ids),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.lists() }),
    })
  }

  return { keys, useList, useDetail, useCreate, useUpdate, useDelete, useBulkDelete }
}

export type CrudHooks<T extends HasId, FormValues> = ReturnType<
  typeof createCrudHooks<T, FormValues>
>
