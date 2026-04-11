import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'

const FIELD_KEYS = [
  'why_this_lesson_matters',
  'direct_aim',
  'indirect_aim',
  'equity_aim',
  'materials',
  'presentation',
  'points_of_interest',
  'variations',
  'neurodivergence_notes',
] as const

const FIELD_LABELS: Record<string, string> = {
  why_this_lesson_matters: 'Why This Lesson Matters',
  direct_aim: 'Direct Aim',
  indirect_aim: 'Indirect Aim',
  equity_aim: 'Equity Aim',
  materials: 'Materials',
  presentation: 'The Presentation',
  points_of_interest: 'Points of Interest',
  variations: 'Variations and Extensions',
  neurodivergence_notes: 'Neurodivergence and Behavior',
}

const SYSTEM_PROMPT = `You are a Montessori teacher educator reviewing a resident's album entry against a master lesson. Your role is rigorous, caring, and formative. You are not grading — you are coaching the resident toward mastery.

For each field in the album entry, compare the resident's writing against the master lesson content and evaluate:
1. Accuracy — Does the resident's response reflect the key ideas in the master lesson?
2. Completeness — Has the resident addressed the full scope of the field, or are there significant omissions?
3. Voice — Is this clearly written in the resident's own words, showing genuine understanding rather than paraphrase?
4. Depth — Does the response show the resident understands the WHY behind the content, not just the WHAT?

For each field, assign one of three verdicts:
- "complete" — The field demonstrates understanding, accuracy, and personal voice. Minor gaps are acceptable.
- "needs_revision" — The field has meaningful gaps in accuracy, completeness, or depth that need to be addressed. Be specific about what's missing.
- "missing" — The field is empty or so minimal it cannot be evaluated.

Respond with valid JSON only. No markdown, no explanation outside the JSON. Use this exact structure:

{
  "overall_verdict": "passed" | "needs_revision",
  "overall_feedback": "2-3 sentence summary of the entry's strengths and what needs work",
  "fields": {
    "<field_key>": {
      "verdict": "complete" | "needs_revision" | "missing",
      "feedback": "1-2 sentences of specific, actionable feedback for this field"
    }
  }
}

The overall_verdict should be "passed" only if ALL fields are "complete". If ANY field is "needs_revision" or "missing", the overall_verdict must be "needs_revision".

Be encouraging but honest. Name specific things the resident did well. When requesting revision, quote or reference the specific content that needs attention.`

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { entry_id } = body

  if (!entry_id) {
    return NextResponse.json({ error: 'entry_id required' }, { status: 400 })
  }

  // Load the album entry
  const { data: entry, error: entryErr } = await supabase
    .from('residency_album_entries')
    .select('*, lesson:residency_lessons(*)')
    .eq('id', entry_id)
    .single()

  if (entryErr || !entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
  }

  // Build the prompt comparing resident's entry to master lesson
  let userPrompt = `## Master Lesson: ${entry.lesson.title}\n\n`

  for (const key of FIELD_KEYS) {
    const label = FIELD_LABELS[key]
    const masterContent = entry.lesson[key] || '(No master content for this field)'
    const residentContent = entry[key] || '(Empty)'

    userPrompt += `### ${label}\n`
    userPrompt += `**Master Lesson:**\n${masterContent}\n\n`
    userPrompt += `**Resident's Entry:**\n${residentContent}\n\n`
  }

  userPrompt += `\nReview each field and return your evaluation as JSON.`

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    // Extract text from the response
    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('')

    // Parse the JSON response
    let review: any
    try {
      // Handle potential markdown code fences
      const jsonStr = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      review = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json({ error: 'AI returned invalid JSON', raw: responseText }, { status: 500 })
    }

    // Determine revision count
    const { data: existingCycles } = await supabase
      .from('residency_ai_review_cycles')
      .select('cycle_number')
      .eq('entry_id', entry_id)
      .order('cycle_number', { ascending: false })
      .limit(1)

    const nextCycle = (existingCycles?.[0]?.cycle_number || 0) + 1

    // Store the review cycle
    const { data: cycle, error: cycleErr } = await supabase
      .from('residency_ai_review_cycles')
      .insert({
        entry_id,
        cycle_number: nextCycle,
        overall_verdict: review.overall_verdict,
        overall_feedback: review.overall_feedback,
        field_feedback: review.fields,
      })
      .select('id')
      .single()

    if (cycleErr) {
      return NextResponse.json({ error: 'Failed to save review cycle', details: cycleErr.message }, { status: 500 })
    }

    // Update the entry status based on verdict
    const newStatus = review.overall_verdict === 'passed' ? 'ai_passed' : 'ai_review'
    const newAiStatus = review.overall_verdict === 'passed' ? 'passed' : 'needs_revision'

    await supabase
      .from('residency_album_entries')
      .update({
        status: newStatus,
        ai_review_status: newAiStatus,
        revision_count: nextCycle,
        updated_at: new Date().toISOString(),
      })
      .eq('id', entry_id)

    return NextResponse.json({
      cycle_id: cycle.id,
      cycle_number: nextCycle,
      overall_verdict: review.overall_verdict,
      overall_feedback: review.overall_feedback,
      fields: review.fields,
    })
  } catch (err: any) {
    return NextResponse.json({ error: 'AI review failed', details: err.message }, { status: 500 })
  }
}
