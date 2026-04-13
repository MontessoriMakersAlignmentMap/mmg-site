import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  'https://nhfhvxcmfgunhfdxhcyf.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const ORIGINS_DIR = path.join(process.env.HOME, 'Desktop/mmg-origins-complete-bundle copy')

const files = [
  { file: 'origins-of-the-universe.pdf', lessonId: '896712bf-8bad-4bbc-a868-73974e96fda6', name: 'Origins of the Universe' },
  { file: 'origins-of-life.pdf', lessonId: 'e664bb23-8463-4558-b241-6ed8c55492ab', name: 'Origins of Life' },
  { file: 'origins-of-humanity.pdf', lessonId: '1f4394d2-8c0e-4bfe-9c23-0e664c626bfc', name: 'Origins of Humanity' },
  { file: 'origins-of-writing.pdf', lessonId: '03632ec1-9df5-465c-bf61-92cdfa1bfb9e', name: 'Origins of Writing' },
  { file: 'origins-of-math.pdf', lessonId: '2a99fb0b-7389-46ee-9589-28083bcbb026', name: 'Origins of Mathematics' },
]

async function main() {
  for (const { file, lessonId, name } of files) {
    const filePath = path.join(ORIGINS_DIR, file)
    const fileBuffer = fs.readFileSync(filePath)
    const storagePath = `great-lessons/${file}`

    // Upload to storage
    const { data, error } = await supabase.storage
      .from('residency')
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      })

    if (error) {
      console.error(`Upload failed for ${name}:`, error.message)
      continue
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('residency')
      .getPublicUrl(storagePath)

    const publicUrl = urlData.publicUrl
    console.log(`Uploaded ${name}: ${publicUrl}`)

    // Update lesson record
    const { error: updateErr } = await supabase
      .from('residency_lessons')
      .update({ teaching_package_url: publicUrl })
      .eq('id', lessonId)

    if (updateErr) {
      console.error(`DB update failed for ${name}:`, updateErr.message)
    } else {
      console.log(`Updated lesson: ${name}`)
    }
  }
}

main()
