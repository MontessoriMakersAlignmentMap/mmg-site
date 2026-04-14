import sitemap from '@/app/sitemap'

/**
 * Returns the full list of canonical MMG page URLs from the app's sitemap.
 * Single source of truth — no separate crawler config to drift.
 */
export function getSiteUrls(): string[] {
  return sitemap().map((entry) => entry.url)
}

/**
 * Fetch a page and return a plain-text extraction of its main content.
 *
 * Extraction is deliberately simple: pull the <main> element if present,
 * else <body>, then strip script/style/nav/footer, then collapse tags and
 * whitespace. Good enough for ingesting our own site, where we control
 * the markup and don't need to handle hostile pages.
 */
export async function scrapePage(url: string): Promise<{ title: string; content: string } | null> {
  const res = await fetch(url, {
    headers: { 'user-agent': 'MMG-SecondBrain/1.0 (+montessorimakersgroup.org)' },
  })
  if (!res.ok) return null
  const html = await res.text()

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  const title = titleMatch?.[1]?.trim() || url

  // Prefer <main>; fall back to <body>.
  let scope =
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
    html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ??
    html

  // Drop chrome: nav, header, footer, script, style, noscript, svg.
  scope = scope
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')

  // Tags → spaces, collapse whitespace, decode a few common entities.
  const text = scope
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()

  return { title, content: text }
}
