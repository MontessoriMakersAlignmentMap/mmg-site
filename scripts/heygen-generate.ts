// scripts/heygen-generate.ts
// Reads rows from MMR_HeyGen_Scripts where Status=Pending,
// calls HeyGen API to generate videos, writes video_id back to the sheet.
//
// Usage: npx tsx scripts/heygen-generate.ts
// Options:
//   LIMIT=5 npx tsx scripts/heygen-generate.ts   — only process first N pending rows (default: 5)
//   LIMIT=0 npx tsx scripts/heygen-generate.ts   — process ALL pending rows

import * as fs from 'fs'
import * as path from 'path'
import { google } from 'googleapis'

// Load .env.local (handles quoted values)
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

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!
const SPREADSHEET_ID = process.env.HEYGEN_SPREADSHEET_ID!
const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT) : 5

if (!HEYGEN_API_KEY) {
  console.error('Missing HEYGEN_API_KEY in .env.local')
  process.exit(1)
}
if (!SPREADSHEET_ID) {
  console.error('Missing HEYGEN_SPREADSHEET_ID in .env.local')
  process.exit(1)
}

// Actual column mapping (0-indexed) from the Scripts sheet:
// A=0 Row #, B=1 Level, C=2 Strand, D=3 Seq, E=4 Lesson Title,
// F=5 Script Text, G=6 Avatar ID, H=7 Voice ID, I=8 Aspect Ratio,
// J=9 Status, K=10 Video ID, L=11 Video URL,
// M=12 Platform Upload Status, N=13 Notes
const COL = {
  LEVEL: 1,
  STRAND: 2,
  LESSON_TITLE: 4,
  SCRIPT_TEXT: 5,
  AVATAR_ID: 6,
  VOICE_ID: 7,
  STATUS: 9,
  VIDEO_ID: 10,
  NOTES: 13,
}

// Column letters for sheet updates
const COL_LETTER = {
  STATUS: 'J',
  VIDEO_ID: 'K',
  NOTES: 'N',
}

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

async function generateVideo(row: string[]): Promise<{ video_id?: string; error?: string }> {
  const body = {
    video_inputs: [
      {
        character: {
          type: 'avatar',
          avatar_id: row[COL.AVATAR_ID],
          avatar_style: 'normal',
        },
        voice: {
          type: 'text',
          input_text: row[COL.SCRIPT_TEXT],
          voice_id: row[COL.VOICE_ID],
          speed: 0.95,
        },
        background: {
          type: 'color',
          value: '#0e1a7a',
        },
      },
    ],
    dimension: { width: 1920, height: 1080 },
    caption: false,
    title: `${row[COL.LEVEL]} - ${row[COL.STRAND]} - ${row[COL.LESSON_TITLE]}`,
  }

  const resp = await fetch('https://api.heygen.com/v2/video/generate', {
    method: 'POST',
    headers: {
      'X-Api-Key': HEYGEN_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (resp.status === 429) {
    console.log('  Rate limited. Waiting 60s and retrying...')
    await sleep(60_000)
    const retry = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: {
        'X-Api-Key': HEYGEN_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!retry.ok) {
      const errText = await retry.text()
      return { error: `Rate limited after retry: ${retry.status} ${errText}` }
    }
    const data = await retry.json()
    return { video_id: data.data?.video_id }
  }

  if (!resp.ok) {
    const errText = await resp.text()
    return { error: `${resp.status} ${errText}` }
  }

  const data = await resp.json()
  return { video_id: data.data?.video_id }
}

async function main() {
  console.log(`\nHeyGen Video Generator`)
  console.log(`Limit: ${LIMIT === 0 ? 'ALL' : LIMIT} rows\n`)

  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const SHEET_NAME = 'Scripts'
  console.log(`--- Processing ${SHEET_NAME} sheet ---\n`)

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A2:N`,
  })

  const rows = response.data.values ?? []
  if (rows.length === 0) {
    console.log('  No rows found')
    return
  }

  let processed = 0
  let succeeded = 0
  let failed = 0

  for (let i = 0; i < rows.length; i++) {
    if (LIMIT > 0 && processed >= LIMIT) break

    const row = rows[i]
    const rowNum = i + 2
    const status = row[COL.STATUS] || ''
    const scriptText = row[COL.SCRIPT_TEXT] || ''
    const avatarId = row[COL.AVATAR_ID] || ''
    const voiceId = row[COL.VOICE_ID] || ''

    if (status !== 'Pending') continue
    if (!scriptText || !avatarId || !voiceId) {
      console.log(`  Row ${rowNum}: Skipping — missing script, avatar, or voice`)
      continue
    }

    const title = row[COL.LESSON_TITLE] || 'Untitled'
    console.log(`  Row ${rowNum}: ${title}`)

    // Set status to Generating
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${COL_LETTER.STATUS}${rowNum}`,
      valueInputOption: 'RAW',
      requestBody: { values: [['Generating']] },
    })

    const result = await generateVideo(row)
    processed++

    if (result.video_id) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${COL_LETTER.VIDEO_ID}${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[result.video_id]] },
      })
      console.log(`    OK — video_id: ${result.video_id}`)
      succeeded++
    } else {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${COL_LETTER.STATUS}${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [['Error']] },
      })
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${COL_LETTER.NOTES}${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[result.error || 'Unknown error']] },
      })
      console.log(`    ERROR: ${result.error}`)
      failed++
    }

    // 20 second delay between API calls
    if (processed < LIMIT || LIMIT === 0) {
      console.log(`    Waiting 20s...`)
      await sleep(20_000)
    }
  }

  console.log(`\n  Done: ${processed} processed, ${succeeded} succeeded, ${failed} failed\n`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
