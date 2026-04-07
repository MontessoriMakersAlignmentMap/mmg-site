import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(token: string | undefined): boolean {
  return !!token && token === process.env.ADMIN_TOKEN
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('careers_admin')?.value
  const isAdmin = checkAuth(token)

  const supabase = createServiceClient()
  let query = supabase
    .from('careers_jobs')
    .select('id, title, location, job_type, teaser, is_active, created_at, original_filename')
    .order('created_at', { ascending: false })

  if (!isAdmin) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('careers_admin')?.value
  if (!checkAuth(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const title = formData.get('title') as string
  const location = formData.get('location') as string
  const job_type = formData.get('job_type') as string
  const teaser = formData.get('teaser') as string
  const file = formData.get('file') as File | null

  if (!title || !location || !job_type || !teaser || !file) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const buffer = Buffer.from(await file.arrayBuffer())
  let content_html = ''
  let pdf_url: string | null = null

  if (file.name.endsWith('.pdf')) {
    // Upload PDF to Supabase Storage and render via iframe on detail page
    const path = `careers-jobs/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { error: uploadError } = await supabase.storage
      .from('public-files')
      .upload(path, buffer, { contentType: 'application/pdf', upsert: false })
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })
    const { data: urlData } = supabase.storage.from('public-files').getPublicUrl(path)
    pdf_url = urlData.publicUrl
    content_html = `<iframe src="${pdf_url}" width="100%" style="height:80vh;border:none;" title="${title}"></iframe>`
  } else {
    const mammoth = (await import('mammoth')).default
    const result = await mammoth.convertToHtml({ buffer })
    content_html = result.value
  }

  const { data, error } = await supabase
    .from('careers_jobs')
    .insert({ title, location, job_type, teaser, content_html, original_filename: file.name, pdf_url })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
