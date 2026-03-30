import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const BUCKET = 'job-descriptions'

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (file.type !== 'application/pdf') return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })

  const client = createServiceClient()

  // Create bucket if it doesn't exist yet
  await client.storage.createBucket(BUCKET, { public: true }).catch(() => {})

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const filename = `${Date.now()}-${safeName}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { data, error } = await client.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: 'application/pdf', upsert: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl } } = client.storage.from(BUCKET).getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
