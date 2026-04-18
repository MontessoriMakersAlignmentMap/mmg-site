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
  15: '/decks/primary/Week-15-Control-of-Error.html',
  16: '/decks/primary/Week-16-Adapting-Sensorial.html',
  17: '/decks/primary/Week-17-Science-of-Reading.html',
  18: '/decks/primary/Week-18-Phonological-Awareness.html',
  19: '/decks/primary/Week-19-Dual-Language-Learners.html',
  20: '/decks/primary/Week-20-Moveable-Alphabet.html',
  21: '/decks/primary/Week-21-Decodable-Texts.html',
  22: '/decks/primary/Week-22-Structured-Literacy.html',
  23: '/decks/primary/Week-23-Decimal-System.html',
  24: '/decks/primary/Week-24-Four-Operations.html',
  25: '/decks/primary/Week-25-Passage-to-Abstraction.html',
  26: '/decks/primary/Week-26-Stamp-Game.html',
  27: '/decks/primary/Week-27-Memorization-Work.html',
  28: '/decks/primary/Week-28-Fractions.html',
  29: '/decks/primary/Week-29-Geometry.html',
  30: '/decks/primary/Week-30-Time.html',
  31: '/decks/primary/Week-31-First-Great-Lesson.html',
  32: '/decks/primary/Week-32-Geography.html',
  33: '/decks/primary/Week-33-Botany.html',
  34: '/decks/primary/Week-34-Zoology.html',
  35: '/decks/primary/Week-35-History.html',
  36: '/decks/primary/Week-36-Music.html',
  37: '/decks/primary/Week-37-Art.html',
  38: '/decks/primary/Week-38-Observation.html',
  39: '/decks/primary/Week-39-Families.html',
  40: '/decks/primary/Week-40-Transition-to-Elementary.html',
}

const ELEMENTARY_DECKS: Record<number, string> = {}

export function getDeckUrl(track: string, weekNumber: number): string | null {
  const map = track === 'primary' ? PRIMARY_DECKS : ELEMENTARY_DECKS
  return map[weekNumber] || null
}
