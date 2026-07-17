"use client"

import { type CrudHooks, type HasId, type ListParams, useDebouncedValue } from "@repo/crud"
import type { PaginationState, SortingState } from "@tanstack/react-table"
import { useCallback, useMemo, useState } from "react"

export interface UseCrudResourceOptions {
  pageSize?: number
  searchDebounceMs?: number
}

/**
 * Orchestrates the full table + create/edit/delete lifecycle for a resource.
 *
 * Owns: server-side list params (debounced search, pagination, sorting), the
 * list query, all four mutations, and the open/close state for the form,
 * single-delete, and bulk-delete dialogs. A feature module wires the returned
 * values into `DataTable`, `EntityFormDialog`, and `ConfirmDialog` — or just
 * uses the `CrudTable` component, which does that wiring for you.
 */
export function useCrudResource<T extends HasId, FormValues>(
  crud: CrudHooks<T, FormValues>,
  options: UseCrudResourceOptions = {},
) {
  const { pageSize = 10, searchDebounceMs = 300 } = options

  // --- list / table state (server-side) ---
  const [search, setSearchValue] = useState("")
  const debouncedSearch = useDebouncedValue(search, searchDebounceMs)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize })
  const [sorting, setSorting] = useState<SortingState>([])

  const listParams = useMemo<ListParams>(
    () => ({
      search: debouncedSearch || undefined,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sortBy: sorting[0]?.id,
      sortDir: sorting[0] ? (sorting[0].desc ? "desc" : "asc") : undefined,
    }),
    [debouncedSearch, pagination, sorting],
  )

  const listQuery = crud.useList(listParams)

  // Typing search resets to the first page.
  const setSearch = useCallback((value: string) => {
    setSearchValue(value)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [])

  // --- mutations ---
  const createMutation = crud.useCreate()
  const updateMutation = crud.useUpdate()
  const deleteMutation = crud.useDelete()
  const bulkDeleteMutation = crud.useBulkDelete()

  // --- create/edit form dialog ---
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)

  const openCreate = useCallback(() => {
    setEditingItem(null)
    setIsFormOpen(true)
  }, [])

  const openEdit = useCallback((item: T) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }, [])

  const closeForm = useCallback(() => {
    setIsFormOpen(false)
    setEditingItem(null)
  }, [])

  const submitForm = useCallback(
    async (values: FormValues) => {
      if (editingItem) {
        await updateMutation.mutateAsync({ id: editingItem.id, values })
      } else {
        await createMutation.mutateAsync(values)
      }
      closeForm()
    },
    [editingItem, updateMutation, createMutation, closeForm],
  )

  // --- single delete dialog ---
  const [deletingItem, setDeletingItem] = useState<T | null>(null)
  const openDelete = useCallback((item: T) => setDeletingItem(item), [])
  const closeDelete = useCallback(() => setDeletingItem(null), [])
  const confirmDelete = useCallback(async () => {
    if (!deletingItem) return
    await deleteMutation.mutateAsync(deletingItem.id)
    setDeletingItem(null)
  }, [deletingItem, deleteMutation])

  // --- bulk delete dialog ---
  const [bulkIds, setBulkIds] = useState<string[] | null>(null)
  const openBulkDelete = useCallback((ids: string[]) => setBulkIds(ids), [])
  const closeBulkDelete = useCallback(() => setBulkIds(null), [])
  const confirmBulkDelete = useCallback(async () => {
    if (!bulkIds) return
    await bulkDeleteMutation.mutateAsync(bulkIds)
    setBulkIds(null)
  }, [bulkIds, bulkDeleteMutation])

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return {
    // data
    items: listQuery.data?.data ?? [],
    total: listQuery.data?.total ?? 0,
    pageCount: listQuery.data?.pageCount ?? 0,
    isLoading: listQuery.isLoading,
    isFetching: listQuery.isFetching,
    error: listQuery.error ? (listQuery.error as Error).message : null,

    // table controls (feed straight into DataTable)
    search,
    setSearch,
    pagination,
    setPagination,
    sorting,
    setSorting,

    // form
    isFormOpen,
    editingItem,
    isEditing: editingItem !== null,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    isSubmitting,

    // single delete
    deletingItem,
    openDelete,
    closeDelete,
    confirmDelete,

    // bulk delete
    bulkIds,
    isBulkDeleteOpen: bulkIds !== null,
    openBulkDelete,
    closeBulkDelete,
    confirmBulkDelete,
  }
}

export type CrudResource<T extends HasId, FormValues> = ReturnType<
  typeof useCrudResource<T, FormValues>
>
