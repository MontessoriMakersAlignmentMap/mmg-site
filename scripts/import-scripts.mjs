import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://nhfhvxcmfgunhfdxhcyf.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY env var')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const SCRIPT_DIRS = [
  path.join(process.env.HOME, 'Desktop/Montessori Albums/Residency Albums'),
]

function parseScriptFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const entries = []
  const blocks = content.split(/^---$/m).filter(b => b.trim())

  for (let i = 0; i < blocks.length; i += 2) {
    const meta = blocks[i]
    const script = blocks[i + 1]
    if (!meta || !script) continue

    const lessonMatch = meta.match(/LESSON:\s*(.+)/i)
    const strandMatch = meta.match(/STRAND:\s*(.+)/i)
    const levelMatch = meta.match(/LEVEL:\s*(.+)/i)
    const seqMatch = meta.match(/SEQUENCE:\s*(\d+)/i)

    if (lessonMatch) {
      entries.push({
        lesson_name: lessonMatch[1].trim(),
        strand: strandMatch?.[1]?.trim() || '',
        level: levelMatch?.[1]?.trim() || '',
        sequence: seqMatch ? parseInt(seqMatch[1]) : null,
        script: script.trim(),
      })
    }
  }
  return entries
}

function normalizeLevelName(level) {
  if (/primary/i.test(level)) return 'Primary'
  if (/elementary/i.test(level)) return 'Elementary'
  return level
}

function normalizeStrandName(strand) {
  const map = {
    'practical life': 'Practical Life',
    'sensorial': 'Sensorial',
    'language': 'Language',
    'mathematics': 'Mathematics',
    'theory': 'Theory',
    'math': 'Mathematics',
    'geography': 'Geography',
    'biology': 'Biology',
    'history': 'History',
    'geometry': 'Geometry',
    'art': 'Art',
    'music': 'Music',
    'behavior': 'Behavior',
  }
  return map[strand.toLowerCase()] || strand
}

async function main() {
  // Get all lessons from DB
  const { data: lessons, error: fetchErr } = await supabase
    .from('residency_lessons')
    .select('id, title, strand:residency_strands(name), level:residency_levels(name)')

  if (fetchErr) { console.error('Failed to fetch lessons:', fetchErr); return }
  console.log(`Found ${lessons.length} lessons in database`)

  // Collect all scripts from files
  const allScripts = []
  for (const dir of SCRIPT_DIRS) {
    const files = fs.readdirSync(dir).filter(f => f.startsWith('Video_Scripts_') && f.endsWith('.md'))
    for (const file of files) {
      const entries = parseScriptFile(path.join(dir, file))
      allScripts.push(...entries)
    }
  }
  console.log(`Parsed ${allScripts.length} scripts from files`)

  // Match scripts to lessons
  let matched = 0
  let unmatched = 0
  const unmatchedList = []

  for (const script of allScripts) {
    const normLevel = normalizeLevelName(script.level)
    const normStrand = normalizeStrandName(script.strand)

    // Try exact title match within level+strand
    let match = lessons.find(l => {
      const lLevel = l.level?.name || ''
      const lStrand = l.strand?.name || ''
      return lLevel === normLevel && lStrand === normStrand && l.title.toLowerCase().includes(script.lesson_name.toLowerCase())
    })

    // Fallback: try just title match
    if (!match) {
      match = lessons.find(l => l.title.toLowerCase().includes(script.lesson_name.toLowerCase()))
    }

    // Fallback: try fuzzy match (first significant words)
    if (!match) {
      const words = script.lesson_name.toLowerCase().split(/\s+/).filter(w => w.length > 3).slice(0, 3)
      if (words.length >= 2) {
        match = lessons.find(l => {
          const lt = l.title.toLowerCase()
          return words.every(w => lt.includes(w))
        })
      }
    }

    if (match) {
      const { error: updateErr } = await supabase
        .from('residency_lessons')
        .update({ script_introduction: script.script })
        .eq('id', match.id)

      if (updateErr) {
        console.error(`Failed to update lesson ${match.id}:`, updateErr.message)
      } else {
        matched++
      }
    } else {
      unmatched++
      unmatchedList.push(`${script.level} > ${script.strand} > ${script.lesson_name}`)
    }
  }

  console.log(`\nResults: ${matched} matched, ${unmatched} unmatched`)
  if (unmatchedList.length > 0) {
    console.log('\nUnmatched scripts:')
    unmatchedList.forEach(u => console.log(`  - ${u}`))
  }
}

main()
