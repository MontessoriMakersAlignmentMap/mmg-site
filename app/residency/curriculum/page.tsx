import Link from 'next/link'

export const metadata = { title: 'Curriculum Library' }

// Hardcoded color tokens — this page is inside residency-root but we define them
// explicitly so the page is self-contained and never at the mercy of CSS scoping.
const C = {
  navy:   '#0e1a7a',
  gold:   '#d6a758',
  cream:  '#faf8f4',
  white:  '#ffffff',
  muted:  '#5a5a7a',
  border: '#e2ddd6',
  bg:     '#f3f4f6',
  goldLight: '#f5e8cc',
}

const PRIMARY_STRANDS = [
  {
    name: 'Practical Life',
    lessons: 41,
    desc: 'The foundation of independence, concentration, and motor development. 41 lessons covering preliminary exercises, care of self, care of environment, grace and courtesy, and advanced exercises.',
  },
  {
    name: 'Sensorial',
    lessons: 39,
    desc: 'The education of the senses as preparation for abstract thought. 39 lessons covering visual, tactile, auditory, thermic, baric, and stereognostic discrimination.',
  },
  {
    name: 'Language',
    lessons: 44,
    desc: "A complete language curriculum integrating Montessori's sequence with science of reading research. 44 lessons from spoken language and phonological awareness through reading, writing, grammar, and structured literacy.",
  },
  {
    name: 'Mathematics',
    lessons: 45,
    desc: 'The full Primary mathematics sequence from concrete quantity to early abstraction. 45 lessons covering numeration, the decimal system, operations, linear counting, fractions, and early geometry.',
  },
  {
    name: 'Theory',
    lessons: 40,
    desc: 'The philosophical and developmental foundation of Montessori practice. 40 lessons covering the planes of development, the prepared environment, the role of the adult, observation, normalization, assessment, and equity in the Primary environment.',
  },
  {
    name: 'Behavior Support',
    lessons: 10,
    desc: 'A dedicated strand for the real classroom. 10 lessons covering behavior as communication, trauma-informed practice, neurodivergent profiles, sensory processing, restorative approaches, and family partnership.',
  },
  {
    name: 'Elementary Bridge',
    lessons: 5,
    desc: 'Five lessons at the end of the Primary program that orient Primary guides to the second plane child and what their students are becoming. No other Montessori training program includes this.',
  },
]

const ELEMENTARY_STRANDS = [
  {
    name: 'Primary Foundation',
    lessons: 5,
    desc: 'Five lessons at the start of the Elementary program that ground Elementary guides in the first plane formation their students carry. No other Montessori training program includes this.',
  },
  {
    name: 'Geography',
    lessons: 30,
    desc: 'The physical and human geography of the earth as a cosmic and justice-centered curriculum. 30 lessons from land and water through political geography, environmental justice, and cultural geography.',
  },
  {
    name: 'Biology',
    lessons: 40,
    desc: 'The full scope of life from classification through ecology. 40 lessons covering the kingdoms, botany, zoology, the human body, evolution, genetics, and environmental biology.',
  },
  {
    name: 'History',
    lessons: 29,
    desc: 'The story of human beings told honestly. 29 lessons from the passage of time through ancient and modern civilizations, primary sources, and trauma-informed history teaching.',
  },
  {
    name: 'Language',
    lessons: 42,
    desc: 'The elementary language curriculum from word study through grammar, composition, research, public speaking, media literacy, and multilingual language study. 42 lessons.',
  },
  {
    name: 'Mathematics',
    lessons: 47,
    desc: 'The full Elementary mathematics sequence. 47 lessons covering operations, fractions, decimals, ratio, algebra introduction, number theory, data, graphing, financial literacy, and measurement.',
  },
  {
    name: 'Geometry',
    lessons: 32,
    desc: "Montessori's sensorial geometry curriculum from foundations through proof and reasoning. 32 lessons covering angles, triangles, quadrilaterals, polygons, circles, area, volume, and transformations.",
  },
  {
    name: 'Art',
    lessons: 28,
    desc: 'Art history and studio practice as a justice curriculum. 28 lessons covering art history across global traditions, the elements of art, principles of design, studio techniques, and art as documentation and resistance.',
  },
  {
    name: 'Music',
    lessons: 26,
    desc: "Music history, theory, and practice as a cosmic and cultural curriculum. 26 lessons covering music history across global traditions, rhythm, melody, harmony, notation, listening, composition, and music's relationship to mathematics and culture.",
  },
  {
    name: 'Theory',
    lessons: 36,
    desc: 'The philosophical and developmental foundation of Montessori Elementary practice. 36 lessons covering the second plane child, cosmic education, the role of the guide, going out, assessment, equity, community building, and the transition to adolescence.',
  },
  {
    name: 'Behavior Support',
    lessons: 10,
    desc: 'A dedicated strand for the real elementary classroom. 10 lessons covering behavior communication at the second plane, trauma-informed elementary practice, neurodivergent profiles, community meetings, restorative practice, and family partnership.',
  },
]

const primaryTotal = PRIMARY_STRANDS.reduce((s, t) => s + t.lessons, 0)
const elementaryTotal = ELEMENTARY_STRANDS.reduce((s, t) => s + t.lessons, 0)

export default function CurriculumPage() {
  return (
    <>
      {/* HEADER */}
      <section style={{ background: C.navy, color: C.white, padding: '4rem 0 3.5rem' }}>
        <div className="r-container" style={{ maxWidth: '900px' }}>
          <p style={{
            color: C.gold, fontSize: '0.8125rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem',
          }}>
            Curriculum Library
          </p>
          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.2, marginBottom: '1rem', color: C.white,
          }}>
            The Full Scope of Practice
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', maxWidth: '640px' }}>
            Choose your level to explore the curriculum. Each level contains the full
            sequence of strands, categories, and lessons a resident needs to study and master.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="r-section" style={{ background: C.cream }}>
        <div className="r-container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: C.navy }}>
              MMR&rsquo;s curriculum was written from scratch. Not adapted from existing albums, not curated from third-party sources, not assembled from what was already available. Every one of the {primaryTotal + elementaryTotal} lessons across Primary and Elementary was built with a defined structure: a direct aim, an indirect aim, an equity aim, a full presentation sequence, points of interest, variations, and a dedicated neurodivergence section. That structure is not decorative. It is a statement about what Montessori teacher preparation should always have included and never has.
            </p>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: C.navy }}>
              The curriculum spans 16 strands at two levels. Primary covers Practical Life, Sensorial, Language, Mathematics, Theory, Behavior Support, and Elementary Bridge. Elementary covers Primary Foundation, Geography, Biology, History, Language, Mathematics, Geometry, Art, Music, Theory, and Behavior Support. Every strand is sequenced to build on what came before. Every week connects to a reading assignment, a structured observation focus, and a slide deck that frames the content before the resident opens a single lesson.
            </p>
            <p style={{
              fontSize: '1.1875rem',
              lineHeight: 1.6,
              color: C.navy,
              fontWeight: 700,
              paddingTop: '0.75rem',
              borderTop: `2px solid ${C.gold}`,
              marginTop: '0.25rem',
            }}>
              This is not a course. It is a full program of study.
            </p>
          </div>
        </div>
      </section>

      {/* STRAND OVERVIEW */}
      <section className="r-section" style={{ background: C.white }}>
        <div className="r-container" style={{ maxWidth: '1100px' }}>
          <p style={{
            color: C.gold, fontSize: '0.75rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem',
          }}>
            16 Strands Across Two Levels
          </p>
          <h2 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: C.navy, marginBottom: '2.5rem', lineHeight: 1.2,
          }}>
            Everything a Montessori guide needs to know
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* PRIMARY */}
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: C.navy }}>Primary</p>
                <p style={{ fontSize: '0.875rem', color: C.muted }}>Ages 3&ndash;6 &middot; {primaryTotal} lessons &middot; 7 strands</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {PRIMARY_STRANDS.map((s, i) => (
                  <div key={s.name} style={{
                    padding: '1.125rem 0',
                    borderBottom: i < PRIMARY_STRANDS.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.navy }}>{s.name}</span>
                      <span style={{ fontSize: '0.8125rem', color: C.muted, whiteSpace: 'nowrap', paddingLeft: '0.75rem' }}>{s.lessons} lessons</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: C.muted, lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ELEMENTARY */}
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: C.navy }}>Elementary</p>
                <p style={{ fontSize: '0.875rem', color: C.muted }}>Ages 6&ndash;12 &middot; {elementaryTotal} lessons &middot; 11 strands</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {ELEMENTARY_STRANDS.map((s, i) => (
                  <div key={s.name} style={{
                    padding: '1.125rem 0',
                    borderBottom: i < ELEMENTARY_STRANDS.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: C.navy }}>{s.name}</span>
                      <span style={{ fontSize: '0.8125rem', color: C.muted, whiteSpace: 'nowrap', paddingLeft: '0.75rem' }}>{s.lessons} lessons</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: C.muted, lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL CARDS */}
      <section className="r-section" style={{ background: C.bg }}>
        <div className="r-container" style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Primary */}
            <Link
              href="/residency/curriculum/primary"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                display: 'block',
                transition: 'box-shadow 0.2s',
              }}
            >
              <div style={{
                width: '64px', height: '64px', background: C.goldLight,
                borderRadius: '14px', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.75rem', color: C.navy }}>3&ndash;6</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--r-font-heading)',
                fontSize: '1.75rem', color: C.navy, marginBottom: '0.75rem',
              }}>
                Primary
              </h2>
              <p style={{ fontSize: '0.9375rem', color: C.muted, lineHeight: 1.7 }}>
                Ages 3 through 6. The foundational Montessori curriculum spanning 7 strands
                including Practical Life, Sensorial, Language, Mathematics, Theory, Behavior
                Support, and Elementary Bridge.
              </p>
            </Link>

            {/* Elementary */}
            <Link
              href="/residency/curriculum/elementary"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                display: 'block',
                transition: 'box-shadow 0.2s',
              }}
            >
              <div style={{
                width: '64px', height: '64px',
                background: 'rgba(14, 26, 122, 0.08)',
                borderRadius: '14px', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.75rem', color: C.navy }}>6&ndash;12</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--r-font-heading)',
                fontSize: '1.75rem', color: C.navy, marginBottom: '0.75rem',
              }}>
                Elementary
              </h2>
              <p style={{ fontSize: '0.9375rem', color: C.muted, lineHeight: 1.7 }}>
                Ages 6 through 12. The full elementary curriculum spanning 11 strands
                including Primary Foundation, Cosmic Education, mathematics, geometry,
                language, art, music, science, history, theory, and behavior support.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW THE CURRICULUM WORKS */}
      <section className="r-section" style={{ background: C.cream }}>
        <div className="r-container" style={{ maxWidth: '780px' }}>
          <p style={{
            color: C.gold, fontSize: '0.75rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem',
          }}>
            How the Curriculum Works
          </p>
          <h2 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: C.navy, marginBottom: '1.5rem', lineHeight: 1.2,
          }}>
            Every lesson is a complete pedagogical document
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: C.navy }}>
              Every lesson in the MMR curriculum follows the same structure. A script introduction orients the resident to why this lesson matters before they read the full content. The direct aim names what the lesson accomplishes for the child. The indirect aim names what it builds toward that the child will not yet name. The equity aim names the specific justice dimension of this lesson and what it requires of the guide. The presentation gives the full sequence the resident will study and internalize. Points of interest mark the moments where a child&rsquo;s understanding deepens visibly. Variations and extensions suggest how the guide continues the work. The neurodivergence section addresses how this lesson serves and challenges children with different profiles.
            </p>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: C.navy }}>
              This structure is not optional and it is not cosmetic. It is what makes every lesson in MMR a complete pedagogical document rather than a set of steps to follow.
            </p>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: C.navy }}>
              Lessons are organized into weekly bundles that release on Sunday mornings throughout the program. Each bundle includes the week&rsquo;s lessons, a slide deck that introduces the week&rsquo;s content before the resident opens a lesson, a required reading assignment from the program reading list, a structured observation focus, and an album submission tracker. The curriculum does not exist in isolation from the rest of the program. Every lesson connects to something the resident is observing, practicing, reading, and discussing with their cohort.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/residency/curriculum/primary" className="r-btn" style={{
              background: C.navy, color: C.white,
              padding: '0.75rem 1.75rem', borderRadius: '8px',
              fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
            }}>
              Explore Primary Curriculum
            </Link>
            <Link href="/residency/curriculum/elementary" className="r-btn" style={{
              background: 'transparent', color: C.navy,
              border: `1px solid ${C.border}`,
              padding: '0.75rem 1.75rem', borderRadius: '8px',
              fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
            }}>
              Explore Elementary Curriculum
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
