import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-03-25.dahlia' })
}

// Prices in cents
const BASE_JOB_PRICE = 5900   // $59
const FEATURED_PRICE  = 5900  // +$59
const SOCIAL_PRICE    = 7900  // +$79

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { jobId, featured, social } = body as {
      jobId: string
      featured: boolean
      social: boolean
    }

    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 })
    }

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'MatchHub Job Post' },
          unit_amount: BASE_JOB_PRICE,
        },
        quantity: 1,
      },
    ]

    if (featured) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Featured Placement' },
          unit_amount: FEATURED_PRICE,
        },
        quantity: 1,
      })
    }

    if (social) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Social Boost' },
          unit_amount: SOCIAL_PRICE,
        },
        quantity: 1,
      })
    }

    const origin = req.headers.get('origin') ?? 'https://montessorimakers.co'

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/matchhub/success?plan=single&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/matchhub/post-job`,
      metadata: {
        jobId,
        featured: String(featured),
        social: String(social),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('create-checkout error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
