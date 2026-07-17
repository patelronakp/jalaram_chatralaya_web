import { createCrudHooks } from "@repo/crud"

import type { UserFormValues } from "./schema"
import { userService } from "./service"
import type { UserModuleData } from "./types"

/**
 * The full query/mutation hook set for the users resource — replaces the old
 * hand-written queries.ts + mutations.ts. Exposes:
 *   usersCrud.useList(params) / useDetail(id)
 *   usersCrud.useCreate() / useUpdate() / useDelete() / useBulkDelete()
 */
export const usersCrud = createCrudHooks<UserModuleData, UserFormValues>("users", userService)
