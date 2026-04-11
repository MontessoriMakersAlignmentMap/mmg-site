// app/api/cron/toolbox-followup-sender/route.ts
// Processes the toolbox_followup_queue: generates personalized follow-up emails
// via Claude and sends them via Resend.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: NextRequest) {
  // Protect the cron endpoint
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Query for unsent rows where send_at has passed
    const { data: rows, error: fetchError } = await supabase
      .from('toolbox_followup_queue')
      .select('*')
      .eq('sent', false)
      .lte('send_at', new Date().toISOString())
      .order('created_at', { ascending: true })

    if (fetchError) {
      console.error('Failed to fetch follow-up queue:', fetchError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!rows || rows.length === 0) {
      return NextResponse.json({ processed: 0, message: 'No pending follow-ups' })
    }

    const results = []

    for (const row of rows) {
      try {
        // Generate email via Claude
        const message = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          system: `You are writing a brief, warm follow-up email on behalf of Hannah Richardson, founder of Montessori Makers Group. Hannah's voice is direct, knowledgeable, human, and equity-centered. No corporate language. No filler. Write like a real person who genuinely cares whether this tool is working for the school that bought it.`,
          messages: [
            {
              role: 'user',
              content: `Product purchased: ${row.product_name}
Customer first name: ${row.customer_name}
Customer email: ${row.customer_email}

Write a follow-up email using this structure:
Subject line: How is [product name] landing?
Body: Open with one sentence acknowledging what they purchased and that two days in is usually when real questions start to surface. Then offer one specific, practical tip for getting the most out of that particular product based on the descriptions below. Then recommend one related product that pairs naturally with what they bought and explain in one sentence why it pairs well. Close with an invitation to reply with questions. Sign off as Hannah.

Use these product descriptions and pairings:
Adult Culture Framework ($695): 57-page field guide for building coherent adult culture. Tip: start with the norms section before touching the accountability structures. Pairs well with: Conflict and Feedback Protocol.
Conflict and Feedback Protocol ($210): 7 tools for navigating conflict and delivering feedback equitably. Tip: use the tiered protocol to decide which tool applies before jumping to a difficult conversation. Pairs well with: Adult Culture Framework.
Year-Long PD Planning Template ($197): Editable Excel workbook for full-year professional development planning. Tip: fill in the Beginning of Year tab first before building out the weekly topics. Pairs well with: Montessori Leadership Operations Playbook.
Montessori Leadership Operations Playbook ($595): 40+ documents for leadership team infrastructure. Tip: start with the meeting rhythms section and get one standing meeting structured before touching the decision protocols. Pairs well with: Montessori Hiring and Selection Toolkit.
Montessori Hiring and Selection Toolkit ($450): 38+ documents for philosophy-aligned hiring. Tip: read the role clarity framework before writing a single job description. Pairs well with: Performance Concerns and Separation Toolkit.
Leadership Transition and Succession Toolkit ($425): 40 documents for structuring leadership transitions. Tip: start the institutional knowledge capture process immediately, even if the transition is months away. Pairs well with: Montessori Leadership Operations Playbook.
Performance Concerns and Separation Toolkit ($395): 33 documents for managing performance concerns through to separation. Tip: use the documentation tracker from day one of a performance concern, not after it escalates. Pairs well with: Conflict and Feedback Protocol.
Board Onboarding and Alignment Toolkit ($325): 21 documents for board onboarding and governance alignment. Tip: send the culture and expectations documents before the first meeting, not during it. Pairs well with: Montessori Leadership Operations Playbook.
Montessori Staff Handbook Toolkit ($297): 124-page editable staff handbook template. Tip: customize the adult culture and communication sections first since those shape how staff read everything else. Pairs well with: Adult Culture Framework.
Montessori Family Handbook ($197): 58-page editable family handbook template. Tip: have two or three current families read the draft before finalizing since they will catch gaps leadership misses. Pairs well with: Montessori Staff Handbook Toolkit.

Write only the email. No preamble, no explanation, no subject line label. Just subject line on the first line, then a blank line, then the email body.`,
            },
          ],
        })

        const emailContent = (message.content[0] as { type: string; text: string }).text
        const lines = emailContent.split('\n')
        const subject = lines[0].trim()
        const body = lines.slice(2).join('\n').trim()

        // Send via Resend
        await resend.emails.send({
          from: 'Hannah at Montessori Makers Group <info@montessorimakers.org>',
          to: row.customer_email,
          subject,
          text: body,
        })

        // Mark as sent
        await supabase
          .from('toolbox_followup_queue')
          .update({ sent: true })
          .eq('id', row.id)

        results.push({ id: row.id, email: row.customer_email, product: row.product_name, status: 'sent' })
      } catch (rowError) {
        console.error(`Failed to process follow-up for ${row.id}:`, rowError)
        results.push({ id: row.id, email: row.customer_email, product: row.product_name, status: 'error' })
      }
    }

    return NextResponse.json({ processed: results.length, results })
  } catch (error) {
    console.error('Toolbox follow-up sender error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
