// scripts/heygen-rewrite-scripts.ts
// Rewrites all scripts in the HeyGen spreadsheet to be more conversational
// for avatar delivery. Same content, reformatted for spoken delivery.
//
// Usage: npx tsx scripts/heygen-rewrite-scripts.ts
// Options:
//   LIMIT=5 npx tsx scripts/heygen-rewrite-scripts.ts  — only process first N (default: all)
//   START=10 npx tsx scripts/heygen-rewrite-scripts.ts  — start from row N (default: 2)

import * as fs from 'fs'
import * as path from 'path'
import { google } from 'googleapis'
import Anthropic from '@anthropic-ai/sdk'

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
    if (!process.env[key]) process.env[key] = val
  }
}

const SPREADSHEET_ID = process.env.HEYGEN_SPREADSHEET_ID!
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT) : 0
const START_ROW = process.env.START ? parseInt(process.env.START) : 2

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function rewriteScript(script: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: `You are reformatting Montessori lesson scripts for spoken delivery by a video avatar. Your job is to make the script sound natural when read aloud by an AI avatar, without changing the content, meaning, or voice.

Rules:
- Keep every idea and every sentence. Do not cut content.
- Break long paragraphs into shorter ones (2-3 sentences max per paragraph).
- Break long sentences into shorter ones where natural.
- Add paragraph breaks between distinct thoughts to create natural pauses.
- Use periods, commas, and ellipses to create breathing room.
- Do not add new content, commentary, or filler words.
- Do not add greetings, sign-offs, or transitions that aren't in the original.
- Do not change the author's voice — this is Hannah Richardson's voice: direct, grounded, equity-centered.
- Remove any non-speech characters like equals signs, dashes used as dividers, or other formatting artifacts.
- Return ONLY the reformatted script. No preamble, no explanation.`,
    messages: [
      {
        role: 'user',
        content: `Reformat this script for natural spoken delivery by a video avatar:\n\n${script}`,
      },
    ],
  })

  return (message.content[0] as { type: string; text: string }).text.trim()
}

async function main() {
  console.log('\nHeyGen Script Rewriter')
  console.log(`Start row: ${START_ROW}, Limit: ${LIMIT === 0 ? 'ALL' : LIMIT}\n`)

  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  // Read all scripts
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Scripts!E2:F',
  })

  const rows = resp.data.values || []
  console.log(`Total rows: ${rows.length}\n`)

  let processed = 0
  let startIndex = START_ROW - 2 // convert row number to 0-indexed

  for (let i = startIndex; i < rows.length; i++) {
    if (LIMIT > 0 && processed >= LIMIT) break

    const rowNum = i + 2
    const title = rows[i][0] || 'Untitled'
    const script = rows[i][1] || ''

    if (!script) {
      console.log(`  Row ${rowNum}: ${title} — no script, skipping`)
      continue
    }

    process.stdout.write(`  Row ${rowNum}: ${title} ... `)

    try {
      const rewritten = await rewriteScript(script)

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Scripts!F${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[rewritten]] },
      })

      const origLen = script.length
      const newLen = rewritten.length
      console.log(`done (${origLen} → ${newLen} chars)`)
      processed++

      // Small delay to avoid Anthropic rate limits
      if (i < rows.length - 1) await sleep(1000)
    } catch (err: any) {
      console.log(`ERROR: ${err.message}`)
      // If rate limited, wait longer and retry
      if (err.status === 429) {
        console.log('    Rate limited, waiting 30s...')
        await sleep(30_000)
        i-- // retry this row
      }
    }
  }

  console.log(`\nDone. Rewrote ${processed} scripts.`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
