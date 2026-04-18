export interface Track {
  title: string
  artist: string
  url: string
  attribution: string
  license: string
}

// All tracks: Mr. Smith, "A New Roar" — CC BY 4.0 via Free Music Archive
// Served directly from FMA's CDN. Hannah can swap any URL for a self-hosted file later.
export const PLAYLIST: Track[] = [
  {
    title: 'Neo Soul',
    artist: 'Mr. Smith',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/JVLzvfWgAqImghTm5Boi8GREVRU6JzsGz1NraLTz.mp3',
    attribution: 'Neo Soul by Mr. Smith (A New Roar) via Free Music Archive',
    license: 'CC BY 4.0',
  },
  {
    title: 'Peaceful',
    artist: 'Mr. Smith',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/qv8pEYOombjd3gy9bvrBADsmm30ZXPfXXXdZdAjC.mp3',
    attribution: 'Peaceful by Mr. Smith (A New Roar) via Free Music Archive',
    license: 'CC BY 4.0',
  },
  {
    title: 'Grace',
    artist: 'Mr. Smith',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/drJ7YKffpyTIAdyn1BFa6G7H2JGrh3KcgpbV0kCG.mp3',
    attribution: 'Grace by Mr. Smith (A New Roar) via Free Music Archive',
    license: 'CC BY 4.0',
  },
  {
    title: 'Empathy',
    artist: 'Mr. Smith',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/9nn4pFhxmD3pMLjVYibOY3lNJd1YackQguJtCCO0.mp3',
    attribution: 'Empathy by Mr. Smith (A New Roar) via Free Music Archive',
    license: 'CC BY 4.0',
  },
  {
    title: 'A Moment',
    artist: 'Mr. Smith',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/b2JukTqtqFEEcmlUbvWa8HFptqIivNga0SgRVYJG.mp3',
    attribution: 'A Moment by Mr. Smith (A New Roar) via Free Music Archive',
    license: 'CC BY 4.0',
  },
]
