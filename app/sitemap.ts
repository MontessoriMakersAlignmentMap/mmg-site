import { MetadataRoute } from 'next'

const BASE = 'https://montessorimakersgroup.org'

type Entry = MetadataRoute.Sitemap[number]

function url(path: string, priority: number, changeFreq: Entry['changeFrequency'] = 'monthly'): Entry {
  return {
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Core ────────────────────────────────────────────────────────────────
    url('/',                                       1.0, 'weekly'),
    url('/about',                                  0.8),
    url('/contact',                                0.7),
    url('/partners',                               0.5),

    // ── Advisory ────────────────────────────────────────────────────────────
    url('/advisory',                               0.9),
    url('/advisory/coaching',                      0.7),
    url('/advisory/communication-strategy',        0.7),
    url('/advisory/leadership-transition-support', 0.7),
    url('/advisory/mapping',                       0.7),
    url('/advisory/partnership',                   0.7),
    url('/advisory/workshops-speaking',            0.7),

    // ── Institute ───────────────────────────────────────────────────────────
    url('/institute',                              0.9),
    url('/institute/about',                        0.7),
    url('/institute/catalog',                      0.8),
    url('/institute/course-descriptions',          0.7),
    url('/institute/intensive',                    0.7),
    url('/institute/residency',                    0.7),
    url('/institute/retreat',                      0.7),
    url('/institute/seminars',                     0.7),
    url('/institute/studio',                       0.7),
    url('/institute/testimonials',                 0.6),

    // ── MatchHub ────────────────────────────────────────────────────────────
    url('/matchhub',                               0.9),
    url('/matchhub/current-searches',              0.8, 'weekly'),
    url('/matchhub/guides',                        0.7),
    url('/matchhub/jobs',                          0.8, 'weekly'),
    url('/matchhub/open-roles',                    0.8, 'weekly'),
    url('/matchhub/pricing',                       0.7),
    url('/matchhub/schools',                       0.7),
    url('/matchhub/strategic-search',              0.7),
    url('/matchhub/submit-profile',                0.6),
    url('/matchhub/talent',                        0.7),
    url('/matchhub/talent-pool',                   0.7),
    url('/join-matchhub',                          0.7),

    // ── MMAP ────────────────────────────────────────────────────────────────
    url('/mmap',                                   0.9),
    url('/mmap/about',                             0.7),
    url('/mmap/atlas',                             0.7),
    url('/mmap/contact',                           0.5),
    url('/mmap/demo',                              0.7),
    url('/mmap/equity',                            0.7),
    url('/mmap/mapmaker',                          0.7),
    url('/mmap/north-star',                        0.7),
    url('/mmap/pathway',                           0.7),
    url('/mmap/signin',                            0.6),
    url('/mmap/surveyor',                          0.7),
    url('/mmap/tour',                              0.8),

    // ── MMAS (in development — low priority) ────────────────────────────────
    url('/mmas',                                   0.3),
    url('/mmas/how-it-works',                      0.2),
    url('/mmas/schools',                           0.2),
    url('/mmas/why',                               0.2),

    // ── Learning ────────────────────────────────────────────────────────────
    url('/learning',                               0.9),
    url('/learning/decodable-books',               0.8),
    url('/learning/free-resources',                0.7),
    url('/learning/courses',                       0.7),
    url('/learning/origins',                       0.6),
    url('/learning/reading-assessment',            0.8),

    // ── Studio ──────────────────────────────────────────────────────────────
    url('/studio',                                 0.9),
    url('/studio/approach',                        0.7),
    url('/studio/demo',                            0.5),
    url('/studio/portfolio',                       0.7),
    url('/studio/services',                        0.7),

    // ── Toolbox ─────────────────────────────────────────────────────────────
    url('/toolbox',                                0.9),
    url('/toolbox/about',                          0.6),
    url('/toolbox/adult-culture-framework',        0.7),
    url('/toolbox/board-onboarding-toolkit',       0.7),
    url('/toolbox/conflict-feedback-protocol',     0.7),
    url('/toolbox/family-handbook',                0.7),
    url('/toolbox/free-resources',                 0.7),
    url('/toolbox/hiring-selection-toolkit',       0.7),
    url('/toolbox/leadership-operations-playbook', 0.7),
    url('/toolbox/leadership-transition-toolkit',  0.7),
    url('/toolbox/performance-separation-toolkit', 0.7),
    url('/toolbox/staff-handbook',                 0.7),
    url('/toolbox/store',                          0.8),

    // ── Field Intelligence / Insights ───────────────────────────────────────
    url('/field-intelligence',                     0.7, 'weekly'),
    url('/field-intelligence/latest',              0.7, 'weekly'),
    url('/field-intelligence/contribute',          0.6),
    url('/insights',                               0.7, 'weekly'),

    // ── Community ───────────────────────────────────────────────────────────
    url('/in-community-with',                      0.6),
    url('/resources/free',                         0.6),
  ]
}
