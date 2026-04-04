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

// Stripe requires the raw body to verify signatures
export const config = { api: { bodyParser: false } }

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('stripe-webhook: STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const body = await req.text()

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    console.error('stripe-webhook: signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // Only handle MatchHub job payments (have a jobId in metadata)
  const jobId = session.metadata?.jobId
  if (!jobId) {
    return NextResponse.json({ received: true })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true })
  }

  const addOns = {
    featured: session.metadata?.featured === 'true',
    social:   session.metadata?.social   === 'true',
  }

  const { error } = await updateJobPaymentStatus(jobId, 'paid', addOns)
  if (error) {
    console.error('stripe-webhook: supabase update failed:', error)
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
  }

  // Send emails — fire and forget
  try {
    const db = createServiceClient()
    const { data: job } = await db
      .from('jobs')
      .select('contact_email, contact_name, job_title, school_name')
      .eq('id', jobId)
      .single()

    if (job?.contact_email) {
      sendSchoolConfirmation({
        to:          job.contact_email,
        contactName: job.contact_name ?? '',
        jobTitle:    job.job_title    ?? '',
        schoolName:  job.school_name  ?? '',
      }).catch(() => {})
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://montessorimakersgroup.org'
    const addOnLines = [
      addOns.featured ? '★ FEATURED PLACEMENT purchased' : '',
      addOns.social   ? '📣 SOCIAL BOOST purchased'      : '',
    ].filter(Boolean)

    sendAdminNotification({
      subject: `New MatchHub job paid — ${job?.school_name ?? 'Unknown school'}`,
      text: [
        'A new MatchHub job post has been paid and is ready for review.',
        '',
        `School:         ${job?.school_name ?? 'Unknown'}`,
        `Role:           ${job?.job_title   ?? 'Unknown'}`,
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
  } catch (err) {
    console.error('stripe-webhook: could not send emails', err)
  }

  return NextResponse.json({ received: true })
}
