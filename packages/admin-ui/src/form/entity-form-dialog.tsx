"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui"
import React from "react"
import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form"
import type { z } from "zod"

/** Context passed to mode-aware field renderers. */
export interface EntityFormContext {
  isEditing: boolean
}

export type EntityFormFields = React.ReactNode | ((ctx: EntityFormContext) => React.ReactNode)

export interface EntityFormDialogProps<TValues extends FieldValues> {
  open: boolean
  onClose: () => void
  onSubmit: SubmitHandler<TValues>
  /** Schema used in edit mode (and create mode if `createSchema` is omitted). */
  schema: z.ZodType<TValues>
  /** Optional schema used only in create mode (e.g. to require a password). */
  createSchema?: z.ZodType<TValues>
  /** Field defaults for create mode. */
  defaultValues: DefaultValues<TValues>
  /** When provided, the dialog is in edit mode and seeds with these values. */
  values?: TValues
  title: string
  description?: string
  submitting?: boolean
  submitLabel?: string
  /**
   * Fields bound via FormProvider. Pass a function to render mode-aware fields,
   * e.g. show a password field only on create: `({ isEditing }) => ...`.
   */
  children: EntityFormFields
  className?: string
}

/**
 * Reusable create/edit dialog. Owns the React Hook Form + Zod wiring so a
 * feature module only supplies a schema, defaults, and fields.
 *
 * The form body mounts fresh each time the dialog opens (it lives inside the
 * Radix content, which unmounts on close), so values and the active schema are
 * always correct with no manual reset.
 */
export function EntityFormDialog<TValues extends FieldValues>({
  open,
  onClose,
  onSubmit,
  schema,
  createSchema,
  defaultValues,
  values,
  title,
  description,
  submitting = false,
  submitLabel = "Save",
  children,
  className,
}: EntityFormDialogProps<TValues>) {
  const isEditing = values != null
  const activeSchema = isEditing ? schema : (createSchema ?? schema)
  const initialValues = (values ?? defaultValues) as DefaultValues<TValues>

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <DialogContent className={className ?? "max-w-md"}>
        <DialogHeader className="mb-4 border-b pb-4">
          <DialogTitle>{title}</DialogTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </DialogHeader>

        <EntityFormBody
          isEditing={isEditing}
          schema={activeSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          submitting={submitting}
          submitLabel={submitLabel}
          onClose={onClose}
        >
          {children}
        </EntityFormBody>
      </DialogContent>
    </Dialog>
  )
}

interface EntityFormBodyProps<TValues extends FieldValues> {
  isEditing: boolean
  schema: z.ZodType<TValues>
  initialValues: DefaultValues<TValues>
  onSubmit: SubmitHandler<TValues>
  submitting: boolean
  submitLabel: string
  onClose: () => void
  children: EntityFormFields
}

function EntityFormBody<TValues extends FieldValues>({
  isEditing,
  schema,
  initialValues,
  onSubmit,
  submitting,
  submitLabel,
  onClose,
  children,
}: EntityFormBodyProps<TValues>) {
  const form = useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {typeof children === "function" ? children({ isEditing }) : children}

        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
