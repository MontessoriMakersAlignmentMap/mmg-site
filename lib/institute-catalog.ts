// ─── Single source of truth for Institute catalog data ────────────────────────
// Imported by both /institute/catalog and /institute/seminars.
// To update offerings or pricing, change it here only.

// ─── Format → price mapping ───────────────────────────────────────────────────

export const FORMAT_CONFIG: Record<string, { label: string; price: string }> = {
  '3-Hour Workshop':       { label: 'Workshop',  price: '$200' },
  '5-Hour Intensive':      { label: 'Intensive', price: '$350' },
  '6-Hour Systems Cohort': { label: 'Cohort',    price: '$450' },
}

export type OfferingFormat = keyof typeof FORMAT_CONFIG

export interface Offering {
  format: OfferingFormat
  title: string
  dates: string
  description: string
  href: string
  cta?: string
  ctaHref?: string
  /** URL slug for individual detail page: used to build /institute/courses/[slug] */
  slug: string
  /** Path to course image in /public (optional — some courses have no image) */
  image?: string
  /** Stripe payment link for this specific session (placeholder until live) */
  stripeHref?: string
  /** Short audience description for detail page */
  whoFor?: string
  /** 3 bullet points of what participants leave with */
  leaveWith?: string[]
}

// ─── Offerings ────────────────────────────────────────────────────────────────

export const spring2026Offerings: Offering[] = [
  {
    format: '3-Hour Workshop',
    title: 'People Policies by Design',
    dates: 'Tuesday, March 31, 2026 · 9:30am\u201312:30pm CST',
    description:
      'People policies should be humane, transparent, and grounded in Montessori values. This workshop helps leaders identify misalignments, strengthen communication, and craft policy language that reflects the school\u2019s vision \u2014 not just compliance. Participants leave with a policy framework that is sustainable, just, and culturally reflective.',
    href: '/institute/courses/people-policies-by-design--spring-2026',
    slug: 'people-policies-by-design--spring-2026',
    image: '/institute/courses/CS People Policy By Design (3).png',
    stripeHref: 'https://buy.stripe.com/fZueVf4DS7T2gbl7ND2cg0l',
    whoFor: 'Heads of school, directors, and anyone responsible for staff policy language and documentation.',
    leaveWith: [
      'A policy alignment diagnostic you can use across your current handbook',
      'A framework for writing policy language that is humane, clear, and values-grounded',
      'A draft revision of at least one policy in your current system',
    ],
  },
  {
    format: '5-Hour Intensive',
    title: 'Equity Audits & Adult Culture Design',
    dates: 'Thursday, April 15, 2026 · 9:30am\u20132:30pm CST',
    description:
      'This intensive helps schools conduct a meaningful equity audit of adult experience, examine structural patterns, and identify conditions that affect fairness, belonging, and psychological safety. Participants learn to gather and interpret data, uncover root causes, and redesign adult culture systems through an equity-informed lens.',
    href: '/institute/courses/equity-audits-adult-culture-design--spring-2026',
    slug: 'equity-audits-adult-culture-design--spring-2026',
    image: '/institute/courses/CS Equity Audits & Adult Culture Design (3) copy.png',
    stripeHref: 'https://buy.stripe.com/bJe14p2vKgpybV51pf2cg0m',
    whoFor: 'Heads of school, DEI coordinators, and leadership teams engaged in adult culture or equity work.',
    leaveWith: [
      'An equity audit framework adapted for your school\u2019s adult community',
      'Data-gathering tools for surfacing structural patterns and gaps',
      'A prioritized set of action steps for redesigning adult culture',
    ],
  },
  {
    format: '6-Hour Systems Cohort',
    title: 'The MMG Appraisal Cycle: A Growth-Based Evaluation System',
    dates: 'Thursday, May 7 · 5\u20137pm CST \u00b7 Tuesday, May 12 · 5\u20137pm CST \u00b7 Thursday, May 14 · 5\u20137pm CST',
    description:
      'A well-designed appraisal cycle supports growth, clarity, and dignity. Over three sessions, participants implement the full Montessori Makers appraisal system \u2014 self-assessments, supervisor evaluations, goal-setting, and upward feedback. Sessions cover: (1) purpose and grounding, (2) rhythms and documentation, (3) bias mitigation and implementation.',
    href: '/institute/courses/mmg-appraisal-cycle--spring-2026',
    slug: 'mmg-appraisal-cycle--spring-2026',
    image: '/institute/courses/CS The MMG Appraisal Cycle (1) copy.png',
    stripeHref: 'https://buy.stripe.com/dRm6oJdao7T22kv7ND2cg0n',
    whoFor: 'Heads of school and directors responsible for staff evaluation, professional growth, and performance culture.',
    leaveWith: [
      'A complete, ready-to-implement MMG appraisal system with all templates',
      'A documented evaluation rhythm for your school year',
      'Bias-mitigation protocols for each stage of the appraisal cycle',
    ],
  },
]

export const summer2026Offerings: Offering[] = [
  {
    format: '3-Hour Workshop',
    title: 'Community Architecture: Partnership, Belonging & Collective Care',
    dates: 'Tuesday, July 14, 2026 · 9:30am\u201312:30pm CST',
    description:
      'Montessori schools thrive when community systems are intentional and inclusive. This workshop helps leaders design the structures, rhythms, and communication flows that nurture belonging among staff and families \u2014 building rituals that support partnership and collective care in daily practice.',
    href: '/institute/courses/community-architecture--summer-2026',
    slug: 'community-architecture--summer-2026',
    image: '/institute/courses/CS Community Architecture (1) copy.png',
    stripeHref: 'https://buy.stripe.com/8x200l0nC7T22kv1pf2cg0o',
    whoFor: 'Heads, directors, and family and community engagement coordinators.',
    leaveWith: [
      'A community architecture map of your current belonging structures',
      'A communication rhythm design for staff and family engagement',
      'A set of belonging rituals you can implement at the start of next year',
    ],
  },
  {
    format: '5-Hour Intensive',
    title: 'School Identity & Storytelling Systems',
    dates: 'Thursday, August 6, 2026 · 9:30am\u20132:30pm CST',
    description:
      'Every Montessori school holds a unique identity \u2014 but communicating it clearly can be challenging. This intensive helps leaders articulate a coherent school voice and build communication systems for weekly messaging, internal communications, external storytelling, and crisis response.',
    href: '/institute/courses/school-identity-storytelling--summer-2026',
    slug: 'school-identity-storytelling--summer-2026',
    image: '/institute/courses/CS School Identity & Storytelling (1) copy.png',
    stripeHref: 'https://buy.stripe.com/9B614p7Q40qA8IT6Jz2cg0p',
    whoFor: 'Heads and directors, and anyone responsible for school communications or enrollment.',
    leaveWith: [
      'A school voice framework that is distinctive, consistent, and mission-aligned',
      'Communication templates for four channels: weekly, internal, external, and crisis',
      'A crisis communication protocol ready to adapt when needed',
    ],
  },
  {
    format: '6-Hour Systems Cohort',
    title: 'Strategic Planning the Montessori Way: Aim, Scheme & Implementation',
    dates: 'Thursday, August 13 · 5\u20137pm CST \u00b7 Tuesday, August 18 · 5\u20137pm CST \u00b7 Thursday, August 20 · 5\u20137pm CST',
    description:
      'Strategic planning in Montessori environments must be aspirational, grounded, and human-centered. Over three sessions, participants work through the Montessori Makers Organizational Mapping framework \u2014 crafting a 3\u20135 year roadmap aligned with people, structures, and systems. Sessions cover: (1) aim and vision, (2) scheme and stakeholders, (3) implementation and accountability.',
    href: '/institute/courses/strategic-planning-montessori-way--summer-2026',
    slug: 'strategic-planning-montessori-way--summer-2026',
    stripeHref: 'https://buy.stripe.com/00w7sNb2g3CM3oz3xn2cg0q',
    whoFor: 'Leadership teams and boards engaged in or preparing for a strategic planning process.',
    leaveWith: [
      'A 3\u20135 year roadmap draft aligned to your school\u2019s people and systems',
      'A stakeholder engagement plan for the planning process',
      'An accountability system with clear owners, rhythms, and check-ins',
    ],
  },
]

export const fall2026Offerings: Offering[] = [
  {
    format: '3-Hour Workshop',
    title: 'Interview Design for Equitable & Insightful Alignment',
    dates: 'Tuesday, September 22, 2026 · 9:30am\u201312:30pm CST',
    description:
      'A values-aligned hiring process begins before a candidate enters the room. This workshop helps leaders design interview systems that surface depth, mission alignment, and authentic presence \u2014 not polish. Participants leave with a clear, bias-reducing framework for evaluating what matters most in a Montessori school context.',
    href: '/institute/courses/interview-design--fall-2026',
    slug: 'interview-design--fall-2026',
    image: '/institute/courses/CS Interview Design for Montessori Schools (4) copy.png',
    stripeHref: 'https://buy.stripe.com/9B67sN8U88X6e3d6Jz2cg0r',
    whoFor: 'Heads, directors, and hiring managers building or rebuilding their interview process.',
    leaveWith: [
      'An interview structure with built-in bias-reducing protocols',
      'A question bank designed to surface philosophy alignment and reasoning',
      'An evaluation rubric for making selection decisions that hold up',
    ],
  },
  {
    format: '5-Hour Intensive',
    title: 'Staffing with Purpose: Montessori Hiring Beyond the Resume',
    dates: 'Thursday, October 22, 2026 · 9:30am\u20132:30pm CST',
    description:
      'Hiring is an ecosystem, not a single event. This intensive guides schools in building a sustainable staffing system \u2014 articulating a compelling hiring narrative, designing values-aligned job descriptions, and developing year-round recruitment rhythms that attract and sustain the right people.',
    href: '/institute/courses/staffing-with-purpose--fall-2026',
    slug: 'staffing-with-purpose--fall-2026',
    image: '/institute/courses/CS Building Staffing With Purpose Montessori Hiring Beyond the Resume (3) copy.png',
    stripeHref: 'https://buy.stripe.com/4gMfZj4DSflu6ALc3T2cg0s',
    whoFor: 'Heads and directors managing the full hiring lifecycle, from sourcing through retention.',
    leaveWith: [
      'A compelling hiring narrative for your school that distinguishes you in your market',
      'A values-aligned job description template adaptable to any role',
      'A year-round recruitment calendar with role-specific rhythms',
    ],
  },
  {
    format: '6-Hour Systems Cohort',
    title: 'Onboarding by Design: A Values-Aligned Staff Onboarding System',
    dates: 'Thursday, November 5 · 5\u20137pm CST \u00b7 Tuesday, November 10 · 5\u20137pm CST \u00b7 Thursday, November 12 · 5\u20137pm CST',
    description:
      'A thoughtful onboarding system shapes adult culture, trust, and long-term retention. Over three sessions, participants build a 30\u201360\u201390 day onboarding roadmap, define roles and expectations, and craft communication rhythms that help new staff feel welcomed and prepared. Sessions cover: (1) purpose and philosophy, (2) structures and templates, (3) implementation and equity checks.',
    href: '/institute/courses/onboarding-by-design--fall-2026',
    slug: 'onboarding-by-design--fall-2026',
    image: '/institute/courses/CS Onboarding By Design (1) copy.png',
    stripeHref: 'https://buy.stripe.com/fZu8wR9Ycb5e5wHec12cg0t',
    whoFor: 'Heads and directors responsible for staff retention, belonging, and role clarity.',
    leaveWith: [
      'A 30\u201360\u201390 day onboarding roadmap for your school context',
      'Role clarity templates and expectation-setting frameworks',
      'A communication rhythm plan that helps new staff feel welcomed from day one',
    ],
  },
]

export const winter2027Offerings: Offering[] = [
  {
    format: '3-Hour Workshop',
    title: 'Building Organizational Trust',
    dates: 'Tuesday, January 19, 2027 · 9:30am\u201312:30pm CST',
    description:
      'Trust is created through systems, communication, and consistent choice \u2014 not rhetoric. This workshop helps leaders understand the foundations of adult trust, identify where it breaks down, and rebuild confidence through clarity and transparency. Participants leave with a diagnostic framework for sustaining a healthy adult culture.',
    href: '/institute/courses/building-organizational-trust--winter-2027',
    slug: 'building-organizational-trust--winter-2027',
    image: '/institute/courses/CS Building Organizational Trust (7) copy.png',
    stripeHref: 'https://buy.stripe.com/cNi28tb2gc9ie3d3xn2cg0u',
    whoFor: 'Heads and directors navigating staff trust, culture repair, or leadership transitions.',
    leaveWith: [
      'A trust diagnostic applied to your current adult culture',
      'A transparency framework for high-stakes communication decisions',
      'Three communication structures that build and sustain confidence',
    ],
  },
  {
    format: '5-Hour Intensive',
    title: 'The Aligned Leader: Workflows, Boundaries & Emotional Clarity',
    dates: 'Thursday, February 11, 2027 · 9:30am\u20132:30pm CST',
    description:
      'This intensive supports leaders in building their personal leadership operating system \u2014 one that protects well-being, supports clear decision-making, and distributes responsibility equitably. Through guided reflection and scenario-based practice, participants design sustainable communication structures and workflow habits that reduce overwhelm.',
    href: '/institute/courses/the-aligned-leader--winter-2027',
    slug: 'the-aligned-leader--winter-2027',
    image: '/institute/courses/CS The Aligned Leader (1) copy.png',
    stripeHref: 'https://buy.stripe.com/4gM5kF6M03CM8IT0lb2cg0v',
    whoFor: 'School leaders at any level seeking a more sustainable, boundary-aware personal operating system.',
    leaveWith: [
      'A personal leadership operating system with workflow, communication, and decision-making habits',
      'A communication boundary design that protects your energy and your team\u2019s',
      'A plan for distributing responsibility more equitably in your current role',
    ],
  },
  {
    format: '6-Hour Systems Cohort',
    title: 'Dual-Role Leadership: Balancing Coaching & Evaluation',
    dates: 'Thursday, February 18 · 5\u20137pm CST \u00b7 Tuesday, February 23 · 5\u20137pm CST \u00b7 Thursday, February 25 · 5\u20137pm CST',
    description:
      'Many Montessori leaders carry both coaching and evaluative responsibilities \u2014 a combination that can blur boundaries and erode trust. Over three sessions, participants design a dual-role system grounded in ethics and dignity. Sessions cover: (1) distinguishing coaching from supervision, (2) documentation and boundary systems, (3) a trust-protective dual-role model.',
    href: '/institute/courses/dual-role-leadership--winter-2027',
    slug: 'dual-role-leadership--winter-2027',
    image: '/institute/courses/CS Dual-Role Leadership (2) copy.png',
    stripeHref: 'https://buy.stripe.com/fZubJ30nC8X64sD6Jz2cg0w',
    whoFor: 'Leaders who hold both coaching and evaluative authority over the same staff members.',
    leaveWith: [
      'A clear ethical framework for distinguishing coaching from evaluative supervision',
      'A documentation and boundary system for each role',
      'A trust-protective dual-role model adapted to your specific context',
    ],
  },
]

export const spring2027Offerings: Offering[] = [
  {
    format: '3-Hour Workshop',
    title: 'People Policies by Design',
    dates: 'Tuesday, March 23, 2027 · 9:30am\u201312:30pm CST',
    description:
      'People policies should be humane, transparent, and grounded in Montessori values. This workshop helps leaders identify misalignments, strengthen communication, and craft policy language that reflects the school\u2019s vision \u2014 not just compliance. Participants leave with a policy framework that is sustainable, just, and culturally reflective.',
    href: '/institute/courses/people-policies-by-design--spring-2027',
    slug: 'people-policies-by-design--spring-2027',
    image: '/institute/courses/CS People Policy By Design (3).png',
    whoFor: 'Heads of school, directors, and anyone responsible for staff policy language and documentation.',
    leaveWith: [
      'A policy alignment diagnostic you can use across your current handbook',
      'A framework for writing policy language that is humane, clear, and values-grounded',
      'A draft revision of at least one policy in your current system',
    ],
  },
  {
    format: '5-Hour Intensive',
    title: 'Equity Audits & Adult Culture Design',
    dates: 'Thursday, April 15, 2027 · 9:30am\u20132:30pm CST',
    description:
      'This intensive helps schools conduct a meaningful equity audit of adult experience, examine structural patterns, and identify conditions that affect fairness, belonging, and psychological safety. Participants learn to gather and interpret data, uncover root causes, and redesign adult culture systems through an equity-informed lens.',
    href: '/institute/courses/equity-audits-adult-culture-design--spring-2027',
    slug: 'equity-audits-adult-culture-design--spring-2027',
    image: '/institute/courses/CS Equity Audits & Adult Culture Design (3) copy.png',
    whoFor: 'Heads of school, DEI coordinators, and leadership teams engaged in adult culture or equity work.',
    leaveWith: [
      'An equity audit framework adapted for your school\u2019s adult community',
      'Data-gathering tools for surfacing structural patterns and gaps',
      'A prioritized set of action steps for redesigning adult culture',
    ],
  },
  {
    format: '6-Hour Systems Cohort',
    title: 'The MMG Appraisal Cycle: A Growth-Based Evaluation System',
    dates: 'Thursday, May 6 · 5\u20137pm CST \u00b7 Tuesday, May 11 · 5\u20137pm CST \u00b7 Thursday, May 13 · 5\u20137pm CST',
    description:
      'A well-designed appraisal cycle supports growth, clarity, and dignity. Over three sessions, participants implement the full Montessori Makers appraisal system \u2014 self-assessments, supervisor evaluations, goal-setting, and upward feedback. Sessions cover: (1) purpose and grounding, (2) rhythms and documentation, (3) bias mitigation and implementation.',
    href: '/institute/courses/mmg-appraisal-cycle--spring-2027',
    slug: 'mmg-appraisal-cycle--spring-2027',
    image: '/institute/courses/CS The MMG Appraisal Cycle (1) copy.png',
    whoFor: 'Heads of school and directors responsible for staff evaluation, professional growth, and performance culture.',
    leaveWith: [
      'A complete, ready-to-implement MMG appraisal system with all templates',
      'A documented evaluation rhythm for your school year',
      'Bias-mitigation protocols for each stage of the appraisal cycle',
    ],
  },
]

export const summer2027Offerings: Offering[] = [
  {
    format: '3-Hour Workshop',
    title: 'Community Architecture: Partnership, Belonging & Collective Care',
    dates: 'Tuesday, July 13, 2027 · 9:30am\u201312:30pm CST',
    description:
      'Montessori schools thrive when community systems are intentional and inclusive. This workshop helps leaders design the structures, rhythms, and communication flows that nurture belonging among staff and families \u2014 building rituals that support partnership and collective care in daily practice.',
    href: '/institute/courses/community-architecture--summer-2027',
    slug: 'community-architecture--summer-2027',
    image: '/institute/courses/CS Community Architecture (1) copy.png',
    whoFor: 'Heads, directors, and family and community engagement coordinators.',
    leaveWith: [
      'A community architecture map of your current belonging structures',
      'A communication rhythm design for staff and family engagement',
      'A set of belonging rituals you can implement at the start of next year',
    ],
  },
  {
    format: '5-Hour Intensive',
    title: 'School Identity & Storytelling Systems',
    dates: 'Thursday, August 5, 2027 · 9:30am\u20132:30pm CST',
    description:
      'Every Montessori school holds a unique identity \u2014 but communicating it clearly can be challenging. This intensive helps leaders articulate a coherent school voice and build communication systems for weekly messaging, internal communications, external storytelling, and crisis response.',
    href: '/institute/courses/school-identity-storytelling--summer-2027',
    slug: 'school-identity-storytelling--summer-2027',
    image: '/institute/courses/CS School Identity & Storytelling (1) copy.png',
    whoFor: 'Heads and directors, and anyone responsible for school communications or enrollment.',
    leaveWith: [
      'A school voice framework that is distinctive, consistent, and mission-aligned',
      'Communication templates for four channels: weekly, internal, external, and crisis',
      'A crisis communication protocol ready to adapt when needed',
    ],
  },
  {
    format: '6-Hour Systems Cohort',
    title: 'Strategic Planning the Montessori Way: Aim, Scheme & Implementation',
    dates: 'Thursday, July 24 · 5\u20137pm CST \u00b7 Tuesday, July 29 · 5\u20137pm CST \u00b7 Thursday, July 31 · 5\u20137pm CST',
    description:
      'Strategic planning in Montessori environments must be aspirational, grounded, and human-centered. Over three sessions, participants work through the Montessori Makers Organizational Mapping framework \u2014 crafting a 3\u20135 year roadmap aligned with people, structures, and systems. Sessions cover: (1) aim and vision, (2) scheme and stakeholders, (3) implementation and accountability.',
    href: '/institute/courses/strategic-planning-montessori-way--summer-2027',
    slug: 'strategic-planning-montessori-way--summer-2027',
    whoFor: 'Leadership teams and boards engaged in or preparing for a strategic planning process.',
    leaveWith: [
      'A 3\u20135 year roadmap draft aligned to your school\u2019s people and systems',
      'A stakeholder engagement plan for the planning process',
      'An accountability system with clear owners, rhythms, and check-ins',
    ],
  },
]

// ─── Season definitions ───────────────────────────────────────────────────────

export interface Season {
  id: string
  eyebrow: string
  heading: string
  lastDate: Date
  offerings: Offering[]
}

export const ALL_SEASONS: Season[] = [
  {
    id: 'spring-2026',
    eyebrow: 'Spring 2026',
    heading: 'March \u2014 May 2026',
    lastDate: new Date(2026, 4, 14),
    offerings: spring2026Offerings,
  },
  {
    id: 'summer-2026',
    eyebrow: 'Summer 2026',
    heading: 'June \u2014 August 2026',
    lastDate: new Date(2026, 7, 29),
    offerings: summer2026Offerings,
  },
  {
    id: 'fall-2026',
    eyebrow: 'Fall 2026',
    heading: 'September \u2014 November 2026',
    lastDate: new Date(2026, 10, 21),
    offerings: fall2026Offerings,
  },
  {
    id: 'winter-2027',
    eyebrow: 'Winter 2027',
    heading: 'December 2026 \u2014 March 2027',
    lastDate: new Date(2027, 2, 14),
    offerings: winter2027Offerings,
  },
  {
    id: 'spring-2027',
    eyebrow: 'Spring 2027',
    heading: 'March \u2014 May 2027',
    lastDate: new Date(2027, 4, 17),
    offerings: spring2027Offerings,
  },
  {
    id: 'summer-2027',
    eyebrow: 'Summer 2027',
    heading: 'June \u2014 August 2027',
    lastDate: new Date(2027, 7, 16),
    offerings: summer2027Offerings,
  },
]

/**
 * Returns ALL_SEASONS reordered so the first entry is the earliest season
 * that hasn't fully passed. Past seasons rotate to the end.
 */
export function getOrderedSeasons(): Season[] {
  const today = new Date()
  const firstActiveIndex = ALL_SEASONS.findIndex((s) => s.lastDate >= today)
  if (firstActiveIndex <= 0) return ALL_SEASONS
  return [
    ...ALL_SEASONS.slice(firstActiveIndex),
    ...ALL_SEASONS.slice(0, firstActiveIndex),
  ]
}

/**
 * Returns all offerings across all seasons as a flat array.
 * Used by the dynamic course detail route to find an offering by slug.
 */
export function getAllOfferings(): Offering[] {
  return ALL_SEASONS.flatMap((s) => s.offerings)
}

/**
 * Finds an offering by slug across all seasons.
 */
export function getOfferingBySlug(slug: string): Offering | undefined {
  return getAllOfferings().find((o) => o.slug === slug)
}
