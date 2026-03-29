export type Partner = {
  id: string
  partner_name: string
  logo_image: string | null
  website_url: string | null
  short_description: string | null
  category: 'school' | 'nonprofit' | 'network' | 'organization'
  display_order: number
  is_featured: boolean
  is_published: boolean
  created_at: string
}

export type PartnerInsert = Omit<Partner, 'id' | 'created_at'>
