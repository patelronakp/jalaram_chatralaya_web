"use client"

import { SelectField, TextField } from "@repo/admin-ui"
import React from "react"

/**
 * Field set for the user create/edit form. The password field is shown only on
 * create (the backend requires it there and forbids changing it on edit here).
 */
export function UserFormFields({ showPassword }: { showPassword: boolean }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextField name="first_name" label="First Name" placeholder="Jane" />
        <TextField name="last_name" label="Last Name" placeholder="Doe" />
      </div>

      <TextField name="email" label="Email Address" type="email" placeholder="jane@example.com" />

      {showPassword && (
        <TextField name="password" label="Password" type="password" placeholder="••••••••" />
      )}

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="role"
          label="Access Role"
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
            { value: "guest", label: "Guest" },
          ]}
        />
        <SelectField
          name="status"
          label="Status"
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
      </div>
    </>
  )
}
