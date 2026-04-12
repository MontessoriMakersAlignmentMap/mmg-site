// scripts/heygen-generate.ts
// Reads rows from MMR_HeyGen_Scripts where Status=Pending and Batch=1,
// calls HeyGen API to generate videos, writes video_id back to the sheet.
//
// Usage: npx tsx scripts/heygen-generate.ts
// Optional: BATCH=2 npx tsx scripts/heygen-generate.ts

import * as fs from 'fs'
import * as path from 'path'
import { google } from 'googleapis'

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
    const val = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!
const TARGET_BATCH = process.env.BATCH || '1'

if (!HEYGEN_API_KEY) {
  console.error('Missing HEYGEN_API_KEY in .env.local')
  process.exit(1)
}
if (!SPREADSHEET_ID) {
  console.error('Missing GOOGLE_SHEETS_SPREADSHEET_ID in .env.local')
  process.exit(1)
}

// Column mapping (0-indexed after reading from A:Q)
// A=0 Row Number, B=1 Level, C=2 Strand, D=3 Sequence, E=4 Batch,
// F=5 Lesson Title, G=6 Script Text, H=7 Avatar ID, I=8 Voice ID,
// J=9 Aspect Ratio, K=10 Status, L=11 Video ID, M=12 Video URL,
// N=13 Completed At, O=14 Platform Upload Status, P=15 Notes, Q=16 Retry Count
const COL = {
  LEVEL: 1,
  STRAND: 2,
  BATCH: 4,
  LESSON_TITLE: 5,
  SCRIPT_TEXT: 6,
  AVATAR_ID: 7,
  VOICE_ID: 8,
  STATUS: 10,
  VIDEO_ID: 11,
  NOTES: 15,
  RETRY_COUNT: 16,
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
    // Rate limited — wait 60s and retry once
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
  console.log(`Target batch: ${TARGET_BATCH}\n`)

  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  // Read all rows from both sheets
  const sheetNames = ['Primary', 'Elementary']

  for (const sheetName of sheetNames) {
    console.log(`\n--- Processing ${sheetName} sheet ---\n`)

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A2:Q`,
    })

    const rows = response.data.values ?? []
    if (rows.length === 0) {
      console.log(`  No rows found in ${sheetName}`)
      continue
    }

    let processed = 0
    let succeeded = 0
    let failed = 0

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const rowNum = i + 2 // 1-indexed, skip header
      const status = row[COL.STATUS] || ''
      const batch = row[COL.BATCH] || ''
      const scriptText = row[COL.SCRIPT_TEXT] || ''
      const avatarId = row[COL.AVATAR_ID] || ''
      const voiceId = row[COL.VOICE_ID] || ''

      // Filter: only Pending rows in the target batch with required fields
      if (status !== 'Pending') continue
      if (batch !== TARGET_BATCH) continue
      if (!scriptText || !avatarId || !voiceId) {
        console.log(`  Row ${rowNum}: Skipping — missing script, avatar, or voice`)
        continue
      }

      const title = row[COL.LESSON_TITLE] || 'Untitled'
      console.log(`  Row ${rowNum}: ${title}`)

      // Set status to Generating before the API call
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!K${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [['Generating']] },
      })

      const result = await generateVideo(row)
      processed++

      if (result.video_id) {
        // Write video_id and keep status as Generating
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!L${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: { values: [[result.video_id]] },
        })
        console.log(`    OK — video_id: ${result.video_id}`)
        succeeded++
      } else {
        // Write error
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!K${rowNum}:L${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: { values: [['Error', '']] },
        })
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!P${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: { values: [[result.error || 'Unknown error']] },
        })
        console.log(`    ERROR: ${result.error}`)
        failed++
      }

      // 20 second delay between API calls
      if (i < rows.length - 1) {
        console.log(`    Waiting 20s...`)
        await sleep(20_000)
      }
    }

    console.log(`\n  ${sheetName} done: ${processed} processed, ${succeeded} succeeded, ${failed} failed`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
