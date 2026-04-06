import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

// ─── Payment links ────────────────────────────────────────────────────────────

const PRIMARY_LINK   = 'https://buy.stripe.com/cNi7sN6M06OYcZ94Br2cg0Y'
const ELEMENTARY_LINK = 'https://buy.stripe.com/00w14p5HW0qA7EP2tj2cg0Z'
const COMPLETE_LINK  = 'https://buy.stripe.com/3cI14pc6kb5e0cnfg52cg10'

// ─── Map data ─────────────────────────────────────────────────────────────────

const primaryMaps = [
  {
    name: 'Color Map',
    description: 'Full Montessori continent colors with white borders between continents. The foundational reference — matches the puzzle map in color exactly.',
    preview: '/mmg-maps/final_primary_color.png',
  },
  {
    name: 'Blank Map',
    description: 'Soft tints of each continent color on a less visually dominant field. For labeling, identification work, and guided lessons.',
    preview: '/mmg-maps/final_primary_blank.png',
  },
  {
    name: 'Outline Map',
    description: 'White landmasses with thin dark outlines against light blue ocean. Designed for tracing, coloring, and pin-poking work.',
    preview: '/mmg-maps/final_primary_outline.png',
  },
]

const elementaryMaps = [
  {
    name: 'Political Map',
    description: 'Full Montessori continent colors with thin white country borders and thicker continent outlines. Every country visible and classified.',
    preview: '/mmg-maps/final_elementary_political.png',
  },
  {
    name: 'Blank Map',
    description: 'Soft tints with visible country borders throughout. Built for labeling countries, capitals, and geographic features.',
    preview: '/mmg-maps/final_elementary_blank.png',
  },
  {
    name: 'Outline Map',
    description: 'Clean line drawing on white with both country and continent borders, no color fill. For research, tracing, and student-driven map work.',
    preview: '/mmg-maps/final_elementary_outline.png',
  },
]

const colorSystem = [
  { continent: 'North America', color: '#E8751A', label: 'Orange' },
  { continent: 'South America', color: '#E8357A', label: 'Pink' },
  { continent: 'Europe',        color: '#CC2222', label: 'Red' },
  { continent: 'Asia',          color: '#E8C832', label: 'Yellow' },
  { continent: 'Africa',        color: '#2D8A2D', label: 'Green' },
  { continent: 'Oceania',       color: '#8B5E3C', label: 'Brown' },
  { continent: 'Antarctica',    color: '#E8E8E8', label: 'White' },
]

const formats = [
  {
    name: 'PNG',
    detail: '300 DPI',
    description: 'Print-ready for any classroom printer. Display on screen or print at any standard paper size.',
  },
  {
    name: 'PDF',
    detail: 'Vector quality',
    description: 'Scale to any size without loss. Ideal for large-format printing, laminating, or professional production.',
  },
  {
    name: 'SVG',
    detail: 'Fully editable',
    description: 'Open in Illustrator, Inkscape, or Figma. Adapt colors, add labels, or produce custom versions for your program.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MapsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Authagraph Map Collection
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              World maps built for Montessori. Built correctly.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-2xl">
              Authagraph projection. Accurate continent proportions. The standard Montessori
              color system matched exactly to well-known Montessori puzzle map colors. Two sets —
              one for Primary, one for Elementary — each in three versions and three
              production-quality formats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={COMPLETE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Get the Complete Collection — $99
              </a>
              <a
                href="#sets"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Browse individual sets →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THESE MAPS ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why These Maps</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Most maps children encounter are wrong. These are not.
            </h2>
            <div className="space-y-6 text-[#374151] text-base leading-relaxed">
              <p>
                The Mercator projection — the map most children see in classrooms, on walls,
                and on screens — was designed in 1569 for maritime navigation. It dramatically
                distorts landmass sizes, making Europe and North America appear far larger
                than they are relative to Africa, South America, and Asia. Children who learn
                geography from Mercator maps carry a distorted picture of the world into adulthood.
              </p>
              <p>
                These maps use the <strong>Authagraph projection</strong>, developed by Japanese
                architect Hajime Narukawa and adopted by Japanese schools as their national geography
                standard in 2016. It projects the globe onto a tetrahedron to minimize distortion
                across the entire surface — no region is systematically inflated or diminished.
                Africa is the size Africa actually is. Greenland is smaller than Africa, as it should be.
                South America is larger than Europe, as it is. This is not a political choice — it is
                an accurate one.
              </p>
              <p>
                Montessori geography work introduces the seven continents as the foundational
                geographic structure of the Earth. The puzzle map gives children a physical,
                tactile relationship with those continents in their true shapes and relative sizes.
                These maps extend that work — they are what the puzzle map looks like on paper,
                built to the same color standard, available in every format a classroom needs.
              </p>
            </div>
          </div>

          {/* What makes them different — 3 columns */}
          <div className="grid md:grid-cols-3 gap-8 border-t border-[#E2DDD6] pt-12">
            {[
              {
                label: 'Authagraph Projection',
                body: 'Developed in Japan and adopted as a national geography standard in 2016. Minimizes distortion across the entire surface — no continent is inflated or diminished.',
              },
              {
                label: 'Exact Color Match',
                body: 'Every continent color is matched precisely to the standard Montessori puzzle map colors. Children move between the physical and printed materials without visual contradiction.',
              },
              {
                label: 'Plane-Appropriate Data',
                body: 'Primary maps use simplified geographic data — clean, bold, uncluttered. Elementary maps use high-resolution data with country borders and the pedagogically accurate Russia split at the Urals.',
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <div className="w-0.5 h-8 bg-[#d6a758] mb-5" />
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3" style={serif}>{label}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLOR SYSTEM ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-16 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Color System</p>
          <h2 className="text-2xl text-[#0e1a7a] mb-8 max-w-xl leading-snug" style={serif}>
            Seven continents. Seven colors. Matched to the standard.
          </h2>
          <div className="flex flex-wrap gap-3">
            {colorSystem.map(({ continent, color, label }) => (
              <div key={continent} className="flex items-center gap-3 bg-white border border-[#E2DDD6] px-4 py-3">
                <div
                  className="w-5 h-5 flex-shrink-0 border border-black/10"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-[#374151] text-sm font-medium leading-none">{continent}</p>
                  <p className="text-[#94A3B8] text-[11px] mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATS ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Every Map Ships In Three Formats</p>
          <div className="grid md:grid-cols-3 gap-6">
            {formats.map(({ name, detail, description }) => (
              <div key={name} className="bg-[#FAF9F7] border border-[#E2DDD6] p-7">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[#0e1a7a] font-bold text-lg" style={serif}>{name}</span>
                  <span className="text-[#8A6014] text-[10px] tracking-[0.15em] uppercase">{detail}</span>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SETS ─────────────────────────────────────────────────────────── */}
      <section id="sets" className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">The Sets</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4 max-w-2xl" style={serif}>
            Two sets. Built for two developmental planes.
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-16 max-w-2xl">
            Primary maps are simplified and bold — designed for the child building their first
            relationship with the continents. Elementary maps carry the full weight of geographic
            research — country borders, geopolitically accurate continent assignments, and the
            detail level that supports real inquiry.
          </p>

          {/* Primary Set */}
          <div className="bg-white border border-[#E2DDD6] mb-10">
            <div className="p-8 md:p-10 border-b border-[#E2DDD6]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">Primary Set · Ages 3–6</p>
                  <h3 className="text-2xl text-[#0e1a7a] mb-4" style={serif}>
                    Three maps. Clean, bold, uncluttered.
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed mb-4">
                    Built from simplified geographic data so the continent shapes are clean and
                    unambiguous. No coastline fussiness, no country borders. Just the seven continents
                    in honest proportion against a blue ocean. Russia is shown whole as part of Asia,
                    consistent with how typical Montessori puzzle maps represent it.
                  </p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Each map ships in PNG (300 DPI), PDF, and SVG — 9 files total.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[#0e1a7a] text-3xl font-semibold mb-1" style={serif}>$55</p>
                  <p className="text-[#94A3B8] text-xs mb-4">9 files · instant download</p>
                  <a
                    href={PRIMARY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#0e1a7a] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium"
                  >
                    Buy Primary Set
                  </a>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E2DDD6]">
              {primaryMaps.map(({ name, description, preview }) => (
                <div key={name} className="p-6 md:p-8">
                  <div className="aspect-[4/3] bg-[#FAF9F7] border border-[#E2DDD6] mb-5 overflow-hidden relative">
                    <Image
                      src={preview}
                      alt={name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h4 className="text-[#0e1a7a] font-semibold text-sm mb-2" style={serif}>{name}</h4>
                  <p className="text-[#374151] text-xs leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Elementary Set */}
          <div className="bg-white border border-[#E2DDD6] mb-16">
            <div className="p-8 md:p-10 border-b border-[#E2DDD6]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">Elementary Set · Ages 6–12</p>
                  <h3 className="text-2xl text-[#0e1a7a] mb-4" style={serif}>
                    Three maps. Country borders. Research-ready.
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed mb-4">
                    Built from higher-resolution geographic data with visible country borders throughout.
                    Russia is split at the Ural Mountains (60°E longitude) — the western portion shown
                    in red as part of Europe, the eastern portion in yellow as part of Asia. This is the
                    geographically accurate treatment and supports the kind of classification work
                    elementary students do.
                  </p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Each map ships in PNG (300 DPI), PDF, and SVG — 9 files total.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[#0e1a7a] text-3xl font-semibold mb-1" style={serif}>$65</p>
                  <p className="text-[#94A3B8] text-xs mb-4">9 files · instant download</p>
                  <a
                    href={ELEMENTARY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#0e1a7a] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium"
                  >
                    Buy Elementary Set
                  </a>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E2DDD6]">
              {elementaryMaps.map(({ name, description, preview }) => (
                <div key={name} className="p-6 md:p-8">
                  <div className="aspect-[4/3] bg-[#FAF9F7] border border-[#E2DDD6] mb-5 overflow-hidden relative">
                    <Image
                      src={preview}
                      alt={name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h4 className="text-[#0e1a7a] font-semibold text-sm mb-2" style={serif}>{name}</h4>
                  <p className="text-[#374151] text-xs leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Collection CTA */}
          <div className="bg-[#0e1a7a] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-4">Best Value</p>
              <h3 className="text-2xl md:text-3xl text-white leading-tight mb-4" style={serif}>
                Complete Collection — both sets, all 18 files.
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Primary Set and Elementary Set together. Every map, every format. Save $21
                versus buying separately. One download, immediate access.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-right">
              <p className="text-white text-4xl font-semibold mb-1" style={serif}>$99</p>
              <p className="text-[#94A3B8] text-xs mb-5">18 files · instant download</p>
              <a
                href={COMPLETE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
              >
                Get the Complete Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Part of the MMG Learning Collection</p>
            <p className="text-[#374151] text-base leading-relaxed">
              The Authagraph Map Collection is part of a broader set of classroom-ready materials
              built to the same standard — accurate, beautiful, and grounded in Montessori philosophy.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link
              href="/learning"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Explore all Learning materials
            </Link>
            <Link
              href="/learning/origins"
              className="text-[#64748B] text-xs text-center hover:text-[#0e1a7a] transition-colors"
            >
              See the Origins Series →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
