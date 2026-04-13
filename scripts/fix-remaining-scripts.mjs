import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nhfhvxcmfgunhfdxhcyf.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const SCRIPT_DIR = path.join(process.env.HOME, 'Desktop/Montessori Albums/Residency Albums')

function parseScriptFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const hasSeps = /^---$/m.test(content)
  const entries = []

  if (hasSeps) {
    const blocks = content.split(/^---$/m).filter(b => b.trim())
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]
      const lesson = block.match(/(?:##?\s*)?LESSON:\s*(.+)/i)
      if (!lesson) continue
      const strand = block.match(/\*{0,2}STRAND:\*{0,2}\s*(.+)/i)
      const level = block.match(/\*{0,2}LEVEL:\*{0,2}\s*(.+)/i)
      const seq = block.match(/\*{0,2}SEQUENCE:\*{0,2}\s*(\d+)/i)
      let scriptText = ''
      const next = blocks[i + 1]
      if (next && !next.match(/(?:##?\s*)?LESSON:/i)) {
        scriptText = next.trim()
      } else {
        const lines = block.split('\n')
        let metaEnd = 0
        for (let j = 0; j < lines.length; j++) {
          if (/SEQUENCE:|LEVEL:|STRAND:|LESSON:/i.test(lines[j])) metaEnd = j
        }
        scriptText = lines.slice(metaEnd + 1).join('\n').trim()
      }
      if (!scriptText) continue
      entries.push({ lesson_name: lesson[1].trim(), strand: strand?.[1]?.trim().replace(/\*+/g,'').trim() || '', level: level?.[1]?.trim().replace(/\*+/g,'').trim() || '', sequence: seq ? parseInt(seq[1]) : null, script: scriptText })
    }
  } else {
    const chunks = content.split(/(?=^LESSON:\s)/m).filter(c => c.trim())
    for (const chunk of chunks) {
      const lesson = chunk.match(/^LESSON:\s*(.+)/i)
      if (!lesson) continue
      const strand = chunk.match(/^STRAND:\s*(.+)/mi)
      const level = chunk.match(/^LEVEL:\s*(.+)/mi)
      const seq = chunk.match(/^SEQUENCE:\s*(\d+)/mi)
      const lines = chunk.split('\n')
      let metaEnd = 0
      for (let j = 0; j < lines.length; j++) {
        if (/^(LESSON|STRAND|LEVEL|SEQUENCE):/i.test(lines[j])) metaEnd = j
      }
      const scriptText = lines.slice(metaEnd + 1).join('\n').trim()
      if (!scriptText) continue
      entries.push({ lesson_name: lesson[1].trim(), strand: strand?.[1]?.trim() || '', level: level?.[1]?.trim() || '', sequence: seq ? parseInt(seq[1]) : null, script: scriptText })
    }
  }
  return entries
}

// Manual mapping: script lesson name -> DB lesson id
const MANUAL_MAP = {
  // Elementary Biology
  'Plants: Overview and Classification': 'e1ea2f97-d95c-4bed-97ae-1b787faddbf7',
  'Introduction to Invertebrates': '627a0e25-ef56-40c3-b1ab-af4149b11ea5',
  // Elementary Geography
  'Plate Tectonics': '8746d727-1db9-47f5-ae43-adba4d2a29a8',
  'Spread of Vegetation Across the Earth': '7713f5cc-fc7c-444f-b8fc-c8f4b7b999b1',
  // Elementary Geometry
  'Angles: Classification and Naming': 'd8b3c6dd-0771-4576-b866-d8d4da636a41',
  // Elementary History
  'Timeline of Your Country': '33b26692-69a9-4377-8887-a6e5e84a4f39',
  'History Review and Integration (Continued)': '3027a148-e611-41f2-8387-0f4054768b8e',
  // Elementary Language
  'History of Written Language Part 2': '5be05a93-3951-49bf-9d7d-dd6aa8e8da75',
  'Integration and Ongoing Growth': 'b753c376-9953-4375-8bea-6a415177a162',
  // Elementary Mathematics
  'Elementary Mathematics Mastery and Beyond': '332c8fce-2d2a-4cdb-bcfb-c7c6c5ef1c78',
  // Elementary Theory (concatenated titles in DB)
  'How to Give a Presentation: Preparation and Delivery': 'ec922971-dd06-4147-84d0-492720e358a5',
  'How to Give a Presentation: Following the Child': '58d70a4e-e5d5-4edf-8f3f-ed2d2cfa65f9',
  'The Work of the Child: Meaningful Activity': '35b5ac46-64f0-4c37-80b1-5a07d4eacb0a',
  'The Work of the Child: Concentration and Flow': '5e4ab503-9238-4354-b75f-31f74d009536',
  'Observation Techniques and Recording': '29a0b94a-ed6f-4713-948c-1968ff1a5f44',
  'Going Out: Field Work and Community Connection': '1963dccc-ed90-4b45-ba8f-f6acb2b86074',
  'Grace and Courtesy in the Elementary Classroom': '7241376d-8d1a-4d7b-80fd-e94b2fb1af85',
  'Freedom and Responsibility: Balance and Boundaries': '001fe023-98a7-4770-b6be-085b50f604b9',
  'The 9-12 Class: Community and Advanced Work': '853b9418-b093-433b-a929-65f00ca96c9b',
  'Planning: Curriculum Planning and Pacing': 'e607d1ec-8c68-4557-a0f6-db74e8a82bfa',
  'Record Keeping: Tracking Progress and Development': '0e7757be-4060-48f8-b7e3-4004491f06a7',
  'Assessment: Evaluation Methods and Tools': 'c7c7cf03-b406-4532-89f9-d49e63b3fa8a',
  'Planning the First Days: Setting Community Tone': 'f8277491-a75f-402c-93c9-e497bc2b8e98',
  'Running a Montessori Elementary Classroom: Practical Management': '6a67ed96-dd60-4de2-ad3f-360c8c16b404',
  'Equity and Justice in the Elementary Classroom': '166afe63-1a3c-4130-bfb9-83f993017be7',
  'Your Elementary Philosophy of Education': 'f5674eed-9dab-4f30-87b6-b0c365fd1180',
  // Primary Language
  'Decodable Books: Digraphs and Blends': 'b94493b9-0489-4c20-a7b7-15399349c065',
  'Decodable Books: Advanced Patterns': 'fae8f7bf-97eb-4815-98a6-92d714b556f7',
  'Reading Analysis Stage 1, Simple Sentences': 'daa45912-d10b-4e99-9e07-b10b0747fa2d',
  'Reading Analysis Stage 2, Simple Sentences with Named Elements': '90a8f3c6-4de6-4ba7-9342-d7521ba65050',
  'Geography Extensions, Land and Water Form Folders': '3b06b948-8f08-42b7-8c6c-e8ee5f0562b1',
  'Art Expression, Introduction and Foundational Exercises': 'c79db86f-0444-45a4-ad46-4c138e1ae590',
  'Art Expression, Painting, Clay, and Stitching': '6f693954-7921-4b44-8bb6-10b2bf779143',
  // Primary Mathematics
  'Formation of Numbers with Beads and Cards': '66eedbc7-6f66-438a-ac64-1e59954be14a',
  'Introduction to Teens with Beads': '1bc7d61c-5dd8-46a9-863e-369e43875acb',
  // Primary Practical Life
  'Carrying a Tray': '76473fb0-d75d-453c-b5c8-1a935586e79e',
  'Carrying a Chair': '5c0c270f-40b6-4714-8988-4e3f9397684e',
  'Moving a Table': 'a57f26c5-3e84-4a08-995a-684a4506ca00',
  'Rolling a Rug': 'dde03328-f266-4fe1-9172-12e26fec75c9',
  'Filling a Pitcher with Water': '1b55d12a-886c-48c2-b14e-c4c8f541c453',
  'Using a Sponge': '56c7807c-54c3-4059-a218-5ca148c70eef',
  'Emptying a Bucket': 'cb5ce74e-b341-4461-a6e3-34bdbebbf868',
  'Washing Clothes': '0fd503d1-635c-45ea-ba5c-6d8dbdb16eda',
  // Primary Theory
  'Disability Justice and Neurodiversity': '54144a91-6cc0-4a1e-98e9-2a5bdccf6dcc',
}

async function main() {
  const files = fs.readdirSync(SCRIPT_DIR).filter(f => f.startsWith('Video_Scripts_') && f.endsWith('.md'))
  const allScripts = []
  for (const file of files) {
    allScripts.push(...parseScriptFile(path.join(SCRIPT_DIR, file)))
  }

  let fixed = 0
  for (const script of allScripts) {
    const id = MANUAL_MAP[script.lesson_name]
    if (!id) continue

    const { error } = await supabase
      .from('residency_lessons')
      .update({ script_introduction: script.script })
      .eq('id', id)

    if (error) {
      console.error(`Failed: ${script.lesson_name} -> ${error.message}`)
    } else {
      fixed++
      console.log(`Matched: ${script.lesson_name}`)
    }
  }

  console.log(`\nFixed ${fixed} additional matches`)
}

main()
