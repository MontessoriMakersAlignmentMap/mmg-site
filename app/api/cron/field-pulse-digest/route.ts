// app/api/cron/field-pulse-digest/route.ts
// Replaces: "Field Pulse Weekly Digest - Synthesize Submissions to Google Doc" Zap
//
// SETUP REQUIRED:
//   1. Add to vercel.json (see bottom of this file for the cron config to add)
//   2. Add these to .env.local and Vercel environment variables:
//      GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id  <-- get from Sheets URL
//      FIELD_PULSE_DRIVE_FOLDER_ID=your_field_pulse_folder_id  <-- get from Drive URL
//      CRON_SECRET=your_existing_cron_secret  <-- already in your .env.local
//
//   3. Share both the Google Sheet and the Field Pulse Drive folder with:
//      mmg-automations@mmg-automations-493012.iam.gserviceaccount.com
//
//   4. Delete the Zapier zap once confirmed working.
//
// VERCEL CRON CONFIG — add this to your vercel.json:
// {
//   "crons": [
//     {
//       "path": "/api/cron/field-pulse-digest",
//       "schedule": "0 8 * * 1"
//     }
//   ]
// }
// This fires every Monday at 8am UTC. Adjust the schedule as needed.

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { google } from 'googleapis'
import { Resend } from 'resend'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

function getGoogleAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/documents',
    ],
  })
}

export async function GET(req: NextRequest) {
  // Protect the cron endpoint
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const auth = getGoogleAuth()
    const sheets = google.sheets({ version: 'v4', auth })
    const docs = google.docs({ version: 'v1', auth })
    const drive = google.drive({ version: 'v3', auth })

    // Step 2: Read submissions from Google Sheet
    const sheetResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A2:Z11', // rows 2-11, up to 10 rows, columns A:Z
    })

    const rows = sheetResponse.data.values ?? []

    if (rows.length === 0) {
      return NextResponse.json({ skipped: true, reason: 'No submissions this week' })
    }

    // Format rows into readable text for Claude
    const submissionsText = rows
      .map((row, i) => `Submission ${i + 1}: ${row.filter(Boolean).join(' | ')}`)
      .join('\n')

    const weekOf = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    // Step 3: Send to Claude for synthesis
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are a research synthesizer for Hannah Richardson, founder of Montessori Makers Group. Hannah publishes a monthly signal report called Field Pulse that identifies patterns across anonymous submissions from Montessori school leaders about what they are currently navigating in their schools.`,
      messages: [
        {
          role: 'user',
          content: `Here are this week's Field Pulse submissions from Montessori leaders across the field:

${submissionsText}

Analyze these submissions and write a Field Pulse draft in Hannah's voice. Hannah's voice is direct, grounded, pattern-focused, and deeply knowledgeable about Montessori organizational life. She does not sensationalize, does not over-claim, and always distinguishes between a strong signal and an early pattern.

Write the draft in this exact structure:

FIELD PULSE DRAFT
Week of ${weekOf}
Submissions this week: ${rows.length}

SIGNAL 01: Name the signal in one bold declarative sentence. Then write two to three sentences interpreting what this pattern means for Montessori schools right now. Note whether this is a strong recurring signal or an early emerging one.

SIGNAL 02: Same format as Signal 01.

SIGNAL 03: Same format as Signal 01. If there are fewer than three distinct signals this week, write only the signals that are genuinely present. Do not manufacture a third signal to fill the format.

PATTERNS TO WATCH: One paragraph on anything in the submissions that does not yet rise to a signal but is worth tracking over the coming weeks.

HANNAH'S NOTES: Two to three sentences Hannah might add from her own field perspective this week to contextualize what the submissions are showing. Write this in first person as Hannah.

Write only the draft. No preamble or explanation.`,
        },
      ],
    })

    const draftContent = (message.content[0] as { type: string; text: string }).text

    // Step 4: Create Google Doc in Field Pulse folder
    const docTitle = `Field Pulse Draft - Week of ${weekOf}`

    const doc = await docs.documents.create({
      requestBody: { title: docTitle },
    })

    const docId = doc.data.documentId!

    await docs.documents.batchUpdate({
      documentId: docId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: draftContent,
            },
          },
        ],
      },
    })

    await drive.files.update({
      fileId: docId,
      addParents: process.env.FIELD_PULSE_DRIVE_FOLDER_ID,
      removeParents: 'root',
      requestBody: {},
    })

    const docUrl = `https://docs.google.com/document/d/${docId}/edit`

    // Step 5: Send notification email
    await resend.emails.send({
      from: 'Field Pulse <info@montessorimakers.org>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `Your Field Pulse draft for the week of ${weekOf} is ready`,
      text: `Your Field Pulse draft for the week of ${weekOf} is ready. Submissions this week: ${rows.length}.\n\nCheck your Field Pulse Drafts folder in Google Drive to review the synthesized analysis.\n\nOpen the doc: ${docUrl}`,
    })

    return NextResponse.json({ success: true, docId, docUrl, submissionCount: rows.length })
  } catch (error) {
    console.error('Field Pulse digest error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
