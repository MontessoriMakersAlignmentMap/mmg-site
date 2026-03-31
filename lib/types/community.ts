export type CommunityOrg = {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  blurb: string | null
  display_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type CommunityOrgInsert = Omit<CommunityOrg, 'id' | 'created_at' | 'updated_at'>
