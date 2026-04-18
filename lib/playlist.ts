export interface Track {
  title: string
  artist: string
  // Direct MP3 URL — replace each placeholder with the actual download link from
  // the FMA page listed in the comment above it.
  url: string
  attribution: string
  license: string
}

// TODO: Hannah — visit each FMA link below, click Download, and copy the direct
// .mp3 URL into the `url` field. All tracks are CC BY 4.0 (free to use with credit).
export const PLAYLIST: Track[] = [
  {
    // https://freemusicarchive.org/music/mr-smith/a-new-roar/neo-soul/
    title: 'Neo Soul',
    artist: 'Mr. Smith',
    url: 'REPLACE_WITH_DIRECT_MP3',
    attribution: 'Neo Soul by Mr. Smith via Free Music Archive',
    license: 'CC BY 4.0',
  },
  {
    // https://freemusicarchive.org/music/Soularflair
    title: 'Soul Purpose',
    artist: 'Soularflair',
    url: 'REPLACE_WITH_DIRECT_MP3',
    attribution: 'Soul Purpose by Soularflair via Free Music Archive',
    license: 'CC BY 4.0',
  },
  {
    // https://freemusicarchive.org/music/mr-smith/
    title: 'Groove Theory',
    artist: 'Mr. Smith',
    url: 'REPLACE_WITH_DIRECT_MP3',
    attribution: 'Groove Theory by Mr. Smith via Free Music Archive',
    license: 'CC BY 4.0',
  },
]
