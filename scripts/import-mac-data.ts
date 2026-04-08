/**
 * MAC June 2025 Import Script
 *
 * Reads MAC_June_2025_Search.xlsx and imports data into the CRM tables.
 *
 * Usage:
 *   1. Place MAC_June_2025_Search.xlsx in the project root (/Users/hannahrichardson/mmg-site/)
 *   2. Run: npx ts-node --project tsconfig.scripts.json scripts/import-mac-data.ts
 *
 * The file is expected to have four sheets:
 *   - "Applicant Info"         → crm_candidates + crm_pipeline
 *   - "Lower and Upper Interview Questions" → crm_interview_notes
 *   - "Nido Questions"         → crm_interview_notes
 *   - "References"             → crm_references
 */

import * as XLSX from 'xlsx'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SCHOOL_NAME = "Montessori Children's Academy"
const FILE_PATH = path.join(__dirname, '..', 'MAC_June_2025_Search.xlsx')

// ── Helpers ──────────────────────────────────────────────────────────────────

function safeStr(v: unknown): string | null {
  if (v == null) return null
  const s = String(v).trim()
  return s || null
}

function safeBool(v: unknown): boolean | null {
  if (v == null) return null
  const s = String(v).toLowerCase().trim()
  if (['yes', 'true', 'y', '1'].includes(s)) return true
  if (['no', 'false', 'n', '0'].includes(s)) return false
  return null
}

function safeDate(v: unknown): string | null {
  if (v == null) return null
  // Excel serial date
  if (typeof v === 'number') {
    const d = XLSX.SSF.parse_date_code(v)
    if (d) return `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`
  }
  const s = String(v).trim()
  if (!s) return null
  const d = new Date(s)
  if (isNaN(d.getTime())) return null
  return d.toISOString().slice(0, 10)
}

function sheetToRows(ws: XLSX.WorkSheet): Record<string, unknown>[] {
  return XLSX.utils.sheet_to_json(ws, { defval: null, raw: false })
}

function colVal(row: Record<string, unknown>, ...keys: string[]): string | null {
  for (const k of keys) {
    const v = row[k]
    if (v != null) return safeStr(v)
  }
  return null
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📂 Loading workbook:', FILE_PATH)

  let wb: XLSX.WorkBook
  try {
    wb = XLSX.readFile(FILE_PATH)
  } catch {
    console.error('❌  File not found. Place MAC_June_2025_Search.xlsx in the project root and re-run.')
    process.exit(1)
  }

  const sheetNames = wb.SheetNames
  console.log('📋 Sheets found:', sheetNames.join(', '))

  const counts = { candidates: 0, pipeline: 0, interview_notes: 0, references: 0 }

  // ── 1. Ensure CRM search exists for MAC ─────────────────────────────────────
  const { data: existingSearch } = await supabase
    .from('crm_searches')
    .select('id')
    .ilike('school_name', SCHOOL_NAME)
    .maybeSingle()

  let searchId: string
  if (existingSearch) {
    searchId = existingSearch.id
    console.log('✅  Search already exists:', searchId)
  } else {
    const { data: newSearch, error } = await supabase
      .from('crm_searches')
      .insert({
        school_name: SCHOOL_NAME,
        position_title: 'June 2025 Search',
        status: 'active',
        notes: 'Imported from MAC_June_2025_Search.xlsx',
      })
      .select('id')
      .single()
    if (error) { console.error('Failed to create search:', error); process.exit(1) }
    searchId = newSearch.id
    console.log('✅  Created search:', searchId)
  }

  // ── 2. Applicant Info → candidates + pipeline ────────────────────────────────
  const applicantSheet = wb.Sheets['Applicant Info'] ?? wb.Sheets[sheetNames[0]]
  if (applicantSheet) {
    const rows = sheetToRows(applicantSheet)
    console.log(`\n📑 Applicant Info: ${rows.length} rows`)

    for (const row of rows) {
      const fullName = colVal(row, 'Full Name', 'Name', 'Applicant Name', 'Applicant')
      if (!fullName) { console.log('  ⚠️  Skipping row with no name'); continue }

      // Build candidate
      const candidate = {
        full_name: fullName,
        email: colVal(row, 'Email', 'Email Address'),
        phone: colVal(row, 'Phone', 'Phone Number', 'Cell'),
        location_city: colVal(row, 'City', 'Location City'),
        location_state: colVal(row, 'State', 'Location State'),
        credential: colVal(row, 'Credential', 'Credentials', 'Certification'),
        training_program: colVal(row, 'Training Program', 'Training', 'AMI Training'),
        levels_certified: [colVal(row, 'Level', 'Certified Level', 'Montessori Level')].filter(Boolean) as string[],
        actively_looking: true,
        source: 'Direct Application',
        notes: colVal(row, 'Notes', 'Additional Notes', 'Comments'),
        added_by: 'MAC Import',
      }

      // Upsert candidate by name
      const { data: existingCand } = await supabase
        .from('crm_candidates')
        .select('id')
        .eq('full_name', fullName)
        .maybeSingle()

      let candidateId: string
      if (existingCand) {
        candidateId = existingCand.id
      } else {
        const { data: newCand, error } = await supabase
          .from('crm_candidates')
          .insert(candidate)
          .select('id')
          .single()
        if (error) { console.error(`  ❌  Failed to insert candidate ${fullName}:`, error.message); continue }
        candidateId = newCand.id
        counts.candidates++
      }

      // Build pipeline entry
      const pipeline = {
        candidate_id: candidateId,
        search_id: searchId,
        date_applied: safeDate(colVal(row, 'Application Date', 'Date Applied', 'Date')),
        resume_reviewed: safeBool(colVal(row, 'Resume Reviewed', 'Resume')) ?? false,
        contacted: safeBool(colVal(row, 'Contacted')) ?? false,
        screener_completed: safeBool(colVal(row, 'Screener', 'Screener Completed', 'Phone Screen')) ?? false,
        proceed_to_interview: safeBool(colVal(row, 'Proceed to Interview', 'Interview')),
        interview_score: colVal(row, 'Score', 'Interview Score') ? parseFloat(colVal(row, 'Score', 'Interview Score')!) || null : null,
        placed: safeBool(colVal(row, 'Placed', 'Hired')) ?? false,
        disposition: colVal(row, 'Disposition', 'Status', 'Decision'),
        disposition_notes: colVal(row, 'Disposition Notes', 'Decision Notes'),
      }

      const { data: existingPipeline } = await supabase
        .from('crm_pipeline')
        .select('id')
        .eq('candidate_id', candidateId)
        .eq('search_id', searchId)
        .maybeSingle()

      if (!existingPipeline) {
        const { error } = await supabase.from('crm_pipeline').insert(pipeline)
        if (error) { console.error(`  ❌  Pipeline insert failed for ${fullName}:`, error.message) }
        else counts.pipeline++
      }

      console.log(`  ✓ ${fullName}`)
    }
  }

  // ── 3. Interview question sheets → interview_notes ───────────────────────────
  const interviewSheets = sheetNames.filter(n =>
    n.toLowerCase().includes('interview') || n.toLowerCase().includes('nido')
  )

  for (const sheetName of interviewSheets) {
    const ws = wb.Sheets[sheetName]
    if (!ws) continue
    const rows = sheetToRows(ws)
    console.log(`\n📑 ${sheetName}: ${rows.length} rows`)

    for (const row of rows) {
      const candidateName = colVal(row, 'Candidate', 'Name', 'Applicant Name', 'Full Name')
      if (!candidateName) continue

      const { data: cand } = await supabase
        .from('crm_candidates')
        .select('id')
        .ilike('full_name', candidateName)
        .maybeSingle()
      if (!cand) { console.log(`  ⚠️  No candidate found for "${candidateName}"`); continue }

      const { data: pipe } = await supabase
        .from('crm_pipeline')
        .select('id')
        .eq('candidate_id', cand.id)
        .eq('search_id', searchId)
        .maybeSingle()

      // Each non-name column is a question
      for (const [col, val] of Object.entries(row)) {
        if (['Candidate', 'Name', 'Applicant Name', 'Full Name'].includes(col)) continue
        if (!val) continue

        const note = {
          candidate_id: cand.id,
          pipeline_id: pipe?.id ?? null,
          question_category: sheetName.toLowerCase().includes('nido') ? 'Opening and Relationship Building' : 'Montessori Philosophy in Practice',
          question_text: col,
          response_notes: safeStr(val),
        }

        const { error } = await supabase.from('crm_interview_notes').insert(note)
        if (!error) counts.interview_notes++
      }
      console.log(`  ✓ ${candidateName}`)
    }
  }

  // ── 4. References → crm_references ───────────────────────────────────────────
  const refsSheet = wb.Sheets['References'] ?? wb.Sheets[sheetNames.find(n => n.toLowerCase().includes('ref')) ?? '']
  if (refsSheet) {
    const rows = sheetToRows(refsSheet)
    console.log(`\n📑 References: ${rows.length} rows`)

    for (const row of rows) {
      const candidateName = colVal(row, 'Candidate', 'Applicant', 'Applicant Name', 'Name')
      if (!candidateName) continue

      const { data: cand } = await supabase
        .from('crm_candidates')
        .select('id')
        .ilike('full_name', candidateName)
        .maybeSingle()
      if (!cand) { console.log(`  ⚠️  No candidate for ref: "${candidateName}"`); continue }

      const ref = {
        candidate_id: cand.id,
        reference_name: colVal(row, 'Reference Name', 'Ref Name', 'Reference'),
        reference_phone: colVal(row, 'Reference Phone', 'Phone'),
        reference_email: colVal(row, 'Reference Email', 'Email'),
        relationship: colVal(row, 'Relationship', 'Relation'),
        how_long_known: colVal(row, 'How Long Known', 'Duration', 'Known'),
        would_rehire: safeBool(colVal(row, 'Would Rehire', 'Rehire')),
        comfortable_with_children: safeBool(colVal(row, 'Comfortable with Children', 'Child Safety', 'Safe')),
        work_habits_notes: colVal(row, 'Work Habits', 'Work Notes'),
        fit_notes: colVal(row, 'Fit Notes', 'Fit'),
        overall_notes: colVal(row, 'Overall Notes', 'Overall', 'Notes', 'Comments'),
        checked_date: safeDate(colVal(row, 'Checked Date', 'Date Checked', 'Date')),
        checked_by: colVal(row, 'Checked By', 'Checked') ?? 'Hannah',
      }

      const { error } = await supabase.from('crm_references').insert(ref)
      if (error) { console.error(`  ❌  Ref insert failed for ${candidateName}:`, error.message) }
      else { counts.references++; console.log(`  ✓ ${candidateName} → ${ref.reference_name ?? 'unknown ref'}`) }
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────────
  console.log('\n── Import Complete ──────────────────────────────')
  console.log(`  candidates inserted:     ${counts.candidates}`)
  console.log(`  pipeline entries:        ${counts.pipeline}`)
  console.log(`  interview notes:         ${counts.interview_notes}`)
  console.log(`  references:              ${counts.references}`)
  console.log('─────────────────────────────────────────────────')
}

main().catch(err => { console.error(err); process.exit(1) })
