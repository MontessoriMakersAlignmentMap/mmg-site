import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { updateJobPaymentStatus } from '@/lib/db/jobs'
import { createServiceClient } from '@/lib/supabase/server'
import { sendAdminNotification, sendSchoolConfirmation } from '@/lib/email'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-03-25.dahlia' })
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json() as { sessionId?: string }

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
    }

    // Retrieve the session from Stripe
    const session = await getStripe().checkout.sessions.retrieve(sessionId)

    // Guard: must be paid
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
    }

    // Guard: must have jobId in metadata
    const jobId = session.metadata?.jobId
    if (!jobId) {
      return NextResponse.json({ error: 'No jobId in session metadata' }, { status: 422 })
    }

    // Sync payment status to Supabase
    const { error } = await updateJobPaymentStatus(jobId, 'paid')
    if (error) {
      console.error('verify-checkout: supabase update failed:', error)
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
    }

    // Fetch job details for email notifications
    let contactEmail = ''
    let contactName = ''
    let jobTitle = ''
    let schoolName = ''

    try {
      const db = createServiceClient()
      const { data: job } = await db
        .from('jobs')
        .select('contact_email, contact_name, job_title, school_name')
        .eq('id', jobId)
        .single()
      if (job) {
        contactEmail = job.contact_email ?? ''
        contactName  = job.contact_name  ?? ''
        jobTitle     = job.job_title     ?? ''
        schoolName   = job.school_name   ?? ''
      }
    } catch (err) {
      console.error('verify-checkout: could not fetch job for emails', err)
    }

    // Confirmation email to the school — fire and forget
    if (contactEmail) {
      sendSchoolConfirmation({
        to: contactEmail,
        contactName,
        jobTitle,
        schoolName,
      }).catch(() => {})
    }

    // Notify admin — fire and forget
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    sendAdminNotification({
      subject: `New MatchHub job ready for review — ${schoolName || 'Unknown school'}`,
      text: [
        `A new MatchHub job post has been paid and is ready for review.`,
        ``,
        `School:         ${schoolName || 'Unknown'}`,
        `Role:           ${jobTitle   || 'Unknown'}`,
        `Payment status: paid`,
        `Job ID:         ${jobId}`,
        ``,
        `Review it here: ${siteUrl}/admin/matchhub/jobs`,
      ].join('\n'),
    }).catch(() => {})

    return NextResponse.json({ ok: true, jobId })
  } catch (err) {
    console.error('verify-checkout error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
