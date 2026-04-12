// scripts/heygen-upload-to-platform.ts
// Reads rows where Status=Complete and Video URL is present,
// updates the file_urls field on the matching lesson in Supabase.
//
// Usage: npx tsx scripts/heygen-upload-to-platform.ts

import * as fs from 'fs'
import * as path from 'path'
import { google } from 'googleapis'
import { createClient } from '@supabase/supabase-js'

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

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SPREADSHEET_ID || !SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing GOOGLE_SHEETS_SPREADSHEET_ID, NEXT_PUBLIC_SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const COL = {
  LEVEL: 1,
  STRAND: 2,
  LESSON_TITLE: 5,
  STATUS: 10,
  VIDEO_URL: 12,
  PLATFORM_UPLOAD_STATUS: 14,
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

async function main() {
  console.log('\nHeyGen Platform Upload\n')

  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  // First, build lookup maps for strands and levels
  const { data: strands } = await supabase.from('residency_strands').select('id, name')
  const { data: levels } = await supabase.from('residency_levels').select('id, name')

  if (!strands || !levels) {
    console.error('Failed to fetch strands or levels from Supabase')
    process.exit(1)
  }

  const strandMap = new Map(strands.map((s) => [s.name.toLowerCase(), s.id]))
  const levelMap = new Map(levels.map((l) => [l.name.toLowerCase(), l.id]))

  console.log(`Loaded ${strandMap.size} strands and ${levelMap.size} levels from Supabase\n`)

  const sheetNames = ['Primary', 'Elementary']
  let uploaded = 0
  let notFound = 0
  let skipped = 0
  let errors = 0

  for (const sheetName of sheetNames) {
    console.log(`--- Processing ${sheetName} sheet ---\n`)

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A2:Q`,
    })

    const rows = response.data.values ?? []

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const rowNum = i + 2
      const status = row[COL.STATUS] || ''
      const videoUrl = row[COL.VIDEO_URL] || ''
      const uploadStatus = row[COL.PLATFORM_UPLOAD_STATUS] || ''

      if (status !== 'Complete' || !videoUrl || uploadStatus === 'Uploaded') {
        continue
      }

      const level = row[COL.LEVEL] || ''
      const strand = row[COL.STRAND] || ''
      const title = row[COL.LESSON_TITLE] || ''

      process.stdout.write(`  Row ${rowNum}: ${title} ... `)

      const strandId = strandMap.get(strand.toLowerCase())
      const levelId = levelMap.get(level.toLowerCase())

      if (!strandId || !levelId) {
        console.log(`Not found (strand="${strand}" level="${level}")`)
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!O${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: { values: [['Not Found']] },
        })
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!P${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[`No matching strand/level in Supabase: strand="${strand}", level="${level}"`]],
          },
        })
        notFound++
        continue
      }

      // Find the lesson
      const { data: lessons, error: fetchErr } = await supabase
        .from('residency_lessons')
        .select('id, file_urls')
        .eq('strand_id', strandId)
        .eq('level_id', levelId)
        .eq('title', title)
        .limit(1)

      if (fetchErr) {
        console.log(`DB error: ${fetchErr.message}`)
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!O${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: { values: [['Error']] },
        })
        errors++
        continue
      }

      if (!lessons || lessons.length === 0) {
        console.log(`Not found in DB`)
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!O${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: { values: [['Not Found']] },
        })
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!P${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[`No lesson matching title="${title}" for strand/level`]],
          },
        })
        notFound++
        continue
      }

      const lesson = lessons[0]
      const existingUrls: string[] = lesson.file_urls || []

      // Append video URL if not already present
      if (!existingUrls.includes(videoUrl)) {
        existingUrls.push(videoUrl)
      }

      const { error: updateErr } = await supabase
        .from('residency_lessons')
        .update({ file_urls: existingUrls })
        .eq('id', lesson.id)

      if (updateErr) {
        console.log(`Update error: ${updateErr.message}`)
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!O${rowNum}`,
          valueInputOption: 'RAW',
          requestBody: { values: [['Error']] },
        })
        errors++
        continue
      }

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!O${rowNum}`,
        valueInputOption: 'RAW',
        requestBody: { values: [['Uploaded']] },
      })
      console.log(`Uploaded`)
      uploaded++
    }
  }

  console.log(`\nSummary:`)
  console.log(`  Uploaded: ${uploaded}`)
  console.log(`  Not found: ${notFound}`)
  console.log(`  Errors: ${errors}`)
  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
