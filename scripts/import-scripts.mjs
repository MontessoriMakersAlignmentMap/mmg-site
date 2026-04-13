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
  const hasSeparators = /^---$/m.test(content)

  if (hasSeparators) {
    return parseWithSeparators(content)
  } else {
    return parseWithoutSeparators(content)
  }
}

function parseWithSeparators(content) {
  const entries = []
  const blocks = content.split(/^---$/m).filter(b => b.trim())

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const lessonMatch = block.match(/(?:##?\s*)?LESSON:\s*(.+)/i)
    if (!lessonMatch) continue

    const strandMatch = block.match(/\*{0,2}STRAND:\*{0,2}\s*(.+)/i)
    const levelMatch = block.match(/\*{0,2}LEVEL:\*{0,2}\s*(.+)/i)
    const seqMatch = block.match(/\*{0,2}SEQUENCE:\*{0,2}\s*(\d+)/i)

    let scriptText = ''

    const nextBlock = blocks[i + 1]
    if (nextBlock && !nextBlock.match(/(?:##?\s*)?LESSON:/i)) {
      scriptText = nextBlock.trim()
    } else {
      const lines = block.split('\n')
      let metaEnd = 0
      for (let j = 0; j < lines.length; j++) {
        if (/SEQUENCE:|LEVEL:|STRAND:|LESSON:/i.test(lines[j])) metaEnd = j
      }
      scriptText = lines.slice(metaEnd + 1).join('\n').trim()
    }

    if (!scriptText) continue

    entries.push({
      lesson_name: lessonMatch[1].trim(),
      strand: strandMatch?.[1]?.trim().replace(/\*+/g, '').trim() || '',
      level: levelMatch?.[1]?.trim().replace(/\*+/g, '').trim() || '',
      sequence: seqMatch ? parseInt(seqMatch[1]) : null,
      script: scriptText,
    })
  }
  return entries
}

function parseWithoutSeparators(content) {
  const entries = []
  // Split on LESSON: lines - each chunk starts with a LESSON: line
  const chunks = content.split(/(?=^LESSON:\s)/m).filter(c => c.trim())

  for (const chunk of chunks) {
    const lessonMatch = chunk.match(/^LESSON:\s*(.+)/i)
    if (!lessonMatch) continue

    const strandMatch = chunk.match(/^STRAND:\s*(.+)/mi)
    const levelMatch = chunk.match(/^LEVEL:\s*(.+)/mi)
    const seqMatch = chunk.match(/^SEQUENCE:\s*(\d+)/mi)

    // Extract script: everything after the metadata lines (LESSON, STRAND, LEVEL, SEQUENCE)
    const lines = chunk.split('\n')
    let metaEnd = 0
    for (let j = 0; j < lines.length; j++) {
      if (/^(LESSON|STRAND|LEVEL|SEQUENCE):/i.test(lines[j])) metaEnd = j
    }
    const scriptText = lines.slice(metaEnd + 1).join('\n').trim()
    if (!scriptText) continue

    entries.push({
      lesson_name: lessonMatch[1].trim(),
      strand: strandMatch?.[1]?.trim() || '',
      level: levelMatch?.[1]?.trim() || '',
      sequence: seqMatch ? parseInt(seqMatch[1]) : null,
      script: scriptText,
    })
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

// Normalize a title to a comparable key:
// - Strip "Level: Strand: " prefix
// - Lowercase
// - Remove all punctuation (colons, commas, hyphens, apostrophes, parentheses)
// - Collapse whitespace
// - Fix concatenated words from docx import (e.g. "Typesand" -> "types and")
function normalizeTitle(title) {
  let t = title
  // Strip "Primary: Strand: " or "Elementary: Strand: " prefix
  t = t.replace(/^(Primary|Elementary)\s*:\s*[^:]+\s*:\s*/i, '')
  // Strip "** Primary (3-6) > ** Strand > " prefix
  t = t.replace(/^\*+\s*(Primary|Elementary)\s*\([^)]*\)\s*>\s*\*+\s*[^>]+>\s*/i, '')
  t = t.toLowerCase()
  // Remove all punctuation
  t = t.replace(/[:\-–—,.''""\(\)\/\\]/g, ' ')
  // Fix common concatenated words from docx import
  t = t.replace(/(\w)(and|of|the|in|to|for|with|from|by|as|or|on|at|is|are|an|a)(\s|$)/gi, (m, before, word, after) => {
    // Only split if the char before is lowercase and the word starts lowercase
    if (before.match(/[a-z]/)) return before + ' ' + word.toLowerCase() + after
    return m
  })
  // Also fix patterns like "Introductionto" -> "introduction to"
  t = t.replace(/introduction\s*to/gi, 'introduction to')
  t = t.replace(/solids\s*of/gi, 'solids of')
  // Collapse whitespace
  t = t.replace(/\s+/g, ' ').trim()
  return t
}

// Build a bag-of-words set for fuzzy matching
function wordSet(str) {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'in', 'to', 'for', 'with', 'from', 'by', 'as', 'on', 'at', 'is', 'are', 'its', 'part'])
  return new Set(
    str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
  )
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 0
  let intersection = 0
  for (const w of setA) if (setB.has(w)) intersection++
  return intersection / (setA.size + setB.size - intersection)
}

async function main() {
  // Get all lessons from DB
  const { data: lessons, error: fetchErr } = await supabase
    .from('residency_lessons')
    .select('id, title, sort_order, strand:residency_strands(name), level:residency_levels(name)')

  if (fetchErr) { console.error('Failed to fetch lessons:', fetchErr); return }
  console.log(`Found ${lessons.length} lessons in database`)

  // Pre-compute normalized titles and word sets for all lessons
  const lessonIndex = lessons.map(l => ({
    ...l,
    normTitle: normalizeTitle(l.title),
    words: wordSet(l.title),
    levelName: l.level?.name || '',
    strandName: l.strand?.name || '',
  }))

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

  // Track which lessons have been matched to avoid duplicates
  const matchedLessonIds = new Set()
  let matched = 0
  let unmatched = 0
  const unmatchedList = []

  for (const script of allScripts) {
    const normLevel = normalizeLevelName(script.level)
    const normStrand = normalizeStrandName(script.strand)
    const normScriptTitle = normalizeTitle(script.lesson_name)
    const scriptWords = wordSet(script.lesson_name)

    // Filter to lessons in the same level+strand
    const candidates = lessonIndex.filter(l =>
      l.levelName === normLevel && l.strandName === normStrand && !matchedLessonIds.has(l.id)
    )

    // Also keep a broader fallback pool (same level, any strand)
    const broadCandidates = lessonIndex.filter(l =>
      l.levelName === normLevel && !matchedLessonIds.has(l.id)
    )

    let match = null

    // Strategy 1: Exact normalized title match within strand
    match = candidates.find(l => l.normTitle === normScriptTitle)

    // Strategy 2: Normalized title contains or is contained
    if (!match) {
      match = candidates.find(l =>
        l.normTitle.includes(normScriptTitle) || normScriptTitle.includes(l.normTitle)
      )
    }

    // Strategy 3: Match by sequence number within strand
    if (!match && script.sequence != null) {
      const sortedCandidates = [...candidates].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      if (script.sequence > 0 && script.sequence <= sortedCandidates.length) {
        const seqCandidate = sortedCandidates[script.sequence - 1]
        // Verify with Jaccard similarity > 0.2 (at least some word overlap)
        const sim = jaccardSimilarity(scriptWords, seqCandidate.words)
        if (sim >= 0.15) {
          match = seqCandidate
        }
      }
    }

    // Strategy 4: Best Jaccard similarity within strand (threshold 0.4)
    if (!match) {
      let bestSim = 0
      let bestCandidate = null
      for (const c of candidates) {
        const sim = jaccardSimilarity(scriptWords, c.words)
        if (sim > bestSim) {
          bestSim = sim
          bestCandidate = c
        }
      }
      if (bestSim >= 0.35 && bestCandidate) {
        match = bestCandidate
      }
    }

    // Strategy 5: Broader search across all strands in same level
    if (!match) {
      match = broadCandidates.find(l =>
        l.normTitle === normScriptTitle || l.normTitle.includes(normScriptTitle) || normScriptTitle.includes(l.normTitle)
      )
    }

    // Strategy 6: Broad Jaccard across level
    if (!match) {
      let bestSim = 0
      let bestCandidate = null
      for (const c of broadCandidates) {
        const sim = jaccardSimilarity(scriptWords, c.words)
        if (sim > bestSim) {
          bestSim = sim
          bestCandidate = c
        }
      }
      if (bestSim >= 0.4 && bestCandidate) {
        match = bestCandidate
      }
    }

    if (match) {
      matchedLessonIds.add(match.id)
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
      unmatchedList.push(`[seq ${script.sequence}] ${script.level} > ${script.strand} > ${script.lesson_name}`)
    }
  }

  console.log(`\nResults: ${matched} matched, ${unmatched} unmatched`)
  if (unmatchedList.length > 0) {
    console.log('\nUnmatched scripts:')
    unmatchedList.forEach(u => console.log(`  - ${u}`))
  }
}

main()
