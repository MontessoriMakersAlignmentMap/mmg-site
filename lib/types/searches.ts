export type Search = {
  id: string
  school_name: string
  school_slug: string
  school_website: string | null
  school_logo_url: string | null
  school_blurb: string | null
  active: boolean
  created_at: string
  roles?: SearchRole[]
}

export type SearchRole = {
  id: string
  search_id: string
  title: string
  role_slug: string
  description: string | null
  apply_method: 'upload' | 'link' | 'email'
  apply_url: string | null
  apply_email: string | null
  active: boolean
  created_at: string
}

export type SearchInsert = Omit<Search, 'id' | 'created_at' | 'roles'>
export type SearchRoleInsert = Omit<SearchRole, 'id' | 'created_at'>
