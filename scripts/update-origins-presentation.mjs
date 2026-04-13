import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nhfhvxcmfgunhfdxhcyf.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const mapping = {
  universe: '896712bf-8bad-4bbc-a868-73974e96fda6',
  life: 'e664bb23-8463-4558-b241-6ed8c55492ab',
  humanity: '1f4394d2-8c0e-4bfe-9c23-0e664c626bfc',
  writing: '03632ec1-9df5-465c-bf61-92cdfa1bfb9e',
  math: '2a99fb0b-7389-46ee-9589-28083bcbb026',
}

for (const [key, lessonId] of Object.entries(mapping)) {
  const text = fs.readFileSync(`/tmp/origins_${key}.txt`, 'utf-8')

  const { error } = await supabase
    .from('residency_lessons')
    .update({ presentation: text })
    .eq('id', lessonId)

  if (error) {
    console.error(`Failed ${key}:`, error.message)
  } else {
    console.log(`Updated ${key}: ${text.length} chars`)
  }
}
