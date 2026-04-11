// app/api/webhooks/honeybook-inquiry-briefing/route.ts
// Receives a POST from Zapier when a new HoneyBook inquiry arrives.
// Generates a consult prep briefing via Claude, saves it as a Google Doc,
// and emails Hannah a notification with the doc link.

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
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/documents',
    ],
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      client_name,
      school_or_organization,
      service_type,
      their_message,
      inquiry_date,
    } = body

    if (!client_name) {
      return NextResponse.json({ error: 'Missing client_name' }, { status: 400 })
    }

    // Step 1: Generate briefing via Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      system: `You are a strategic assistant for Hannah Richardson, founder of Montessori Makers Group. Hannah has 25 years of experience in Montessori education across independent, public, charter, and justice-centered schools from infant through middle school. She is a field expert, equity-centered practitioner, and systems builder. She runs a multi-venture ecosystem called Montessori Makers Group that includes Advisory consulting for school alignment and organizational design, the Institute for Montessori leadership formation, MMAP which is a school management SaaS platform currently in pilot, MatchHub which is a Montessori-specific hiring platform, Toolbox which sells downloadable leadership and HR templates, Learning which includes decodable books and courses, and Studio which does web and communication design for Montessori organizations.`,
      messages: [
        {
          role: 'user',
          content: `A prospective client has just submitted an inquiry and booked a consultation. Using the information below, write a one-page consult prep briefing for Hannah to review before the call. Be specific, be direct, and do not use filler language. Hannah reads fast and needs substance not summary.

Client name: ${client_name}
School or organization: ${school_or_organization ?? 'Not provided'}
Service or project type: ${service_type ?? 'Not specified'}
Their message: ${their_message ?? 'No message provided'}
Date of inquiry: ${inquiry_date ?? new Date().toLocaleDateString('en-US')}

Write the briefing in this exact structure:

WHO THIS IS: One sentence on who this person is and what kind of organization they are likely representing based on what they shared.

WHAT THEY PROBABLY NEED: Two to three sentences on the real organizational need underneath what they stated. Think like someone who has been inside hundreds of Montessori schools and knows what inquiry language usually signals beneath the surface.

MOST RELEVANT MMG OFFERINGS: List two or three specific MMG offerings that fit this client in order of relevance. One sentence each explaining why that offering fits this specific situation.

SMART QUESTIONS TO ASK ON THE CALL: Three questions Hannah should ask to get underneath the stated need and understand the real organizational picture. Make these specific and strategic, not generic coaching questions.

THINGS TO CLARIFY OR WATCH FOR: Any red flags, scope concerns, or things that need clarification before Hannah commits to an engagement. Be honest.

SUGGESTED NEXT STEP IF THE CALL GOES WELL: One clear, specific recommendation for what Hannah should propose at the end of the call.`,
        },
      ],
    })

    const briefingContent = (message.content[0] as { type: string; text: string }).text

    // Step 2: Create Google Doc in briefings folder
    const auth = getGoogleAuth()
    const docs = google.docs({ version: 'v1', auth })
    const drive = google.drive({ version: 'v3', auth })

    const docTitle = `Consult Prep - ${client_name}`

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
              text: briefingContent,
            },
          },
        ],
      },
    })

    await drive.files.update({
      fileId: docId,
      addParents: process.env.HONEYBOOK_BRIEFINGS_FOLDER_ID,
      removeParents: 'root',
      requestBody: {},
    })

    const docUrl = `https://docs.google.com/document/d/${docId}/edit`

    // Step 3: Send notification email
    await resend.emails.send({
      from: 'MMG Automations <info@montessorimakers.org>',
      to: 'hannah@montessorimakers.org',
      subject: `Briefing Ready: ${client_name}`,
      text: `Your consult prep briefing is ready and saved to Google Docs. Review it before your call with ${client_name} from ${school_or_organization ?? 'their organization'}.\n\nOpen the doc: ${docUrl}`,
    })

    return NextResponse.json({ success: true, docId, docUrl })
  } catch (error) {
    console.error('HoneyBook inquiry briefing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
