// app/api/webhooks/matchhub-social-draft/route.ts
// Replaces: "MatchHub Job to Social Draft Creator" Zap
//
// SETUP REQUIRED:
//   1. Set these in your .env.local:
//      ANTHROPIC_API_KEY=your_key
//      GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
//      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
//      GOOGLE_DRIVE_FOLDER_ID=your_matchhub_social_drafts_folder_id  <-- get from Drive URL
//      NOTIFICATION_EMAIL=hannah@montessorimakers.org
//      RESEND_API_KEY=your_resend_key
//
//   2. In Supabase: Database → Webhooks → Edit your existing MatchHub job webhook
//      Change the URL from the Zapier webhook URL to:
//      https://yourdomain.com/api/webhooks/matchhub-social-draft
//
//   3. Delete the Zapier zap once you've tested this and confirmed it works.

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { google } from 'googleapis'
import { Resend } from 'resend'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

// Authenticate with Google using a service account
function getGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/documents',
    ],
  })
  return auth
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Supabase sends the record inside body.record for INSERT events
    const record = body.record ?? body

    const {
      status,
      payment_status,
      school_name,
      job_title,
      level,
      location,
      employment_type,
      school_type,
      credential,
      compensation,
      start_date,
      school_description,
      job_summary,
      created_at,
    } = record

    // Step 2 filter: only run when approved + paid
    if (status !== 'approved' || payment_status !== 'paid') {
      return NextResponse.json({ skipped: true, reason: 'Not approved or not paid' })
    }

    // Step 3: Call Claude to generate social content
    const prompt = `A new job posting has just been approved on MatchHub, the Montessori-specific hiring platform inside the Montessori Makers ecosystem.

Here are the job details:
School name: ${school_name}
Job title: ${job_title}
Level: ${level}
Location: ${location}
Employment type: ${employment_type}
School type: ${school_type}
Credential required: ${credential}
Compensation: ${compensation}
Start date: ${start_date}
School description: ${school_description}
Job summary: ${job_summary}

Write two pieces of social content to help this school find the right candidate.

LINKEDIN POST:
Write a LinkedIn post between 150 and 200 words. Open with one sentence that names the specific role and school in a way that makes a Montessori educator stop scrolling. Then describe the opportunity in human terms, not a job description rewrite. Mention the level, location, credential requirement, and compensation if it is not listed as "based on experience." Close with a clear call to action directing people to MatchHub at montessorimakersgroup.org/matchhub. Use line breaks for readability. No more than three hashtags. Make the three hashtags specific: one about Montessori, one about the role level or type, one about the location or hiring.

INSTAGRAM CAPTION:
Write an Instagram caption between 80 and 120 words. Warmer and more conversational than the LinkedIn post. Same job, different energy. Open with a hook that speaks directly to a Montessori educator who might be ready for something new. Keep it human and specific. End with the same MatchHub call to action. Include five hashtags at the end that are specific to Montessori hiring, the role level, and the location.

Format your response exactly like this with no extra commentary:
LINKEDIN:
[LinkedIn post here]

INSTAGRAM:
[Instagram caption here]`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const socialContent = (message.content[0] as { type: string; text: string }).text

    // Steps 4 + 5: Create Google Doc in MatchHub Social Drafts folder
    const auth = getGoogleAuth()
    const docs = google.docs({ version: 'v1', auth })
    const drive = google.drive({ version: 'v3', auth })

    const docTitle = `Social Draft - ${school_name} - ${job_title} - ${new Date(created_at).toLocaleDateString('en-US')}`

    // Create the doc
    const doc = await docs.documents.create({
      requestBody: { title: docTitle },
    })

    const docId = doc.data.documentId!

    // Write content to the doc
    await docs.documents.batchUpdate({
      documentId: docId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: socialContent,
            },
          },
        ],
      },
    })

    // Move the doc into the MatchHub Social Drafts folder
    await drive.files.update({
      fileId: docId,
      addParents: process.env.GOOGLE_DRIVE_FOLDER_ID,
      removeParents: 'root',
      requestBody: {},
    })

    const docUrl = `https://docs.google.com/document/d/${docId}/edit`

    // Step 6: Send notification email via Resend
    await resend.emails.send({
      from: 'MatchHub <noreply@montessorimakers.org>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New social draft ready for ${school_name} - ${job_title}`,
      text: `A new job posting has been approved. A social media draft has been created for ${school_name} - ${job_title} and is ready for review.\n\nOpen the doc: ${docUrl}\n\nOr check the MatchHub Social Drafts folder in Google Drive.`,
    })

    return NextResponse.json({ success: true, docId, docUrl })
  } catch (error) {
    console.error('MatchHub social draft error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}