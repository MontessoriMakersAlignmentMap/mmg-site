import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Research Behind Decodable Books',
  description:
    'Why decodable books work — the science of reading research that informs every decision in the Montessori Makers decodable series.',
}

const serif = { fontFamily: 'var(--font-heading)' }

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: 'decodability-percentage',
    label: 'Decodability Percentage',
    headline: 'Why 95% decodable is the standard — and how most books fall short.',
    body: [
      `Research is clear that children learning to read benefit most when the texts they encounter closely match what they already know. The National Reading Panel and subsequent meta-analyses consistently show that decodable texts — books where the vast majority of words use phonics patterns already taught — produce stronger decoding outcomes than leveled readers or mixed-method texts.`,
      `What does "decodable" actually mean as a percentage? Most state science-of-reading mandates in the United States have coalesced around 75–85% controlled phonics as a minimum standard. Our books average 95%+ decodable words at each set level — meaning virtually every word a child encounters has already been introduced through systematic instruction. We don't use that number as a marketing claim. We use it because that's what the research supports.`,
      `The remaining words are almost entirely high-frequency "heart words" (words like the, was, said) introduced intentionally, with explicit instruction — not dropped in randomly and hoped for the best. That distinction matters. A book that is "75% decodable" but scatters irregular words unpredictably forces children into guessing. A book that is 95% decodable with deliberate sight word placement gives children every reason to trust the code.`,
    ],
    callout: {
      stat: '95%+',
      label: 'average decodability across all 96 books',
      note: 'vs. the 75–85% minimum in most state mandates',
    },
  },
  {
    id: 'three-cueing',
    label: 'The Death of Three-Cueing',
    headline: 'Three-cueing was not a reading strategy. It was a workaround.',
    body: [
      `For decades, the dominant framework for teaching reading told children to use three cues to figure out unfamiliar words: meaning (does this make sense?), syntax (does this sound right?), and visual/graphophonic cues (does it look right?). This approach, developed from Ken Goodman's research in the 1960s and formalized in programs like Reading Recovery and Fountas & Pinnell's Guided Reading, became the backbone of Balanced Literacy.`,
      `The problem: Goodman's research was conducted on fluent adult readers, not developing readers. When skilled readers misread a word, they do rely on context to self-correct. But teaching children to use context before phonics — or instead of phonics — teaches them to guess, not to read.`,
      `Eye movement research has since shown definitively that skilled readers look at every letter in every word, every time (Rayner & Pollatsek, 1989). They do not skim shapes or guess from pictures. What looks like "reading from context" in a fluent reader is rapid phonological processing that has become automatic — not a cue-based workaround.`,
      `As of 2024, three-cueing has been banned or explicitly prohibited in Arkansas, Ohio, Mississippi, and several other states. A 2023 study found that Reading Recovery — the flagship three-cueing intervention — was associated with "statistically significant and substantially negative" long-term outcomes in 3rd and 4th grade reading scores.`,
      `Decodable books are the instructional antidote to three-cueing. When every word is decodable, children have no need for picture cues, context guessing, or shape recognition. They are practicing the actual skill — phonological decoding — every time they open a book.`,
    ],
    callout: {
      stat: '2023',
      label: 'Reading Recovery found to produce negative long-term outcomes',
      note: 'statistically significant harm in 3rd and 4th grade reading scores',
    },
  },
  {
    id: 'orthographic-mapping',
    label: 'Orthographic Mapping',
    headline: 'How children go from decoding to sight-reading — and why decodables accelerate it.',
    body: [
      `One of the most important developments in reading science over the past two decades is a clearer understanding of how words move from "words I have to decode" to "words I recognize instantly." The process is called orthographic mapping, and it was largely described by researcher Linnea Ehri.`,
      `Orthographic mapping is the mechanism by which the brain permanently bonds a word's spelling to its pronunciation and meaning. It is not about memorizing word shapes. It is about making the letter-sound connections so thoroughly that they become automatic. A child who has truly mapped a word doesn't have to decode it — they recognize it immediately, the same way a skilled reader does.`,
      `Here is the critical insight: orthographic mapping is driven by phonemic awareness paired with phonics instruction. Children need to be able to segment the sounds in spoken words AND connect those sounds to the corresponding letters. Decodable books are the mechanism that makes this happen at scale. Every time a child decodes a word correctly in a decodable text, they are building the phonological-orthographic connections that will eventually allow them to recognize that word automatically.`,
      `Books that allow guessing — or that ask children to read words they haven't been taught — interrupt orthographic mapping. They give the brain no clean path to store the word. Decodable books, by contrast, are practice environments for exactly the phoneme-grapheme connections the child is building. The result is a sight word vocabulary that grows rapidly through successful decoding — not through memorization.`,
    ],
    callout: {
      stat: 'Ehri (2022)',
      label: 'Orthographic mapping requires phonemic awareness + phonics — not memorization',
      note: 'Linnea Ehri, NYU — foundational research on sight word development',
    },
  },
  {
    id: 'scope-and-sequence',
    label: 'Scope and Sequence',
    headline: 'The sequence isn\'t arbitrary. It maps to how the brain builds reading.',
    body: [
      `The order in which phonics patterns are taught — and therefore the order in which decodable books are presented — is not an instructional preference. It reflects the architecture of the English writing system and the developmental trajectory of the brain's reading networks.`,
      `Linnea Ehri's phase model of reading development describes four major phases: pre-alphabetic (sight-reading based on visual cues), partial alphabetic (using first and last letters to guess), full alphabetic (systematically decoding using all letter-sound correspondences), and consolidated alphabetic (chunking multi-letter patterns and morphemes for efficiency). Children move through these phases in sequence. Instruction should move with them.`,
      `This is why the Montessori Makers series begins with CVC words (Set 1), not because CVC is "easy" but because CVC words allow children to practice the foundational skill — segmenting and blending individual phonemes — without competing demands. Digraphs (Set 2) introduce the concept that two letters can make one sound — a conceptual leap that requires CVC mastery first. Blends (Set 3) require children to process consonant clusters without a break in the speech stream. Long vowel patterns, r-controlled vowels, and multisyllabic words follow in the order their complexity demands.`,
      `The 2020 research consensus (summarized by Prof. Susan Brady and others) has also clarified that children do not need to progress sequentially through rhyming and syllable work before reaching phonemic awareness. Earlier frameworks that required "onset-rime mastery" before phonics instruction unnecessarily delayed the most important work. Our scope and sequence reflects this — children move to phoneme-level work and connected text as fast as the research supports.`,
    ],
    callout: {
      stat: '8 sets',
      label: 'designed in the exact sequence the brain builds phonological-orthographic connections',
      note: 'from CVC → digraphs → blends → long vowels → r-controlled → multisyllabic → advanced patterns',
    },
  },
  {
    id: 'decodables-and-comprehension',
    label: 'Decodables & Comprehension',
    headline: 'Decodable books don\'t sacrifice comprehension. They make it possible.',
    body: [
      `A common objection to decodable books is that their controlled vocabulary produces stilted, unnatural language — and that children who read only decodables miss out on the vocabulary and comprehension development that comes from rich, complex texts.`,
      `This objection misunderstands how comprehension develops. Reading comprehension research (including the "Simple View of Reading," first articulated by Gough & Tunmer in 1986 and extensively validated since) models reading comprehension as the product of two things: decoding ability multiplied by language comprehension. A child who cannot decode cannot comprehend written text no matter how rich their oral vocabulary. A child who has automatized decoding can deploy all their cognitive resources toward comprehension.`,
      `The argument against decodable books conflates early reading instruction with long-term reading diet. Nobody argues that children should read only decodable books forever. The research supports decodable books as the primary text during initial phonics acquisition — typically kindergarten through early second grade — after which children transition to a wide range of rich, complex texts. Our series is designed exactly for this window.`,
      `Within that window, the Montessori Makers books are not "just decodables." The stories are about real community experiences, told with care and dignity. They build vocabulary through context. They portray characters with agency. A child can decode every word on the page AND encounter a story worth caring about. That combination is rare. It is intentional.`,
    ],
    callout: {
      stat: 'Simple View of Reading',
      label: 'Reading = Decoding × Language Comprehension',
      note: 'Gough & Tunmer (1986) — foundational model for all reading science since',
    },
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              <Link href="/learning/decodable-books" className="hover:underline" style={{ color: 'inherit' }}>
                Decodable Books
              </Link>{' '}
              / The Research
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Why decodable books work.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-2xl">
              Every design decision in the Montessori Makers series is grounded in the science of
              reading. This is the research behind those decisions — explained clearly, without
              jargon, with citations.
            </p>
            {/* Jump links */}
            <div className="flex flex-wrap gap-3">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-white/70 text-xs tracking-wide border border-white/20 px-4 py-2 hover:border-[#d6a758] hover:text-[#d6a758] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6] ${
            i % 2 === 0 ? 'bg-[#FAF9F7]' : 'bg-white'
          }`}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-20 items-start">
            {/* Left: label + stat callout */}
            <div className="md:sticky md:top-28">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-4 font-medium">
                {section.label}
              </p>
              <div className="bg-[#0e1a7a] p-6 mb-6">
                <p className="text-[#d6a758] text-3xl font-bold mb-1" style={serif}>
                  {section.callout.stat}
                </p>
                <p className="text-white text-sm leading-snug mb-2">{section.callout.label}</p>
                <p className="text-white/50 text-xs leading-relaxed">{section.callout.note}</p>
              </div>
              <Link
                href="/learning/decodable-books"
                className="text-[#0e1a7a] text-xs tracking-wide hover:underline flex items-center gap-1.5"
              >
                ← Back to the books
              </Link>
            </div>

            {/* Right: headline + body */}
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-snug mb-8" style={serif}>
                {section.headline}
              </h2>
              <div className="space-y-5">
                {section.body.map((para, j) => (
                  <p key={j} className="text-[#374151] text-base leading-[1.85]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">The Series</p>
            <h2 className="text-3xl md:text-4xl text-white leading-snug mb-6" style={serif}>
              96 books built on exactly this research.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Every decision in the scope and sequence, every word on every page, every sight word
              introduction — all of it traces back to the research above. That is not a marketing
              claim. It is a design constraint.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/learning/decodable-books"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              See the Full Series
            </Link>
            <Link
              href="/learning/decodable-books#set-1"
              className="border border-white/30 text-white text-sm px-10 py-4 tracking-wide hover:border-white transition-colors text-center"
            >
              Browse by Set
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
