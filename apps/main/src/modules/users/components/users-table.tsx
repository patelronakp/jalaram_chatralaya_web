"use client"

import { CrudTable } from "@repo/admin-ui"
import React from "react"

import { userCreateSchema, userFormSchema, type UserFormValues } from "../schema"
import type { UserModuleData } from "../types"
import { usersCrud } from "../users-crud"
import { userColumns } from "./columns"
import { UserFormFields } from "./user-form"

/**
 * Users CRUD: server-side list/search/paginate + create/edit/delete + bulk
 * delete. Talks to the real backend when an API base URL is configured, and to
 * a localStorage mock otherwise (see modules/users/service.ts).
 */
export function UsersTable() {
  return (
    <CrudTable<UserModuleData, UserFormValues>
      crud={usersCrud}
      columns={userColumns}
      entityName="User"
      getRowName={(user) => `${user.first_name} ${user.last_name}`.trim()}
      schema={userFormSchema}
      createSchema={userCreateSchema}
      formDefaults={{
        first_name: "",
        last_name: "",
        email: "",
        role: "user",
        status: "active",
        password: "",
      }}
      toFormValues={(user) => ({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.is_admin ? "admin" : user.is_guest ? "guest" : "user",
        status: user.status === 1 ? "active" : "inactive",
      })}
      formFields={({ isEditing }) => <UserFormFields showPassword={!isEditing} />}
      searchPlaceholder="name or email"
    />
  )
}
