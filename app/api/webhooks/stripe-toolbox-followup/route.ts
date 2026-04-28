// app/api/webhooks/stripe-toolbox-followup/route.ts
// Receives Stripe payment_intent.succeeded webhooks. For every successful
// payment, sends Hannah an admin notification email with structured fulfillment
// instructions per product type. For Toolbox products, also queues the 2-day
// "how is it landing?" follow-up email to the customer.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { sendAdminNotification } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const TOOLBOX_PRODUCTS = [
  'Adult Culture Framework',
  'Conflict and Feedback Protocol',
  'Year-Long PD Planning Template',
  'Montessori Leadership Operations Playbook',
  'Montessori Hiring and Selection Toolkit',
  'Leadership Transition and Succession Toolkit',
  'Performance Concerns and Separation Toolkit',
  'Board Onboarding and Alignment Toolkit',
  'Montessori Staff Handbook Toolkit',
  'Montessori Family Handbook',
  'Compensation Framework Toolkit',
  'Enrollment Systems Toolkit',
  'New Leader Onboarding Toolkit',
  'Staff Retention Toolkit',
  'Annual Cycle Planning Toolkit',
  'Financial Literacy for Montessori Leaders',
  'The Montessori Equity Audit: Toolbox Edition',
]

// Products fulfilled automatically by other systems — Hannah just gets a heads-up.
const AUTO_FULFILLED_PATTERNS = [
  /field guide/i,
  /leadership meridian/i,
  /matchhub pro/i,
  /matchhub job post/i,
  /reading assessment hub/i,
]

// Products that ship physically — Hannah needs to print and ship to the address.
const PHYSICAL_SHIPMENT_PATTERNS = [
  /decodable book/i,
  /decodable reader/i,
]

// Products delivered via live Zoom — Hannah needs to email the Zoom link.
const ZOOM_COURSE_PATTERNS = [
  /dual-role leadership/i,
  /the aligned leader/i,
  /building organizational trust/i,
  /onboarding by design/i,
  /staffing with purpose/i,
  /interview design for/i,
  /strategic planning the montessori way/i,
  /school identity & storytelling/i,
  /community architecture/i,
  /the mmg appraisal cycle/i,
  /equity audits & adult culture/i,
  /people policy by design/i,
  /leadership intensive/i,
]

type Action = {
  emoji: string
  label: string
  detail: string
}

function classifyAction(description: string, isToolbox: boolean): Action {
  if (TOOLBOX_PRODUCTS.some((p) => description.includes(p)) || isToolbox) {
    return {
      emoji: '✅',
      label: 'AUTO-FULFILLED',
      detail: 'Toolbox product. Customer was redirected to the download page after payment. No action required.',
    }
  }
  if (PHYSICAL_SHIPMENT_PATTERNS.some((re) => re.test(description))) {
    return {
      emoji: '📦',
      label: 'ACTION REQUIRED — PRINT AND SHIP',
      detail: 'Physical book order. Print, package, and ship to the shipping address below. If no shipping address, contact the customer to collect one.',
    }
  }
  if (ZOOM_COURSE_PATTERNS.some((re) => re.test(description))) {
    return {
      emoji: '📅',
      label: 'ACTION REQUIRED — SEND ZOOM LINK',
      detail: 'Live Zoom course registration. Email the customer the Zoom link, course schedule, and any prep materials.',
    }
  }
  if (AUTO_FULFILLED_PATTERNS.some((re) => re.test(description))) {
    return {
      emoji: '✅',
      label: 'AUTO-FULFILLED',
      detail: 'This product is fulfilled by its own webhook (Field Guide, Leadership Meridian, MatchHub, or Reading Assessment Hub). No action required unless you want to verify the customer received their access.',
    }
  }
  return {
    emoji: '❓',
    label: 'VERIFY FULFILLMENT',
    detail: 'No automatic fulfillment is registered for this product. Confirm the customer receives what they paid for, then add a pattern to the webhook so future orders auto-classify.',
  }
}

function formatShipping(shipping: Stripe.PaymentIntent.Shipping | null | undefined): string[] {
  if (!shipping?.address) return ['Shipping address: not collected on this payment link']
  const a = shipping.address
  return [
    `Ship to: ${shipping.name ?? '(no name)'}`,
    a.line1 ?? '',
    a.line2 ?? '',
    `${a.city ?? ''}, ${a.state ?? ''} ${a.postal_code ?? ''}`.trim(),
    a.country ?? '',
  ].filter(Boolean)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'payment_intent.succeeded') {
    return NextResponse.json({ received: true, skipped: 'wrong event type' })
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent
  const description = paymentIntent.description ?? '(no description)'
  const customerEmail =
    paymentIntent.receipt_email ??
    (paymentIntent.metadata?.email as string | undefined) ??
    '(no email)'
  const customerName =
    (paymentIntent.metadata?.name as string | undefined) ??
    paymentIntent.shipping?.name ??
    '(no name)'
  const amount = (paymentIntent.amount / 100).toFixed(2)

  const matchedToolboxProduct = TOOLBOX_PRODUCTS.find((p) =>
    description.includes(p)
  )
  const action = classifyAction(description, Boolean(matchedToolboxProduct))
  const shippingLines = formatShipping(paymentIntent.shipping)

  // ── 1. Always send Hannah an admin notification ─────────────────────────
  // Even if downstream automation handles fulfillment, she gets visibility on
  // every sale. The action label tells her at a glance whether to act.
  await sendAdminNotification({
    subject: `${action.emoji} New order: ${description} ($${amount})`,
    text: [
      `${action.emoji} ${action.label}`,
      '',
      action.detail,
      '',
      '─── Order ───',
      `Product:   ${description}`,
      `Amount:    $${amount}`,
      `Customer:  ${customerName} <${customerEmail}>`,
      '',
      '─── Shipping ───',
      ...shippingLines,
      '',
      '─── Payment ───',
      `Payment ID: ${paymentIntent.id}`,
      `Stripe:     https://dashboard.stripe.com/payments/${paymentIntent.id}`,
    ].join('\n'),
  }).catch((err) => {
    console.error('Admin notification failed:', err)
  })

  // ── 2. If Toolbox product, also queue the 2-day customer follow-up ──────
  if (matchedToolboxProduct && customerEmail !== '(no email)') {
    const { error } = await supabase.from('toolbox_followup_queue').insert({
      customer_email: customerEmail,
      customer_name: customerName === '(no name)' ? 'there' : customerName,
      product_name: matchedToolboxProduct,
    })
    if (error) {
      console.error('Failed to insert follow-up queue row:', error)
      // Don't 500 — admin notification already sent. Log and move on.
    }
  }

  return NextResponse.json({
    received: true,
    notified: true,
    queued: matchedToolboxProduct ?? null,
  })
}
