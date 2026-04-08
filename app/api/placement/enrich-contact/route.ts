/**
 * Apollo.io People Enrichment
 *
 * Uses the Apollo People Match endpoint to look up contact info by name / LinkedIn URL.
 * Free tier: ~50 credits/month. Basic paid plan: ~$49/month for 200 credits.
 * API docs: https://apolloio.github.io/apollo-api-docs/?shell#people-api
 * Get your API key: apollo.io → Settings → Integrations → API
 */

import { NextRequest, NextResponse } from 'next/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { full_name, current_employer, linkedin_url } = await req.json()
  if (!full_name) return NextResponse.json({ error: 'full_name required' }, { status: 400 })

  if (!process.env.APOLLO_API_KEY) {
    return NextResponse.json({ error: 'APOLLO_API_KEY not configured' }, { status: 500 })
  }

  const payload: Record<string, unknown> = { name: full_name }
  if (current_employer) payload.organization_name = current_employer
  if (linkedin_url) payload.linkedin_url = linkedin_url

  const response = await fetch('https://api.apollo.io/v1/people/match', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'x-api-key': process.env.APOLLO_API_KEY,
    },
    body: JSON.stringify(payload),
  })

  if (response.status === 404) {
    return NextResponse.json({ not_found: true })
  }

  if (!response.ok) {
    const text = await response.text()
    console.error('Apollo API error:', response.status, text)
    return NextResponse.json({ error: `Apollo returned ${response.status}` }, { status: 500 })
  }

  const data = await response.json()
  const person = data.person

  if (!person) {
    return NextResponse.json({ not_found: true })
  }

  // Extract the best email (work email preferred)
  const emails: string[] = person.email ? [person.email] : []
  if (Array.isArray(person.email_status) && person.email_status === 'verified') {
    // already have it
  }

  return NextResponse.json({
    email: person.email ?? null,
    phone: person.phone_numbers?.[0]?.sanitized_number ?? null,
    title: person.title ?? null,
    location_city: person.city ?? null,
    location_state: person.state ?? null,
    linkedin_url: person.linkedin_url ?? null,
    emails,
  })
}
