import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PLAYLIST_PATH = join(process.cwd(), 'public', 'data', 'mmr-playlist.json')

export async function GET() {
  try {
    const raw = await readFile(PLAYLIST_PATH, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ focus: [], vibe: [] })
  }
}

export async function PUT(req: NextRequest) {
  /* Auth check — admin only */
  const authHeader = req.headers.get('cookie') || ''
  const token = authHeader.match(/sb-[^=]+-auth-token=([^;]+)/)?.[1]

  if (!token) {
    /* Try getting user from supabase auth */
    const { data: { user } } = await supabaseAdmin.auth.getUser(
      req.headers.get('authorization')?.replace('Bearer ', '') || ''
    )
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { data: profile } = await supabaseAdmin
      .from('residency_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  try {
    const body = await req.json()

    /* Validate structure */
    if (!body.focus || !body.vibe || !Array.isArray(body.focus) || !Array.isArray(body.vibe)) {
      return NextResponse.json({ error: 'Invalid playlist format' }, { status: 400 })
    }

    await writeFile(PLAYLIST_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
