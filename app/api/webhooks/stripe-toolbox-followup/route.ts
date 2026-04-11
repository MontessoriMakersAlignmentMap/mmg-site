// app/api/webhooks/stripe-toolbox-followup/route.ts
// Receives Stripe payment_intent.succeeded webhooks and queues follow-up emails
// for Toolbox product purchases.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

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
]

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
  const description = paymentIntent.description ?? ''

  // Check if the payment description contains a Toolbox product name
  const matchedProduct = TOOLBOX_PRODUCTS.find((product) =>
    description.includes(product)
  )

  if (!matchedProduct) {
    return NextResponse.json({ received: true, skipped: 'not a toolbox product' })
  }

  // Extract customer info
  const customerEmail =
    paymentIntent.receipt_email ??
    (paymentIntent.metadata?.email as string | undefined) ??
    ''
  const customerName =
    (paymentIntent.metadata?.name as string | undefined) ??
    paymentIntent.shipping?.name ??
    ''

  if (!customerEmail) {
    console.error('No customer email found for payment intent:', paymentIntent.id)
    return NextResponse.json({ received: true, skipped: 'no email' })
  }

  // Insert into follow-up queue
  const { error } = await supabase.from('toolbox_followup_queue').insert({
    customer_email: customerEmail,
    customer_name: customerName || 'there',
    product_name: matchedProduct,
  })

  if (error) {
    console.error('Failed to insert follow-up queue row:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ received: true, queued: matchedProduct })
}
