import * as z from "zod"

/** Edit-mode schema. Password is optional (not changed here). */
export const userFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user", "guest"]),
  status: z.enum(["active", "inactive"]),
  password: z.string().optional(),
})

/** Create-mode schema. Password is required by the backend. */
export const userCreateSchema = userFormSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type UserFormValues = z.infer<typeof userFormSchema>
