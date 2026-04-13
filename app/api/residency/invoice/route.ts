import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-03-25.dahlia' })
}

const TUITION = {
  primary: 5000_00,   // $5,000
  elementary: 7000_00, // $7,000
}

/**
 * POST /api/residency/invoice
 * Called when admin approves an application.
 * Creates a Stripe customer + invoice and sends it to the applicant.
 */
export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { application_id, tuition_override } = body

  if (!application_id) {
    return NextResponse.json({ error: 'application_id required' }, { status: 400 })
  }

  // Load application
  const { data: app, error: appErr } = await supabase
    .from('residency_applications')
    .select('*')
    .eq('id', application_id)
    .single()

  if (appErr || !app) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 })
  }

  if (app.payment_status === 'invoiced' || app.payment_status === 'paid') {
    return NextResponse.json({ error: `Already ${app.payment_status}` }, { status: 400 })
  }

  const stripe = getStripe()
  const track = app.track_interest === 'elementary' ? 'elementary' : 'primary'
  const amount = tuition_override || TUITION[track]
  const trackLabel = track === 'elementary' ? 'Elementary (Ages 6-12)' : 'Primary (Ages 3-6)'

  try {
    // Create or retrieve Stripe customer
    let customerId = app.stripe_customer_id
    if (!customerId) {
      const existing = await stripe.customers.list({ email: app.email, limit: 1 })
      if (existing.data.length > 0) {
        customerId = existing.data[0].id
      } else {
        const customer = await stripe.customers.create({
          email: app.email,
          name: `${app.first_name} ${app.last_name}`,
          metadata: {
            application_id: app.id,
            track: track,
          },
        })
        customerId = customer.id
      }
    }

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice',
      days_until_due: 10,
      metadata: {
        application_id: app.id,
        track: track,
        type: 'mmr_tuition',
      },
    })

    // Add line item
    await stripe.invoiceItems.create({
      customer: customerId,
      invoice: invoice.id,
      amount: amount,
      currency: 'usd',
      description: `Montessori Makers Residency — ${trackLabel} Tuition`,
    })

    // Finalize and send the invoice
    await stripe.invoices.finalizeInvoice(invoice.id)
    await stripe.invoices.sendInvoice(invoice.id)

    // Update application record
    await supabase.from('residency_applications').update({
      stripe_customer_id: customerId,
      stripe_invoice_id: invoice.id,
      payment_status: 'invoiced',
      tuition_amount: amount,
      status: 'accepted',
      accepted_at: new Date().toISOString(),
      reviewed_at: new Date().toISOString(),
    }).eq('id', app.id)

    return NextResponse.json({
      success: true,
      invoice_id: invoice.id,
      customer_id: customerId,
      amount: amount,
    })
  } catch (err: any) {
    console.error('Stripe invoice error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
