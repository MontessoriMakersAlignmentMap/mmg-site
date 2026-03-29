'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

const PDF_URL = '/decodable-books-title-sight-word-list.pdf'

const FULL_SERIES_STRIPE = 'https://buy.stripe.com/cNi4gB1rG7T29MXaZP2cg0F'
const FULL_SERIES_IMAGES = [
  '/learning/books/1.png',
  '/learning/books/2.png',
  '/learning/books/3.png',
]

// ─── Sets data ────────────────────────────────────────────────────────────────

const sets = [
  {
    number: 1,
    beadColor: 'Red',
    colorHex: '#DC2626',
    textColor: '#DC2626',
    barBorder: undefined as string | undefined,
    name: 'Set 1 — CVC Words',
    stripeHref: 'https://buy.stripe.com/fZuaEZ1rG6OY8ITaZP2cg0x',
    image: '/learning/books/S1B1 On a Mat.png',
    description:
      'The foundation. Children meet short-vowel CVC words in stories grounded in everyday community life. Every word is fully decodable from the first page.',
    count: 10,
    price: '$79',
    titles: [
      'On a Mat', 'The Hen is Set', 'Kid with a Pin', 'A Box', 'A Cup',
      'Cat, Cup, Cab', 'Rod on Top', 'Mud on a Mat', 'The Top', 'A Dog',
    ],
  },
  {
    number: 2,
    beadColor: 'Green',
    colorHex: '#16A34A',
    textColor: '#16A34A',
    barBorder: undefined as string | undefined,
    name: 'Set 2 — Digraphs',
    stripeHref: 'https://buy.stripe.com/dRm7sN9Ycddm8ITd7X2cg0y',
    image: '/learning/books/S2B1 Chicken Coop.png',
    description:
      'ch, sh, th, wh, and ph in context. Characters navigate friendship, school, and community — language that mirrors real children\'s lives.',
    count: 10,
    price: '$99',
    titles: [
      'Chicken Coop', 'Shh', 'This and That', 'Why, When, What, Where, Which',
      'Thick and Thin', 'Quick Quail', 'Photo Day', 'The Clock', 'I Can Knit', 'Wrap a Gift',
    ],
  },
  {
    number: 3,
    beadColor: 'Light Pink',
    colorHex: '#F9A8D4',
    textColor: '#BE185D',
    barBorder: undefined as string | undefined,
    name: 'Set 3 — Blends',
    stripeHref: 'https://buy.stripe.com/eVqdRbfiwddm6AL6Jz2cg0z',
    image: '/learning/books/S3B1 Drum.png',
    description:
      'Initial and final blends introduced gradually. Stories expand into neighborhood and family contexts, keeping meaning at the center.',
    count: 30,
    price: '$259',
    titles: [
      'Drum', 'Grace', 'Bring it Here', 'A Friend', 'A Lot of Tricks',
      'I Can Print', 'Our Crab', 'Scrub', 'Shrimp', 'Spring Sprouts',
      'String', 'Three Kids', 'The Blizzard', 'The Sled', 'Plants',
      'Flags are Fun', 'Clean Up', 'Glass', 'A Splinter', 'A Scarf',
      'A Sketch', 'What is Smooth', 'Snack', 'Spoons for Soup', 'The Steps',
      'Squares', 'TWINS', 'The Best Act', 'Help by the Shelf', 'Lunch at Camp',
    ],
  },
  {
    number: 4,
    beadColor: 'Yellow',
    colorHex: '#FDE047',
    textColor: '#A16207',
    barBorder: undefined as string | undefined,
    name: 'Set 4 — Endings',
    stripeHref: 'https://buy.stripe.com/cNifZjeesgpye3d1pf2cg0A',
    image: '/learning/books/S4B1 We Sang So Long.png',
    description:
      'Word endings and suffixes in context. Stories build on familiar characters and settings, adding grammatical complexity and depth.',
    count: 5,
    price: '$49',
    titles: [
      'We Sang So Long', 'Squid Ink', 'The Foxes Jumped', 'Jungle Puzzle', 'A Sunny Day',
    ],
  },
  {
    number: 5,
    beadColor: 'Light Blue',
    colorHex: '#BAE6FD',
    textColor: '#0369A1',
    barBorder: undefined as string | undefined,
    name: 'Set 5 — Long Vowel Patterns',
    stripeHref: 'https://buy.stripe.com/bJe28t8U86OY8ITd7X2cg0B',
    image: '/learning/books/S5B1 The Rake.png',
    description:
      'Silent-e and vowel teams. Sentences grow longer; stories grow richer. Children experience the satisfaction of reading more complex text they can still fully decode.',
    count: 6,
    price: '$55',
    titles: [
      'The Rake', 'We Each Got a Leaf', 'The Farm Work',
      'The Rainy Day', 'Parts of a Tree', 'A Day of Art',
    ],
  },
  {
    number: 6,
    beadColor: 'Purple',
    colorHex: '#7C3AED',
    textColor: '#7C3AED',
    barBorder: undefined as string | undefined,
    name: 'Set 6 — R-Controlled Vowels',
    stripeHref: 'https://buy.stripe.com/cNi6oJdao1uE8IT5Fv2cg0C',
    image: '/learning/books/S6B1 Lots of Parts.png',
    description:
      'ar, er, ir, or, ur patterns. Stories move into wider community contexts — libraries, markets, parks — with characters doing meaningful work.',
    count: 5,
    price: '$49',
    titles: [
      'Lots of Parts', 'The Verb', 'Birds on a Branch', 'Maps for Me', 'Our Turtle',
    ],
  },
  {
    number: 7,
    beadColor: 'White',
    colorHex: '#FFFFFF',
    textColor: '#6B7280',
    barBorder: '#CBD5E1' as string | undefined,
    name: 'Set 7 — Multisyllabic Words',
    stripeHref: 'https://buy.stripe.com/9B6cN7dao8X62kv4Br2cg0D',
    image: '/learning/books/S7B1 The Math Shelf.png',
    description:
      'Longer narratives, multi-part stories, and characters whose agency and voice carry the arc. Children build the stamina for sustained reading.',
    count: 15,
    price: '$135',
    titles: [
      'The Math Shelf', 'Field Trip Day', 'Community Day', 'The Birthday', 'Moving Up',
      'The Stamp Game', 'Tran is Glad', 'Flowers in the Class', 'On a Walk', 'Glad to Go',
      'A Tidy Room', 'We Take Care', 'At the Sink', 'A Cold Day in the Yard', 'Sweeping Up',
    ],
  },
  {
    number: 8,
    beadColor: 'Brown',
    colorHex: '#92400E',
    textColor: '#92400E',
    barBorder: undefined as string | undefined,
    name: 'Set 8 — Advanced Phonics Patterns',
    stripeHref: 'https://buy.stripe.com/cNiaEZdao4GQ5wH5Fv2cg0E',
    image: '/learning/books/S8B1 The Curious Cat.png',
    description:
      'All patterns in integrated, fluent prose. Children experience reading as a full act of comprehension, agency, and connection — not decoding practice.',
    count: 15,
    price: '$135',
    titles: [
      'The Curious Cat', 'The Garden Adventure', 'A Lot in August', 'Who Will Join?',
      'Who Will Watch?', 'A New Lesson', 'The Eighth Day', 'Art Studio Piece',
      'The Value of Truth', 'Creation of a Vision', 'Making Great Bread', 'Good Mood Books',
      'Letter Sounds', 'Snow on a Farm', 'Flying High',
    ],
  },
]

// ─── What makes a book decodable ─────────────────────────────────────────────

const decodableTraits = [
  {
    label: 'Phonics Alignment',
    items: [
      'Follows a clear, systematic scope and sequence (e.g., CVC → digraphs → blends)',
      'Matches the child\'s current phonetic knowledge — no skipping ahead',
      'Prioritizes high-frequency sound-spellings before introducing complex patterns',
    ],
  },
  {
    label: 'Limited Irregular Words',
    items: [
      'Early texts include very few irregular ("heart") words',
      'Words like the or said are introduced intentionally — not randomly',
    ],
  },
  {
    label: 'Cumulative Progression',
    items: [
      'Each new skill builds on what has already been mastered',
      'Previously learned patterns are repeated to build automaticity',
    ],
  },
  {
    label: 'Montessori-Aligned Design',
    items: [
      'Clean, uncluttered pages',
      'Realistic, meaningful content',
      'Topics grounded in the child\'s world — nature, practical life, community',
    ],
  },
]

const decodableAvoid = [
  'Predictable or repetitive guessing patterns ("I see a ___")',
  'Mixed or inconsistent phonics patterns',
  'Texts that encourage guessing instead of decoding',
]

// ─── Classroom checklist ──────────────────────────────────────────────────────

const checklistItems = [
  'Do my classroom libraries include books that match the phonics skills already taught?',
  'Are most texts between 85–95% decodable?',
  'Have I identified which books are not decodable and clarified their purpose?',
  'Do families understand what "decodable" actually means?',
  'Do I have enough decodable texts for small groups and independent reading?',
  'Are tricky words (e.g., the, said, was) introduced intentionally?',
  'Am I observing whether children are decoding… or guessing?',
]

const checklistWhy = [
  'Children need practice with exactly what they\'ve been taught',
  'Confidence grows when success is built into the text',
  'Families stay aligned instead of confused by mixed reading approaches',
  'Access matters — repetition builds fluency',
]

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What sets are included?',
    a: 'The series contains 8 sets totaling 96 books. Each set targets a specific phonics pattern or skill cluster and is aligned to the Montessori reading materials sequence. Sets range from 5 to 30 books depending on the breadth of patterns covered.',
  },
  {
    q: 'Are these physical books?',
    a: 'Yes — and digital. Physical books are printed on quality stock with full-color illustration. Digital editions are available as high-resolution PDFs, ideal for schools using tablets or projecting in small groups. Both formats are available through the store.',
  },
  {
    q: 'How do they align to the Montessori materials?',
    a: 'Each set maps to the same sequence a child would progress through with the Montessori reading materials — from the pink series through the blue, green, and beyond. Guides don\'t need to cross-reference a scope and sequence; the series is the sequence.',
  },
  {
    q: 'Can we order single sets or do we need all 96 books?',
    a: 'Sets are available individually. Schools often begin with Sets 1–3 and add as children advance. Bulk pricing is available for full-series orders. Contact us for school and multi-classroom orders.',
  },
]

// ─── Set card with collapsible title list ─────────────────────────────────────

function SetCard({ set }: { set: typeof sets[number] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white border border-[#E2DDD6] p-8 flex gap-6">
      <div
        className="w-1.5 flex-shrink-0 rounded-full"
        style={{
          backgroundColor: set.colorHex,
          border: set.barBorder ? `1px solid ${set.barBorder}` : undefined,
        }}
      />
      <div className="flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="text-[#8A6014] text-[10px] tracking-[0.2em] font-medium uppercase block mb-1">
              SET {set.number} &middot; {set.count} books
            </span>
            <h3 className="text-[#0e1a7a] font-semibold text-base">{set.name}</h3>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {set.image && (
              <div className="relative w-12 h-16 border border-[#E2DDD6] overflow-hidden flex-shrink-0">
                <Image
                  src={set.image}
                  alt={`${set.name} cover`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <p className="text-[#0e1a7a] font-bold text-lg">{set.price}</p>
          </div>
        </div>

        <p className="text-[#374151] text-sm leading-relaxed mb-4">{set.description}</p>

        {/* Actions row */}
        <div className="flex items-center justify-between gap-4 mb-1">
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-[#0e1a7a] text-xs font-medium tracking-wide hover:underline flex items-center gap-1.5 transition-colors"
          >
            {open ? 'Hide titles ↑' : `View ${set.count} titles ↓`}
          </button>
          <a
            href={set.stripeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d6a758] text-white text-xs px-5 py-2 tracking-wide hover:bg-[#c09240] transition-colors font-medium whitespace-nowrap"
          >
            Buy Now →
          </a>
        </div>
        <p className="text-[#64748B] text-[10px] text-right mb-2">Physical books. Ships within 5–7 business days.</p>

        {/* Title list */}
        {open && (
          <div className="mt-4 pt-4 border-t border-[#F2EDE6]">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
              {set.titles.map((title, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                  <span className="text-[#8A6014] flex-shrink-0 text-xs mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DecodableBooksPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Decodable Book Series</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            96 books. 8 sets. Built for the way Montessori teaches reading.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
            Beautiful. Rigorous. Justice-aligned. These are stories designed to build voice,
            confidence, and agency — not just decoding skills.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={FULL_SERIES_STRIPE}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block"
            >
              Order the Series
            </a>
            <Link
              href="/learning/free-resources"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block"
            >
              Get Free Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ── What Makes a Book Decodable ──────────────────────────────────── */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Standard</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
              What makes a book truly decodable?
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              A decodable book is not just &ldquo;simple text.&rdquo; It is intentionally designed
              to align with a child&rsquo;s developing phonics knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {decodableTraits.map((trait) => (
              <div key={trait.label} className="bg-[#FAF9F7] border border-[#E2DDD6] p-7">
                <p className="text-[#0e1a7a] text-sm font-semibold mb-4">{trait.label}</p>
                <ul className="space-y-2">
                  {trait.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#F2EDE6] border border-[#D4CEC6] p-7 max-w-2xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">What to Avoid</p>
            <ul className="space-y-2">
              {decodableAvoid.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
                  <span className="text-red-400 flex-shrink-0 mt-0.5 font-bold">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Why Decodable ────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Science of Reading</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Why decodability matters — especially in Montessori.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              When children know they can read the words before them, they stop guessing and start
              believing they can. That&apos;s the power of decodability — it turns decoding into
              confidence.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              The science of reading is clear: children learn to read most reliably through
              systematic phonics instruction paired with decodable text. Montessori has always
              taught phonics systematically. What was missing were books worthy of that rigor —
              books that were also beautiful, culturally honest, and built for children whose lives
              extend far beyond the white suburban classroom.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              We&apos;re not the lowest cost per book — and that&apos;s intentional. Montessori
              Makers Learning isn&apos;t just about phonics; it&apos;s about literacy as
              liberation.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">What makes this series different</p>
            {[
              'Every word on every page is fully decodable at the point of introduction',
              'Systematic scope and sequence — 8 sets, 96 books, no gaps',
              'Diverse characters in authentic community contexts — not contrived diversity',
              'Illustrations that communicate story, not just decoration',
              'Available in physical and digital editions',
              'Built for independent reading, small group, and guide-led instruction',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Series: 8 Sets with title lists ──────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-6">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Series</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Eight sets. A complete phonics progression.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-2">
              A complete, phonics-aligned progression across 96 decodable books — from first
              sounds to advanced patterns.
            </p>
          </div>

          {/* PDF download */}
          <div className="mb-12">
            <a
              href={PDF_URL}
              download
              className="inline-flex items-center gap-2 bg-white border border-[#D4CEC6] text-[#0e1a7a] text-sm px-6 py-3 tracking-wide hover:border-[#0e1a7a] hover:bg-[#F8F7FF] transition-colors font-medium"
            >
              ↓ Download full scope + sight word list (free)
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {sets.map((set) => (
              <SetCard key={set.number} set={set} />
            ))}
          </div>

          {/* Series summary + PDF repeat */}
          <div className="bg-white border border-[#E2DDD6] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="flex gap-1.5 flex-shrink-0">
                {FULL_SERIES_IMAGES.map((src, i) => (
                  <div key={i} className="relative w-14 h-20 border border-[#E2DDD6] overflow-hidden">
                    <Image src={src} alt={`Full series collage ${i + 1}`} fill className="object-cover" sizes="56px" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Complete Series</p>
                <p className="text-[#0e1a7a] font-bold text-xl mb-1" style={serif}>Full Series — 96 books &mdash; $899</p>
                <p className="text-[#64748B] text-sm">Best value for full classroom or school implementation.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={FULL_SERIES_STRIPE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0e1a7a] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium"
                >
                  Buy Now →
                </a>
                <a
                  href={PDF_URL}
                  download
                  className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
                >
                  Download Title List
                </a>
              </div>
              <p className="text-[#64748B] text-[10px]">Physical books. Ships within 5–7 business days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Justice Alignment ────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#0e1a7a] p-10">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Justice Alignment</p>
            <p className="text-white text-2xl leading-snug mb-8" style={serif}>
              &ldquo;Beautiful. Rigorous. Justice-aligned. These are stories designed to build
              voice, confidence, and agency — not just decoding skills.&rdquo;
            </p>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Literacy is not neutral. Who children see in books — and whether they are
              portrayed with dignity — shapes what they believe is possible.
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Stories about real community experiences.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              Across all 96 books, children encounter characters that reflect the full range of
              human community: families from varied cultural backgrounds, neighborhoods that look
              like real cities and towns, and stories where children exercise agency and voice.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Each set was reviewed not only for phonics accuracy, but for cultural accuracy,
              representational dignity, and the quality of the stories themselves.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto max-w-3xl text-center">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">From the Field</p>
          <blockquote
            className="text-[#0e1a7a] text-2xl md:text-3xl leading-snug mb-8"
            style={serif}
          >
            &ldquo;In forty years of Montessori practice, I&apos;ve never had a decodable series
            that honored both the science and the child. These books do both. My guides pick
            them up and immediately understand what sequence to follow. Children pick them up
            and want to keep reading. That is extraordinarily rare.&rdquo;
          </blockquote>
          <p className="text-[#64748B] text-sm font-semibold tracking-wide">Sandra Worcester</p>
          <p className="text-[#7A8FA3] text-xs mt-1">40+ Year Montessori Professional</p>
        </div>
      </section>

      {/* ── Pricing Summary ──────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Pricing</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Priced by set. Full series and bulk ordering available.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Sets are available individually or as a complete series. Physical and digital
              editions are sold separately. School and multi-classroom bulk pricing is available
              upon request.
            </p>
          </div>
          <div className="bg-[#F2EDE6] border border-[#D4CEC6] p-8 max-w-2xl">
            <div className="space-y-0">
              {sets.map((set) => (
                <div
                  key={set.number}
                  className="flex items-center justify-between gap-6 py-3 border-b border-[#D4CEC6] last:border-0"
                >
                  <div>
                    <p className="text-[#0e1a7a] font-semibold text-sm">{set.name}</p>
                    <p className="text-[#64748B] text-xs mt-0.5">{set.count} titles</p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <span className="text-[#0e1a7a] font-bold text-sm">{set.price}</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <a
                        href={set.stripeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline"
                      >
                        Buy Now →
                      </a>
                      <span className="text-[#94A3B8] text-[9px]">Ships 5–7 business days</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between gap-6 py-4 border-t-2 border-[#C4B99C] mt-2">
                <div>
                  <p className="text-[#0e1a7a] font-bold text-sm">Full Series — 96 books</p>
                  <p className="text-[#64748B] text-xs mt-0.5">Best value for full classroom or school implementation</p>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-[#0e1a7a] font-bold text-base">$899</span>
                  <div className="flex flex-col items-end gap-0.5">
                    <a
                      href={FULL_SERIES_STRIPE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline"
                    >
                      Buy Now →
                    </a>
                    <span className="text-[#94A3B8] text-[9px]">Ships 5–7 business days</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-6 py-3">
                <div>
                  <p className="text-[#0e1a7a] font-semibold text-sm">Bulk / School Orders</p>
                  <p className="text-[#64748B] text-xs mt-0.5">Volume pricing available for multi-classroom orders</p>
                </div>
                <Link
                  href="/contact?source=Decodable%20Books"
                  className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline flex-shrink-0"
                >
                  Contact for pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Classroom Alignment Checklist ────────────────────────────────── */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Classroom Checklist</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Classroom Alignment Checklist for Phonics + Decodable Text
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-8">
              Use this to evaluate whether your classroom library truly supports decoding
              development.
            </p>
            <div className="space-y-0">
              {checklistItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-3.5 border-b border-[#E2DDD6] last:border-0"
                >
                  <div className="w-5 h-5 border border-[#0e1a7a]/30 rounded-sm flex-shrink-0 mt-0.5" />
                  <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why This Matters</p>
            <div className="space-y-4 mb-10">
              {checklistWhy.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <p className="text-[#374151] text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
              <p className="text-[#374151] text-sm leading-relaxed italic">
                Our decodable book series is designed to meet every one of these conditions.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download
                className="inline-flex items-center gap-2 bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium"
              >
                ↓ Download full scope + sight word list (free)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Use ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">In the Classroom</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              How to use these books in your classroom.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                phase: 'Before Reading',
                items: [
                  'Ensure the child has been introduced to the phonics patterns in the text',
                  'Preview any sight or tricky words intentionally',
                  'Set the expectation: we are decoding, not guessing',
                ],
              },
              {
                phase: 'During Reading',
                items: [
                  'Encourage children to sound out unfamiliar words',
                  'Support — but don\'t rescue — productive struggle',
                  'Avoid prompting based on pictures or context clues',
                ],
              },
              {
                phase: 'After Reading',
                items: [
                  'Discuss meaning to support comprehension',
                  'Revisit tricky words through writing or follow-up work',
                  'Re-read texts to build fluency and confidence',
                ],
              },
            ].map((phase) => (
              <div key={phase.phase} className="bg-white border border-[#E2DDD6] p-7">
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-5">{phase.phase}</p>
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Re-reading + Tips ────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why It Works</p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The importance of re-reading.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Re-reading is not repetition for its own sake — it is how fluency is built. Repeated
              exposure allows children to strengthen phonics patterns, increase automatic word
              recognition, and transition from decoding to fluent reading.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              As children experience success with familiar texts, they build both confidence and
              independence. That confidence is what carries them into harder texts.
            </p>
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Tips for Success</p>
            <div className="space-y-0">
              {[
                { label: 'Consistency matters', body: 'Short, regular reading sessions are more effective than long, infrequent ones.' },
                { label: 'Celebrate progress', body: 'Confidence drives engagement. Name what children can do, not just what\'s next.' },
                { label: 'Integrate across modes', body: 'Connect reading, writing, and speaking for deeper learning and retention.' },
              ].map((tip) => (
                <div key={tip.label} className="flex items-start gap-4 py-4 border-b border-[#D4CEC6] last:border-0">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <div>
                    <p className="text-[#0e1a7a] text-sm font-semibold mb-1">{tip.label}</p>
                    <p className="text-[#374151] text-sm leading-relaxed">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">FAQ</p>
            <h2 className="text-3xl text-[#0e1a7a] leading-tight" style={serif}>
              Common questions.
            </h2>
          </div>
          <div className="max-w-3xl space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="py-8 border-b border-[#E2DDD6] first:border-t">
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3">{faq.q}</h3>
                <p className="text-[#374151] text-base leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-white text-2xl max-w-xl" style={serif}>
            Ready to bring the series into your classroom or school?
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={FULL_SERIES_STRIPE}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors whitespace-nowrap"
            >
              Order the Series
            </a>
            <a
              href={PDF_URL}
              download
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors whitespace-nowrap"
            >
              Download Title List
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
