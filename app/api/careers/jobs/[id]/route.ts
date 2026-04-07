import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(token: string | undefined): boolean {
  return !!token && token === process.env.ADMIN_PASSWORD
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('careers_jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('careers_admin')?.value
  if (!checkAuth(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const contentType = req.headers.get('content-type') ?? ''

  let updates: Record<string, unknown> = {}

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData()
    const title = formData.get('title') as string | null
    const location = formData.get('location') as string | null
    const job_type = formData.get('job_type') as string | null
    const teaser = formData.get('teaser') as string | null
    const file = formData.get('file') as File | null

    if (title) updates.title = title
    if (location) updates.location = location
    if (job_type) updates.job_type = job_type
    if (teaser) updates.teaser = teaser

    if (file) {
      const supabaseForUpload = createServiceClient()
      const buffer = Buffer.from(await file.arrayBuffer())
      if (file.name.endsWith('.pdf')) {
        const path = `careers-jobs/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
        const { error: uploadError } = await supabaseForUpload.storage
          .from('public-files')
          .upload(path, buffer, { contentType: 'application/pdf', upsert: false })
        if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })
        const { data: urlData } = supabaseForUpload.storage.from('public-files').getPublicUrl(path)
        updates.pdf_url = urlData.publicUrl
        updates.content_html = `<iframe src="${urlData.publicUrl}" width="100%" style="height:80vh;border:none;" title="${title ?? ''}"></iframe>`
      } else {
        const mammoth = (await import('mammoth')).default
        const result = await mammoth.convertToHtml({ buffer })
        updates.content_html = result.value
        updates.pdf_url = null
      }
      updates.original_filename = file.name
    }
  } else {
    updates = await req.json()
  }

  updates.updated_at = new Date().toISOString()

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('careers_jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('careers_admin')?.value
  if (!checkAuth(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const supabase = createServiceClient()
  const { error } = await supabase.from('careers_jobs').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
