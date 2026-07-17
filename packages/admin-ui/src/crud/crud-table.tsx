"use client"

import type { CrudHooks, HasId } from "@repo/crud"
import { Button } from "@repo/ui"
import type { ColumnDef } from "@tanstack/react-table"
import { Plus, Trash } from "lucide-react"
import React, { useMemo } from "react"
import type { DefaultValues, FieldValues } from "react-hook-form"
import type { z } from "zod"

import { ConfirmDialog } from "../confirm-dialog"
import { type RowAction, rowActionsColumn, selectColumn } from "../data-table/columns"
import { DataTable } from "../data-table/data-table"
import { type EntityFormFields, EntityFormDialog } from "../form/entity-form-dialog"
import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource"

export interface CrudTableProps<T extends HasId, FormValues extends FieldValues> {
  /** Hooks bundle from `createCrudHooks`. */
  crud: CrudHooks<T, FormValues>

  /** Data columns only — `select` and `actions` columns are added automatically. */
  columns: ColumnDef<T>[]

  /** Singular display name, e.g. "User". Used in titles and confirm copy. */
  entityName: string
  /** Plural display name, defaults to `${entityName}s`. */
  entityNamePlural?: string
  /** Human label for a row in the delete prompt, e.g. `(u) => u.name`. */
  getRowName?: (item: T) => string

  // --- form ---
  /** Zod schema for edit mode (and create if `createSchema` is omitted). */
  schema: z.ZodType<FormValues>
  /** Optional schema used only on create (e.g. to require a password). */
  createSchema?: z.ZodType<FormValues>
  /** Field defaults for create mode. */
  formDefaults: DefaultValues<FormValues>
  /** Map an existing row to form values for edit mode. */
  toFormValues: (item: T) => FormValues
  /**
   * Fields rendered inside the form. Pass a function for mode-aware fields,
   * e.g. a create-only password: `({ isEditing }) => ...`.
   */
  formFields: EntityFormFields

  // --- table chrome ---
  searchPlaceholder?: string
  createLabel?: string
  pageSize?: number
  resourceOptions?: UseCrudResourceOptions

  /** Set false to hide row selection + bulk delete. */
  enableBulkDelete?: boolean
  /** Extra per-row dropdown actions (appended between Edit and Delete). */
  extraRowActions?: RowAction<T>[]
}

/**
 * End-to-end admin CRUD table. Composes `useCrudResource` + `DataTable` +
 * `EntityFormDialog` + `ConfirmDialog`. A feature page becomes a single
 * declarative call — supply columns, a schema, and field components.
 */
export function CrudTable<T extends HasId, FormValues extends FieldValues>({
  crud,
  columns,
  entityName,
  entityNamePlural,
  getRowName,
  schema,
  createSchema,
  formDefaults,
  toFormValues,
  formFields,
  searchPlaceholder,
  createLabel,
  pageSize,
  resourceOptions,
  enableBulkDelete = true,
  extraRowActions,
}: CrudTableProps<T, FormValues>) {
  const r = useCrudResource<T, FormValues>(crud, { pageSize, ...resourceOptions })
  const plural = entityNamePlural ?? `${entityName}s`

  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    const cols: ColumnDef<T>[] = []
    if (enableBulkDelete) cols.push(selectColumn<T>())
    cols.push(...columns)
    cols.push(
      rowActionsColumn<T>({
        onEdit: r.openEdit,
        onDelete: r.openDelete,
        extraActions: extraRowActions,
      }),
    )
    return cols
  }, [columns, enableBulkDelete, extraRowActions, r.openEdit, r.openDelete])

  const deleteName = r.deletingItem && getRowName ? getRowName(r.deletingItem) : undefined

  return (
    <div className="space-y-4">
      <DataTable
        columns={tableColumns}
        data={r.items}
        loading={r.isLoading}
        isFetching={r.isFetching}
        error={r.error}
        pageCount={r.pageCount}
        pagination={r.pagination}
        onPaginationChange={r.setPagination}
        sorting={r.sorting}
        onSortingChange={r.setSorting}
        searchKey={searchPlaceholder ?? entityName.toLowerCase()}
        searchValue={r.search}
        onSearchChange={r.setSearch}
        toolbarActions={
          <Button onClick={r.openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            {createLabel ?? `Add ${entityName}`}
          </Button>
        }
        bulkActions={
          enableBulkDelete
            ? (selectedRows) => (
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => r.openBulkDelete(selectedRows.map((row) => row.id))}
                >
                  <Trash className="h-3.5 w-3.5" />
                  Delete Selected
                </Button>
              )
            : undefined
        }
      />

      <EntityFormDialog<FormValues>
        open={r.isFormOpen}
        onClose={r.closeForm}
        onSubmit={r.submitForm}
        schema={schema}
        createSchema={createSchema}
        defaultValues={formDefaults}
        values={r.editingItem ? toFormValues(r.editingItem) : undefined}
        title={r.isEditing ? `Edit ${entityName}` : `Add ${entityName}`}
        submitting={r.isSubmitting}
        submitLabel={`Save ${entityName}`}
      >
        {formFields}
      </EntityFormDialog>

      <ConfirmDialog
        isOpen={r.deletingItem !== null}
        onClose={r.closeDelete}
        onConfirm={r.confirmDelete}
        isDestructive
        title={`Delete ${entityName}`}
        description={`Are you sure you want to delete ${
          deleteName ? `'${deleteName}'` : `this ${entityName.toLowerCase()}`
        }? This action is irreversible.`}
        confirmText="Delete"
      />

      <ConfirmDialog
        isOpen={r.isBulkDeleteOpen}
        onClose={r.closeBulkDelete}
        onConfirm={r.confirmBulkDelete}
        isDestructive
        title={`Delete Selected ${plural}`}
        description={`Are you sure you want to delete all selected ${plural.toLowerCase()}? This action is irreversible.`}
        confirmText="Delete"
      />
    </div>
  )
}
