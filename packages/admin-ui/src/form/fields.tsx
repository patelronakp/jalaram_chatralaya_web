"use client"

import { Input, Label } from "@repo/ui"
import { cn } from "@repo/utils"
import React from "react"
import { useFormContext } from "react-hook-form"

/**
 * Context-bound form fields for use inside `EntityFormDialog`. They read RHF
 * state from context, so a feature form is declared as a flat list of fields
 * with no manual `register`/error wiring per input.
 */

function useFieldError(name: string): string | undefined {
  const {
    formState: { errors },
  } = useFormContext()
  const error = errors[name]
  return error?.message as string | undefined
}

interface FieldShellProps {
  name: string
  label: string
  className?: string
  children: React.ReactNode
}

function FieldShell({ name, label, className, children }: FieldShellProps) {
  const error = useFieldError(name)
  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export interface TextFieldProps {
  name: string
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  className?: string
}

export function TextField({ name, label, type = "text", placeholder, className }: TextFieldProps) {
  const { register } = useFormContext()
  return (
    <FieldShell name={name} label={label} className={className}>
      <Input id={name} type={type} placeholder={placeholder} {...register(name)} />
    </FieldShell>
  )
}

export interface SelectFieldProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  className?: string
}

export function SelectField({ name, label, options, className }: SelectFieldProps) {
  const { register } = useFormContext()
  return (
    <FieldShell name={name} label={label} className={className}>
      <select
        id={name}
        {...register(name)}
        className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}
