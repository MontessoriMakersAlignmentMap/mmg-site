import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/lib/second-brain/auth'
import { listDriveFolderRecursive, extractDriveFileText, DriveFile } from '@/lib/second-brain/drive-extract'
import { sha256 } from '@/lib/second-brain/hash'

export const maxDuration = 300 // seconds — Vercel Pro limit

type Body = { folderIds: string[] }

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as Partial<Body>
  const folderIds = Array.isArray(body.folderIds) ? body.folderIds.filter(Boolean) : []
  if (folderIds.length === 0) {
    return NextResponse.json({ error: 'folderIds required' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const stats = { folders: folderIds.length, files: 0, ingested: 0, updated: 0, skipped: 0, errors: 0 }
  const errors: Array<{ file: string; error: string }> = []

  for (const folderId of folderIds) {
    let files: DriveFile[] = []
    try {
      files = await listDriveFolderRecursive(folderId)
    } catch (e) {
      stats.errors++
      errors.push({ file: `folder:${folderId}`, error: (e as Error).message })
      await supabase.from('sb_ingest_log').insert({
        action: 'ingest_drive',
        status: 'error',
        notes: `Failed to list folder ${folderId}: ${(e as Error).message}`,
      })
      continue
    }

    stats.files += files.length

    for (const file of files) {
      try {
        const text = await extractDriveFileText(file)
        if (text === null) {
          stats.skipped++
          await supabase.from('sb_ingest_log').insert({
            action: 'ingest_drive',
            status: 'skipped',
            notes: `Unsupported mime: ${file.mimeType} (${file.name})`,
            metadata: { drive_file_id: file.id, mime_type: file.mimeType },
          })
          continue
        }

        const hash = sha256(text)

        // Idempotent upsert: if the hash already matches, don't touch compiled_at.
        const { data: existing } = await supabase
          .from('sb_raw_sources')
          .select('id, content_hash')
          .eq('source_type', 'drive')
          .eq('external_id', file.id)
          .maybeSingle()

        if (existing && existing.content_hash === hash) {
          stats.skipped++
          continue
        }

        const row = {
          source_type: 'drive',
          external_id: file.id,
          url: file.webViewLink,
          title: file.name,
          mime_type: file.mimeType,
          content: text,
          content_hash: hash,
          metadata: {
            modified_time: file.modifiedTime,
            parents: file.parents,
            root_folder_id: folderId,
          },
          fetched_at: new Date().toISOString(),
          compiled_at: null, // force recompile
        }

        if (existing) {
          await supabase.from('sb_raw_sources').update(row).eq('id', existing.id)
          stats.updated++
        } else {
          await supabase.from('sb_raw_sources').insert(row)
          stats.ingested++
        }
      } catch (e) {
        stats.errors++
        errors.push({ file: `${file.name} (${file.id})`, error: (e as Error).message })
        await supabase.from('sb_ingest_log').insert({
          action: 'ingest_drive',
          status: 'error',
          notes: `Failed on ${file.name}: ${(e as Error).message}`,
          metadata: { drive_file_id: file.id },
        })
      }
    }
  }

  await supabase.from('sb_ingest_log').insert({
    action: 'ingest_drive',
    status: stats.errors > 0 ? 'error' : 'ok',
    notes: `Folders:${stats.folders} Files:${stats.files} Ingested:${stats.ingested} Updated:${stats.updated} Skipped:${stats.skipped} Errors:${stats.errors}`,
    metadata: { stats },
  })

  return NextResponse.json({ ok: true, stats, errors: errors.slice(0, 20) })
}
