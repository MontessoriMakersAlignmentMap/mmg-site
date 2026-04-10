import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createServiceClient()

  const [strands, levels, categories] = await Promise.all([
    supabase.from('residency_strands').select('*').order('sort_order'),
    supabase.from('residency_levels').select('*').order('sort_order'),
    supabase.from('residency_categories').select('*').order('sort_order'),
  ])

  return NextResponse.json({
    strands: strands.data ?? [],
    levels: levels.data ?? [],
    categories: categories.data ?? [],
  })
}
