// scripts/heygen-check-status.ts
// Checks all rows where Status=Generating, calls HeyGen status API,
// updates Status to Complete with Video URL when done.
//
// Usage: npx tsx scripts/heygen-check-status.ts

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

if (!HEYGEN_API_KEY || !SPREADSHEET_ID) {
  console.error('Missing HEYGEN_API_KEY or HEYGEN_SPREADSHEET_ID in .env.local')
  process.exit(1)
}

// Actual column mapping (0-indexed) from the Scripts sheet:
// A=0 Row #, B=1 Level, C=2 Strand, D=3 Seq, E=4 Lesson Title,
// F=5 Script Text, G=6 Avatar ID, H=7 Voice ID, I=8 Aspect Ratio,
// J=9 Status, K=10 Video ID, L=11 Video URL,
// M=12 Platform Upload Status, N=13 Notes
const COL = {
  LESSON_TITLE: 4,
  STATUS: 9,
  VIDEO_ID: 10,
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

async function checkVideoStatus(videoId: string): Promise<{
  status: string
  video_url?: string
  error?: string
}> {
  const resp = await fetch(
    `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`,
    { headers: { 'X-Api-Key': HEYGEN_API_KEY } }
  )

  if (!resp.ok) {
    const errText = await resp.text()
    return { status: 'error', error: `${resp.status} ${errText}` }
  }

  const data = await resp.json()
  const videoStatus = data.data?.status
  const videoUrl = data.data?.video_url

  if (videoStatus === 'completed') {
    return { status: 'completed', video_url: videoUrl }
  } else if (videoStatus === 'processing' || videoStatus === 'pending') {
    return { status: 'processing' }
  } else {
    return { status: 'failed', error: data.data?.error || `Status: ${videoStatus}` }
  }
}

async function main() {
  console.log('\nHeyGen Video Status Checker\n')

  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const SHEET_NAME = 'Scripts'
  console.log(`--- Checking ${SHEET_NAME} sheet ---\n`)

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A2:N`,
  })

  const rows = response.data.values ?? []
  let totalChecked = 0
  let totalCompleted = 0
  let totalStillProcessing = 0
  let totalFailed = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const rowNum = i + 2
    const status = row[COL.STATUS] || ''
    const videoId = row[COL.VIDEO_ID] || ''

    if (status !== 'Generating' || !videoId) continue

    totalChecked++
    const lessonTitle = row[COL.LESSON_TITLE] || 'Untitled'
    process.stdout.write(`  Row ${rowNum}: ${lessonTitle} ... `)

    const result = await checkVideoStatus(videoId)

    if (result.status === 'completed') {
      // Update Status=Complete, keep Video ID, write Video URL
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!J${rowNum}:L${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Complete', videoId, result.video_url || '']],
        },
      })
      console.log(`Complete`)
      totalCompleted++
    } else if (result.status === 'processing') {
      console.log(`Still processing`)
      totalStillProcessing++
    } else {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!J${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [['Error']] },
      })
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!N${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[result.error || 'Generation failed']] },
      })
      console.log(`Failed: ${result.error}`)
      totalFailed++
    }
  }

  console.log(`\nSummary:`)
  console.log(`  Checked: ${totalChecked}`)
  console.log(`  Completed: ${totalCompleted}`)
  console.log(`  Still processing: ${totalStillProcessing}`)
  console.log(`  Failed: ${totalFailed}`)
  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
