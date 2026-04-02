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

    // Parse add-ons from Stripe metadata
    const addOns = {
      featured: session.metadata?.featured === 'true',
      social:   session.metadata?.social   === 'true',
    }

    // Sync payment status + add-ons to Supabase
    const { error } = await updateJobPaymentStatus(jobId, 'paid', addOns)
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
    const addOnLines = [
      addOns.featured ? '★ FEATURED PLACEMENT purchased — promote to top of listings' : '',
      addOns.social   ? '📣 SOCIAL BOOST purchased — needs social media promotion'       : '',
    ].filter(Boolean)

    sendAdminNotification({
      subject: `${addOns.social ? '📣 ACTION NEEDED — ' : ''}New MatchHub job paid — ${schoolName || 'Unknown school'}`,
      text: [
        'A new MatchHub job post has been paid and is ready for review.',
        '',
        `School:         ${schoolName || 'Unknown'}`,
        `Role:           ${jobTitle   || 'Unknown'}`,
        `Payment status: paid`,
        `Job ID:         ${jobId}`,
        '',
        addOnLines.length
          ? ['Add-ons purchased:', ...addOnLines.map(l => '  ' + l)].join('\n')
          : 'Add-ons: none',
        '',
        `Review it here: ${siteUrl}/admin/matchhub/jobs`,
      ].join('\n'),
    }).catch(() => {})

    // Separate urgent alert if social boost was purchased
    if (addOns.social) {
      sendAdminNotification({
        subject: `📣 Social Boost purchased — ${schoolName || 'Unknown'}: ${jobTitle || 'Unknown role'}`,
        text: [
          'ACTION NEEDED: A school purchased the Social Boost add-on.',
          '',
          `School: ${schoolName || 'Unknown'}`,
          `Role:   ${jobTitle   || 'Unknown'}`,
          `Job ID: ${jobId}`,
          '',
          'Once the listing is approved, promote it across Montessori Makers social channels.',
          '',
          `Review: ${siteUrl}/admin/matchhub/jobs`,
        ].join('\n'),
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true, jobId })
  } catch (err) {
    console.error('verify-checkout error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
