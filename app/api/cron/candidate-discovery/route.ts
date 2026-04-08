import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest): boolean {
  // Accept either the cron secret (for scheduled runs) or the admin password (for manual triggers)
  const secret = req.headers.get('x-cron-secret') ?? req.headers.get('authorization')?.replace('Bearer ', '')
  const adminPw = req.headers.get('x-admin-password')
  return (!!secret && secret === process.env.CRON_SECRET) ||
         (!!adminPw && adminPw === process.env.ADMIN_PASSWORD)
}

const SEARCHES = [
  {
    query: 'AMI-credentialed Montessori guides open to new positions',
    prompt: `Search the public web for Montessori educators with AMI (Association Montessori Internationale) credentials who appear to be open to new job opportunities. Look for LinkedIn profiles, personal websites, school bios, or any public professional presence. Return only valid JSON as an array of objects. No markdown, no backticks, no explanation. Each object must have exactly these fields: name (string), location (string or null), credential (string, e.g. "AMI 3-6"), level_experience (string, e.g. "Lead Guide", "Assistant", "Director"), source (string, the URL or platform where found), open_to_work (boolean), bio (string, brief summary), skills (array of strings), profile_url (string or null).`,
  },
  {
    query: 'AMS-credentialed Montessori educators recently listed on school bio pages',
    prompt: `Search the public web for Montessori educators with AMS (American Montessori Society) credentials listed on school staff or bio pages. Also look for any who have recently left positions or whose bios suggest they may be available. Return only valid JSON as an array of objects. No markdown, no backticks, no explanation. Each object must have exactly these fields: name (string), location (string or null), credential (string, e.g. "AMS Primary"), level_experience (string), source (string, URL or platform), open_to_work (boolean), bio (string), skills (array of strings), profile_url (string or null).`,
  },
  {
    query: 'Montessori educators on social media seeking roles',
    prompt: `Search Twitter/X, LinkedIn, and other public social platforms for Montessori educators who have publicly posted that they are seeking new positions, open to work, or job searching. Look for hashtags like #MontessoriJobs #OpenToWork or direct posts. Return only valid JSON as an array of objects. No markdown, no backticks, no explanation. Each object must have exactly these fields: name (string), location (string or null), credential (string or null), level_experience (string), source (string, URL or platform), open_to_work (boolean, should be true for these), bio (string), skills (array of strings), profile_url (string or null).`,
  },
  {
    query: 'equity-focused justice-centered Montessori educators in public community spaces',
    prompt: `Search the public web for Montessori educators who describe themselves as equity-focused, justice-centered, or culturally responsive in their public profiles, articles, or community spaces. Look for blog posts, conference bios, community organization pages, or published work. Return only valid JSON as an array of objects. No markdown, no backticks, no explanation. Each object must have exactly these fields: name (string), location (string or null), credential (string or null), level_experience (string), source (string, URL or platform), open_to_work (boolean), bio (string), skills (array of strings), profile_url (string or null).`,
  },
]

async function runSearch(search: typeof SEARCHES[0]): Promise<Record<string, unknown>[]> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'web-search-2025-03-05',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: search.prompt,
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search',
          max_uses: 5,
        },
      ],
      messages: [
        {
          role: 'user',
          content: `Find Montessori educator candidates matching this search: ${search.query}. Return results as a JSON array only.`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error(`Anthropic API error for "${search.query}":`, err)
    return []
  }

  const data = await response.json()

  // Extract text from the final assistant message
  const textBlock = data.content?.find((b: { type: string }) => b.type === 'text')
  if (!textBlock?.text) return []

  const raw = textBlock.text.trim()

  try {
    // Strip any accidental markdown fences
    const cleaned = raw.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()
    const parsed = JSON.parse(cleaned)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    console.error(`JSON parse failed for "${search.query}":`, raw.slice(0, 200))
    return []
  }
}

async function upsertCandidates(
  supabase: ReturnType<typeof createServiceClient>,
  candidates: Record<string, unknown>[],
  searchQuery: string
) {
  for (const c of candidates) {
    const profileUrl = typeof c.profile_url === 'string' && c.profile_url ? c.profile_url : null
    const name = typeof c.name === 'string' ? c.name : 'Unknown'
    const source = typeof c.source === 'string' ? c.source : ''

    const row = {
      name,
      location: typeof c.location === 'string' ? c.location : null,
      credential: typeof c.credential === 'string' ? c.credential : null,
      level_experience: typeof c.level_experience === 'string' ? c.level_experience : null,
      source,
      open_to_work: typeof c.open_to_work === 'boolean' ? c.open_to_work : false,
      bio: typeof c.bio === 'string' ? c.bio : null,
      skills: Array.isArray(c.skills) ? c.skills.filter((s): s is string => typeof s === 'string') : [],
      profile_url: profileUrl,
      search_query: searchQuery,
    }

    if (profileUrl) {
      // Upsert by profile_url
      await supabase
        .from('candidates')
        .upsert(row, { onConflict: 'profile_url', ignoreDuplicates: false })
    } else {
      // Dedup by name + source — check first
      const { data: existing } = await supabase
        .from('candidates')
        .select('id')
        .eq('name', name)
        .eq('source', source)
        .maybeSingle()

      if (!existing) {
        await supabase.from('candidates').insert(row)
      }
    }
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const results: { query: string; found: number; error?: string }[] = []

  for (const search of SEARCHES) {
    try {
      const candidates = await runSearch(search)
      await upsertCandidates(supabase, candidates, search.query)
      results.push({ query: search.query, found: candidates.length })
    } catch (err) {
      console.error(`Search failed for "${search.query}":`, err)
      results.push({ query: search.query, found: 0, error: String(err) })
    }
  }

  const total = results.reduce((sum, r) => sum + r.found, 0)
  return NextResponse.json({ success: true, total_found: total, searches: results })
}
