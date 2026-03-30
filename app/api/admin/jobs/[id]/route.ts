import { NextRequest, NextResponse } from 'next/server'
import { approveJob, rejectJob, archiveJob } from '@/lib/db/jobs'
import { createServiceClient } from '@/lib/supabase/server'
import { sendJobApprovedEmail, sendJobRejectedEmail } from '@/lib/email'

type Action = 'approve' | 'reject' | 'archive'

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await context.params
  const { action } = await req.json() as { action: Action }

  let result: { error: string | null }

  if (action === 'approve')      result = await approveJob(id)
  else if (action === 'reject')  result = await rejectJob(id)
  else if (action === 'archive') result = await archiveJob(id)
  else return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  // After a successful approval, send the school a "your listing is live" email
  if (action === 'approve') {
    try {
      const db = createServiceClient()
      const { data: job } = await db
        .from('jobs')
        .select('contact_email, contact_name, job_title, school_name, expires_at')
        .eq('id', id)
        .single()

      if (job?.contact_email) {
        sendJobApprovedEmail({
          to:          job.contact_email,
          contactName: job.contact_name  ?? '',
          jobTitle:    job.job_title     ?? '',
          schoolName:  job.school_name   ?? '',
          expiresAt:   job.expires_at    ?? null,
        }).catch(() => {}) // silent — never block the response
      }
    } catch (err) {
      // Log but don't fail — approval already succeeded
      console.error('admin approve: could not send approval email', err)
    }
  }

  // After a successful rejection, notify the school
  if (action === 'reject') {
    try {
      const db = createServiceClient()
      const { data: job } = await db
        .from('jobs')
        .select('contact_email, contact_name, job_title, school_name')
        .eq('id', id)
        .single()

      if (job?.contact_email) {
        sendJobRejectedEmail({
          to:          job.contact_email,
          contactName: job.contact_name ?? '',
          jobTitle:    job.job_title    ?? '',
          schoolName:  job.school_name  ?? '',
        }).catch(() => {}) // silent — never block the response
      }
    } catch (err) {
      // Log but don't fail — rejection already succeeded
      console.error('admin reject: could not send rejection email', err)
    }
  }

  return NextResponse.json({ ok: true })
}
