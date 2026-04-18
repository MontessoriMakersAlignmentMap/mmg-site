const PRIMARY_DECKS: Record<number, string> = {
  1: '/decks/primary/Week-01-Who-Was-Maria-Montessori.html',
  2: '/decks/primary/Week-02-The-Absorbent-Mind-in-Real-Life.html',
  3: '/decks/primary/Week-03-Practical-Life.html',
  4: '/decks/primary/Week-04-Prepared-Environment-as-Justice.html',
  5: '/decks/primary/Week-05-Care-of-Environment.html',
  6: '/decks/primary/Week-06-Grace-and-Courtesy-Anti-Bias.html',
  7: '/decks/primary/Week-07-Cultural-Dimensions-of-Practical-Life.html',
  8: '/decks/primary/Week-08-Fading-as-a-Practice.html',
  9: '/decks/primary/Week-09-Ready-to-Move-On.html',
  10: '/decks/primary/Week-10-Sensorial-in-the-Brain.html',
  11: '/decks/primary/Week-11-The-Mathematical-Mind.html',
  12: '/decks/primary/Week-12-Normalization.html',
  13: '/decks/primary/Week-13-Sensory-Processing.html',
  14: '/decks/primary/Week-14-The-Three-Period-Lesson.html',
}

const ELEMENTARY_DECKS: Record<number, string> = {}

export function getDeckUrl(track: string, weekNumber: number): string | null {
  const map = track === 'primary' ? PRIMARY_DECKS : ELEMENTARY_DECKS
  return map[weekNumber] || null
}
