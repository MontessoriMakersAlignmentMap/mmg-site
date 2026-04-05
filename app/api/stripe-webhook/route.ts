import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { updateJobPaymentStatus } from '@/lib/db/jobs'
import { createServiceClient } from '@/lib/supabase/server'
import { sendAdminNotification, sendSchoolConfirmation, sendProWelcomeEmail } from '@/lib/email'

const PRO_PRICE_ID = 'price_1TFy1rPGvmx1ACnDIHVYajtZ'

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

  // ── Handle subscription cancellation ─────────────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const db = createServiceClient()
    await db
      .from('matchhub_pro_subscriptions')
      .update({ active: false, cancelled_at: new Date().toISOString() })
      .eq('stripe_subscription_id', subscription.id)
    return NextResponse.json({ received: true })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true })
  }

  // ── MatchHub Pro purchase ─────────────────────────────────────────────────
  // Detect by expanding line items and checking the price ID
  const stripe = getStripe()
  let isProPurchase = false
  let proSubscriptionId: string | null = null

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 })
    isProPurchase = lineItems.data.some(item => item.price?.id === PRO_PRICE_ID)
    // For subscriptions, get the subscription ID from the session
    if (isProPurchase && session.subscription) {
      proSubscriptionId = typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription.id
    }
  } catch (err) {
    console.error('stripe-webhook: could not fetch line items', err)
  }

  if (isProPurchase) {
    const email = session.customer_details?.email ?? session.customer_email ?? ''
    const customerId = typeof session.customer === 'string'
      ? session.customer
      : (session.customer as Stripe.Customer | null)?.id ?? ''

    if (email && customerId && proSubscriptionId) {
      const db = createServiceClient()
      // Upsert so re-subscribing the same email just refreshes the record
      await db.from('matchhub_pro_subscriptions').upsert(
        {
          email:                  email.toLowerCase(),
          stripe_customer_id:     customerId,
          stripe_subscription_id: proSubscriptionId,
          active:                 true,
          cancelled_at:           null,
        },
        { onConflict: 'stripe_subscription_id' }
      )

      sendProWelcomeEmail({ to: email }).catch(() => {})

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://montessorimakersgroup.org'
      sendAdminNotification({
        subject: 'New MatchHub Pro subscriber',
        text: [
          'A school just purchased MatchHub Pro.',
          '',
          `Email:           ${email}`,
          `Stripe customer: ${customerId}`,
          `Subscription:    ${proSubscriptionId}`,
          '',
          `View profiles:   ${siteUrl}/matchhub/talent`,
        ].join('\n'),
      }).catch(() => {})
    }

    return NextResponse.json({ received: true })
  }

  // ── MatchHub job payment ──────────────────────────────────────────────────
  const jobId = session.metadata?.jobId
  if (!jobId) {
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
