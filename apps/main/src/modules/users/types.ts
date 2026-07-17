/** Mirrors the user object returned by the backend (`/admin/v1/users`). */
export interface UserModuleData {
  id: string
  first_name: string
  last_name: string
  email: string
  profile_image_url?: string
  is_admin: boolean
  is_guest: boolean
  /** Backend status code (1 = active). */
  status: number
  created_at: string
}
