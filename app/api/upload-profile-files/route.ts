import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// ─── Limits & allowed types ───────────────────────────────────────────────────

const RESUME_MAX_BYTES = 10 * 1024 * 1024  // 10 MB
const PHOTO_MAX_BYTES  =  5 * 1024 * 1024  //  5 MB
const ALLOWED_PHOTO_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
])

// ─── POST /api/upload-profile-files ──────────────────────────────────────────
// Accepts multipart/form-data with fields:
//   resume  — File (required, PDF only, ≤ 10 MB)
//   photo   — File (optional, image only, ≤ 5 MB)
// Returns: { resumeUrl: string, photoUrl: string | null }
//
// Uses the service-role client so the key never touches the browser.

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const resume = form.get('resume') as File | null
    const photo  = form.get('photo')  as File | null

    // ── Validate resume ───────────────────────────────────────────────────────
    if (!resume || resume.size === 0) {
      return NextResponse.json({ error: 'A PDF resume is required.' }, { status: 400 })
    }
    if (resume.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Resume must be a PDF file.' }, { status: 400 })
    }
    if (resume.size > RESUME_MAX_BYTES) {
      return NextResponse.json({ error: 'Resume must be under 10 MB.' }, { status: 400 })
    }

    // ── Validate photo (if supplied) ──────────────────────────────────────────
    const hasPhoto = photo != null && photo.size > 0
    if (hasPhoto) {
      if (!ALLOWED_PHOTO_TYPES.has(photo!.type)) {
        return NextResponse.json(
          { error: 'Profile photo must be a JPG, PNG, or WebP file.' },
          { status: 400 }
        )
      }
      if (photo!.size > PHOTO_MAX_BYTES) {
        return NextResponse.json({ error: 'Profile photo must be under 5 MB.' }, { status: 400 })
      }
    }

    const supabase = createServiceClient()
    // Each submission gets a shared UUID so resume + photo are co-located
    const id = crypto.randomUUID()

    // ── Upload resume ─────────────────────────────────────────────────────────
    const resumeKey = `${id}.pdf`
    const { error: resumeErr } = await supabase.storage
      .from('resumes')
      .upload(resumeKey, resume, { contentType: 'application/pdf', upsert: false })

    if (resumeErr) {
      console.error('[upload-profile-files] resume error:', resumeErr.message)
      return NextResponse.json(
        { error: 'Resume upload failed. Please try again.' },
        { status: 500 }
      )
    }

    const { data: { publicUrl: resumeUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(resumeKey)

    // ── Upload photo (optional) ───────────────────────────────────────────────
    let photoUrl: string | null = null

    if (hasPhoto) {
      const ext =
        photo!.type === 'image/png'  ? 'png'  :
        photo!.type === 'image/webp' ? 'webp' : 'jpg'
      const photoKey = `${id}.${ext}`

      const { error: photoErr } = await supabase.storage
        .from('profile-photos')
        .upload(photoKey, photo!, { contentType: photo!.type, upsert: false })

      if (photoErr) {
        console.error('[upload-profile-files] photo error:', photoErr.message)
        return NextResponse.json(
          { error: 'Photo upload failed. Please try again.' },
          { status: 500 }
        )
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(photoKey)

      photoUrl = publicUrl
    }

    return NextResponse.json({ resumeUrl, photoUrl })
  } catch (err) {
    console.error('[upload-profile-files] unexpected error:', err)
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
