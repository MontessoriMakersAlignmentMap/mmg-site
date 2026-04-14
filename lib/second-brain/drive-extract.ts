import { google, drive_v3 } from 'googleapis'
import mammoth from 'mammoth'
import { extractText, getDocumentProxy } from 'unpdf'
import { getGoogleAuth } from './google-auth'

export type DriveFile = {
  id: string
  name: string
  mimeType: string
  webViewLink: string
  parents: string[]
  modifiedTime: string
}

/**
 * Recursively list every file under a Drive folder (including sub-folders).
 * Skips Google-native formats we can't extract text from (forms, drawings).
 */
export async function listDriveFolderRecursive(folderId: string): Promise<DriveFile[]> {
  const auth = getGoogleAuth()
  const drive = google.drive({ version: 'v3', auth })

  const out: DriveFile[] = []
  const queue: string[] = [folderId]
  const seen = new Set<string>()

  while (queue.length) {
    const current = queue.shift()!
    if (seen.has(current)) continue
    seen.add(current)

    let pageToken: string | undefined
    do {
      const res: { data: drive_v3.Schema$FileList } = await drive.files.list({
        q: `'${current}' in parents and trashed = false`,
        fields: 'nextPageToken, files(id, name, mimeType, webViewLink, parents, modifiedTime)',
        pageSize: 1000,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      })
      const files = res.data.files ?? []
      for (const f of files) {
        if (!f.id) continue
        if (f.mimeType === 'application/vnd.google-apps.folder') {
          queue.push(f.id)
          continue
        }
        out.push({
          id: f.id,
          name: f.name ?? '(untitled)',
          mimeType: f.mimeType ?? '',
          webViewLink: f.webViewLink ?? '',
          parents: f.parents ?? [],
          modifiedTime: f.modifiedTime ?? '',
        })
      }
      pageToken = res.data.nextPageToken ?? undefined
    } while (pageToken)
  }

  return out
}

/**
 * Extract plain-text content from a Drive file. Returns null if the file
 * type is not supported (caller logs and skips).
 *
 * Supported:
 *   - Google Doc       → exported as text/plain
 *   - Google Sheet     → exported as text/csv
 *   - Google Slides    → exported as text/plain
 *   - .docx            → downloaded and parsed with mammoth
 *   - PDF              → downloaded and parsed with unpdf
 *   - text/*, markdown → downloaded as-is
 */
export async function extractDriveFileText(file: DriveFile): Promise<string | null> {
  const auth = getGoogleAuth()
  const drive = google.drive({ version: 'v3', auth })

  // Google-native formats — use export.
  if (file.mimeType === 'application/vnd.google-apps.document') {
    const res = await drive.files.export(
      { fileId: file.id, mimeType: 'text/plain' },
      { responseType: 'text' }
    )
    return typeof res.data === 'string' ? res.data : String(res.data)
  }

  if (file.mimeType === 'application/vnd.google-apps.spreadsheet') {
    const res = await drive.files.export(
      { fileId: file.id, mimeType: 'text/csv' },
      { responseType: 'text' }
    )
    return typeof res.data === 'string' ? res.data : String(res.data)
  }

  if (file.mimeType === 'application/vnd.google-apps.presentation') {
    const res = await drive.files.export(
      { fileId: file.id, mimeType: 'text/plain' },
      { responseType: 'text' }
    )
    return typeof res.data === 'string' ? res.data : String(res.data)
  }

  // Uploaded .docx → download + mammoth.
  if (file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const res = await drive.files.get(
      { fileId: file.id, alt: 'media', supportsAllDrives: true },
      { responseType: 'arraybuffer' }
    )
    const buffer = Buffer.from(res.data as ArrayBuffer)
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  // PDF → download + unpdf (serverless-friendly, no native deps).
  if (file.mimeType === 'application/pdf') {
    const res = await drive.files.get(
      { fileId: file.id, alt: 'media', supportsAllDrives: true },
      { responseType: 'arraybuffer' }
    )
    const bytes = new Uint8Array(res.data as ArrayBuffer)
    const pdf = await getDocumentProxy(bytes)
    const { text } = await extractText(pdf, { mergePages: true })
    return Array.isArray(text) ? text.join('\n\n') : text
  }

  // Plain text-ish: text/plain, text/markdown, text/csv, application/json, etc.
  if (file.mimeType.startsWith('text/') || file.mimeType === 'application/json') {
    const res = await drive.files.get(
      { fileId: file.id, alt: 'media', supportsAllDrives: true },
      { responseType: 'text' }
    )
    return typeof res.data === 'string' ? res.data : String(res.data)
  }

  // Unsupported: PDFs, images, video, audio, etc. Caller logs as 'skipped'.
  return null
}
