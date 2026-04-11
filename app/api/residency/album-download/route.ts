import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
} from 'docx'

const FIELD_CONFIG = [
  { key: 'why_this_lesson_matters', label: 'Why This Lesson Matters' },
  { key: 'direct_aim', label: 'Direct Aim' },
  { key: 'indirect_aim', label: 'Indirect Aim' },
  { key: 'equity_aim', label: 'Equity Aim' },
  { key: 'materials', label: 'Materials' },
  { key: 'presentation', label: 'The Presentation' },
  { key: 'points_of_interest', label: 'Points of Interest' },
  { key: 'variations', label: 'Variations and Extensions' },
  { key: 'neurodivergence_notes', label: 'Neurodivergence and Behavior' },
]

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const residentId = searchParams.get('resident_id')

  if (!residentId) {
    return NextResponse.json({ error: 'resident_id required' }, { status: 400 })
  }

  // Load resident info
  const { data: resident } = await supabase
    .from('residency_residents')
    .select('*, profile:residency_profiles(first_name, last_name), level:residency_levels(name)')
    .eq('id', residentId)
    .single()

  if (!resident) {
    return NextResponse.json({ error: 'Resident not found' }, { status: 404 })
  }

  // Load completed album entries grouped by strand
  const { data: entries } = await supabase
    .from('residency_album_entries')
    .select('*, lesson:residency_lessons(title, sort_order, strand:residency_strands(id, name, sort_order))')
    .eq('resident_id', residentId)
    .eq('status', 'complete')
    .order('created_at')

  if (!entries || entries.length === 0) {
    return NextResponse.json({ error: 'No completed entries to download' }, { status: 400 })
  }

  // Group by strand
  const strandMap = new Map<string, { name: string; sortOrder: number; entries: any[] }>()
  for (const entry of entries) {
    const strandId = entry.lesson?.strand?.id || 'unknown'
    const strandName = entry.lesson?.strand?.name || 'Other'
    const sortOrder = entry.lesson?.strand?.sort_order || 99
    if (!strandMap.has(strandId)) {
      strandMap.set(strandId, { name: strandName, sortOrder, entries: [] })
    }
    strandMap.get(strandId)!.entries.push(entry)
  }

  // Sort strands and entries within strands
  const sortedStrands = Array.from(strandMap.values()).sort((a, b) => a.sortOrder - b.sortOrder)
  for (const strand of sortedStrands) {
    strand.entries.sort((a: any, b: any) => (a.lesson?.sort_order || 0) - (b.lesson?.sort_order || 0))
  }

  const residentName = `${resident.profile?.first_name || ''} ${resident.profile?.last_name || ''}`.trim()
  const levelName = resident.level?.name || ''

  // Build document
  const children: Paragraph[] = []

  // Cover page
  children.push(
    new Paragraph({ spacing: { before: 3000 } }),
    new Paragraph({
      children: [new TextRun({ text: 'Montessori Album', size: 56, bold: true, color: '0E1A7A' })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: levelName, size: 36, color: '0E1A7A' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
    }),
    new Paragraph({ spacing: { before: 600 } }),
    new Paragraph({
      children: [new TextRun({ text: residentName, size: 28, bold: true })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Montessori Makers Residency', size: 24, color: '666666' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), size: 22, color: '999999' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `${entries.length} completed entries across ${sortedStrands.length} strands`, size: 20, color: '999999' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 100 },
    }),
    new Paragraph({ children: [new PageBreak()] }),
  )

  // Table of Contents
  children.push(
    new Paragraph({
      children: [new TextRun({ text: 'Table of Contents', size: 36, bold: true, color: '0E1A7A' })],
      spacing: { after: 400 },
    }),
  )

  for (const strand of sortedStrands) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: strand.name, size: 26, bold: true, color: '0E1A7A' })],
        spacing: { before: 200 },
      }),
    )
    for (const entry of strand.entries) {
      const displayTitle = entry.lesson?.title?.replace(/^(Primary|Elementary): \w[\w\s]*: /, '') || entry.title
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `    ${displayTitle}`, size: 22 })],
          spacing: { before: 60 },
        }),
      )
    }
  }

  children.push(new Paragraph({ children: [new PageBreak()] }))

  // Entry pages
  for (const strand of sortedStrands) {
    // Strand divider
    children.push(
      new Paragraph({
        children: [new TextRun({ text: strand.name, size: 40, bold: true, color: '0E1A7A' })],
        spacing: { before: 400, after: 200 },
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [new TextRun({ text: `${strand.entries.length} entries`, size: 22, color: '999999' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
    )

    for (const entry of strand.entries) {
      const displayTitle = entry.lesson?.title?.replace(/^(Primary|Elementary): \w[\w\s]*: /, '') || entry.title

      // Entry title
      children.push(
        new Paragraph({
          children: [new TextRun({ text: displayTitle, size: 32, bold: true, color: '0E1A7A' })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        }),
      )

      // Structured fields
      for (const field of FIELD_CONFIG) {
        const value = entry[field.key]
        if (!value) continue

        children.push(
          new Paragraph({
            children: [new TextRun({ text: field.label, size: 24, bold: true, color: '333333' })],
            spacing: { before: 300, after: 100 },
          }),
        )

        // Split value by newlines to preserve formatting
        const lines = value.split('\n')
        for (const line of lines) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 22 })],
              spacing: { before: 60, after: 60 },
            }),
          )
        }
      }

      // Mentor feedback section
      if (entry.mentor_strengths || entry.mentor_growth_edge || entry.mentor_practicum_connection) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'Mentor Feedback', size: 24, bold: true, color: 'B8860B' })],
            spacing: { before: 400, after: 100 },
          }),
        )
        if (entry.mentor_strengths) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: 'Strengths: ', size: 22, bold: true, color: '2e7d32' }),
                new TextRun({ text: entry.mentor_strengths, size: 22 }),
              ],
              spacing: { before: 100 },
            }),
          )
        }
        if (entry.mentor_growth_edge) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: 'Growth Edge: ', size: 22, bold: true, color: 'f57f17' }),
                new TextRun({ text: entry.mentor_growth_edge, size: 22 }),
              ],
              spacing: { before: 100 },
            }),
          )
        }
        if (entry.mentor_practicum_connection) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: 'Practicum Connection: ', size: 22, bold: true, color: '0E1A7A' }),
                new TextRun({ text: entry.mentor_practicum_connection, size: 22 }),
              ],
              spacing: { before: 100 },
            }),
          )
        }
      }

      // Page break between entries
      children.push(new Paragraph({ children: [new PageBreak()] }))
    }
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children,
    }],
  })

  const buffer = await Packer.toBuffer(doc)
  const uint8 = new Uint8Array(buffer)

  // Log the download
  await supabase
    .from('residency_album_downloads')
    .insert({
      resident_id: residentId,
      format: 'docx',
      entry_count: entries.length,
    })

  const filename = `${residentName.replace(/\s+/g, '_')}_Album_${levelName}.docx`

  return new NextResponse(uint8, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
