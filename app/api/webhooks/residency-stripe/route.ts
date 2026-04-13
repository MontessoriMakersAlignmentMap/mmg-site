import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-03-25.dahlia' })
}

/**
 * POST /api/webhooks/residency-stripe
 * Handles Stripe webhook events for MMR enrollment invoices.
 * On invoice.paid: creates auth user, assigns resident role, sends welcome email.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_RESIDENCY_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'invoice.paid') {
    await handleInvoicePaid(event.data.object as Stripe.Invoice)
  }

  if (event.type === 'invoice.payment_failed') {
    await handleInvoiceFailed(event.data.object as Stripe.Invoice)
  }

  return NextResponse.json({ received: true })
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const supabase = createServiceClient()
  const metadata = invoice.metadata || {}

  // Only process MMR tuition invoices
  if (metadata.type !== 'mmr_tuition') return

  const applicationId = metadata.application_id
  if (!applicationId) {
    console.error('invoice.paid: no application_id in metadata')
    return
  }

  // Load application
  const { data: app } = await supabase
    .from('residency_applications')
    .select('*')
    .eq('id', applicationId)
    .single()

  if (!app) {
    console.error('invoice.paid: application not found:', applicationId)
    return
  }

  // Update payment status on application
  await supabase.from('residency_applications').update({
    payment_status: 'paid',
  }).eq('id', applicationId)

  // Check if auth user already exists for this email
  const { data: existingUsers } = await supabase.auth.admin.listUsers()
  const existingUser = existingUsers?.users?.find(u => u.email === app.email)

  let userId: string

  if (existingUser) {
    userId = existingUser.id
  } else {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: app.email,
      password: crypto.randomUUID().slice(0, 12),
      email_confirm: true,
      user_metadata: { first_name: app.first_name, last_name: app.last_name },
    })

    if (authError) {
      console.error('invoice.paid: auth user creation failed:', authError.message)
      return
    }

    userId = authData.user.id
  }

  // Upsert residency profile
  await supabase.from('residency_profiles').upsert({
    id: userId,
    role: 'resident',
    first_name: app.first_name,
    last_name: app.last_name,
    email: app.email,
  }, { onConflict: 'id' })

  // Check if resident record exists
  const { data: existingResident } = await supabase
    .from('residency_residents')
    .select('id')
    .eq('profile_id', userId)
    .single()

  if (existingResident) {
    // Update existing record
    await supabase.from('residency_residents').update({
      stripe_customer_id: invoice.customer as string,
      stripe_invoice_id: invoice.id,
      payment_status: 'paid',
      status: 'enrolled',
    }).eq('id', existingResident.id)
  } else {
    // Create new resident record
    await supabase.from('residency_residents').insert({
      profile_id: userId,
      status: 'enrolled',
      stripe_customer_id: invoice.customer as string,
      stripe_invoice_id: invoice.id,
      payment_status: 'paid',
    })
  }

  // Generate magic link for login
  const { data: linkData } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: app.email,
    options: { redirectTo: 'https://montessorimakersgroup.org/residency/auth/login' },
  })

  const loginLink = linkData?.properties?.action_link || 'https://montessorimakersgroup.org/residency/auth/login'
  const track = app.track_interest === 'elementary' ? 'Elementary' : 'Primary'

  // Send welcome email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
      to: app.email,
      subject: 'Welcome to the Montessori Makers Residency!',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #d6a758; font-size: 20px; margin: 0;">Welcome to the Residency!</h1>
          </div>
          <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0E1A7A; font-size: 18px;">Thank you, ${app.first_name}!</h2>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              Your tuition payment has been received. You are now officially enrolled in the
              Montessori Makers Residency, ${track} track.
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              Your account has been created. Click below to set up your password and access your portal:
            </p>
            <div style="text-align: center; margin: 2rem 0;">
              <a href="${loginLink}" style="
                background: #0E1A7A; color: #fff; padding: 12px 32px; border-radius: 8px;
                text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;
              ">Access Your Portal</a>
            </div>
            <p style="font-size: 14px; line-height: 1.7; color: #666;">
              In the portal you can view your curriculum, submit album entries, log practicum hours,
              and connect with your cohort and mentor.
            </p>
            <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2ddd6;" />
            <p style="font-size: 13px; color: #999; text-align: center;">
              Montessori Makers Institute<br />
              <a href="https://montessorimakersgroup.org/residency" style="color: #0E1A7A;">montessorimakersgroup.org/residency</a>
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Welcome email failed:', err)
  }
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const metadata = invoice.metadata || {}
  if (metadata.type !== 'mmr_tuition') return

  const applicationId = metadata.application_id
  if (!applicationId) return

  const supabase = createServiceClient()
  await supabase.from('residency_applications').update({
    payment_status: 'failed',
  }).eq('id', applicationId)
}
