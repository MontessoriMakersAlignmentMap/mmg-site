import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const PRICES = {
  base:     4900, // $49
  featured: 5900, // +$59
  social:   7900, // +$79
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { jobId, addOns = [] } = body as {
      jobId: string
      addOns: string[]
    }

    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'MatchHub Job Post' },
          unit_amount: PRICES.base,
        },
        quantity: 1,
      },
    ]

    if (addOns.includes('featured')) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Featured Placement' },
          unit_amount: PRICES.featured,
        },
        quantity: 1,
      })
    }

    if (addOns.includes('social')) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Social Boost' },
          unit_amount: PRICES.social,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/matchhub/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/matchhub/post-job`,
      metadata: {
        jobId,
        featured: String(addOns.includes('featured')),
        social: String(addOns.includes('social')),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('create-checkout-session error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
