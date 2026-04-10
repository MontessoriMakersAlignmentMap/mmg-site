-- ============================================================================
-- Montessori Makers Residency — Curriculum Expansion
-- Adds expanded lesson fields and seeds strand/category taxonomy
-- 2026-04-10
-- ============================================================================

-- ─── Expand lessons table ─────────────────────────────────────────────────
-- Add rich content fields for the full lesson view

ALTER TABLE residency_lessons
  ADD COLUMN IF NOT EXISTS age_range text,
  ADD COLUMN IF NOT EXISTS why_this_lesson_matters text,
  ADD COLUMN IF NOT EXISTS direct_aim text,
  ADD COLUMN IF NOT EXISTS indirect_aim text,
  ADD COLUMN IF NOT EXISTS equity_aim text,
  ADD COLUMN IF NOT EXISTS presentation text,
  ADD COLUMN IF NOT EXISTS points_of_interest text,
  ADD COLUMN IF NOT EXISTS variations text,
  ADD COLUMN IF NOT EXISTS neurodivergence_notes text;

-- ─── Add level association to categories ──────────────────────────────────
-- Categories belong to specific strands

ALTER TABLE residency_categories
  ADD COLUMN IF NOT EXISTS strand_id uuid REFERENCES residency_strands(id);

-- ─── Seed strands ─────────────────────────────────────────────────────────

INSERT INTO residency_strands (name, slug, description, sort_order) VALUES
  ('Practical Life', 'practical-life', 'The foundation of the Montessori classroom. These lessons build independence, concentration, coordination, and a sense of order through purposeful, real-world activities.', 1),
  ('Sensorial', 'sensorial', 'Lessons that refine the senses and build the cognitive structures children need for abstract thinking. Each material isolates a single quality for focused exploration.', 2),
  ('Language', 'language', 'From spoken language to writing to reading — a carefully sequenced progression that honors the child''s natural development of communication and literacy.', 3),
  ('Math', 'math', 'Concrete materials that make abstract mathematical concepts visible and tangible. Children build deep number sense before moving to abstraction.', 4),
  ('Cultural', 'cultural', 'Geography, science, history, art, and music — the subjects that connect children to the wider world and cultivate wonder, empathy, and belonging.', 5),
  ('Equity and Community', 'equity-and-community', 'Lessons and practices that center justice, belonging, and anti-bias work in the Montessori classroom. Not an add-on — a through-line.', 6)
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- ─── Seed levels ──────────────────────────────────────────────────────────

INSERT INTO residency_levels (name, slug, age_range, sort_order) VALUES
  ('Primary', 'primary', '3–6', 1),
  ('Lower Elementary', 'lower-elementary', '6–9', 2),
  ('Upper Elementary', 'upper-elementary', '9–12', 3)
ON CONFLICT (slug) DO UPDATE SET
  age_range = EXCLUDED.age_range,
  sort_order = EXCLUDED.sort_order;

-- ─── Seed categories ──────────────────────────────────────────────────────
-- Each category belongs to a strand

-- Practical Life categories
INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Preliminary Exercises', 'preliminary-exercises', 'The first lessons a child receives — carrying, pouring, folding, and the basic movements that underpin all later work.', 1,
    (SELECT id FROM residency_strands WHERE slug = 'practical-life')),
  ('Care of Self', 'care-of-self', 'Dressing, grooming, and personal hygiene — lessons that build autonomy and dignity.', 2,
    (SELECT id FROM residency_strands WHERE slug = 'practical-life')),
  ('Care of Environment', 'care-of-environment', 'Sweeping, polishing, watering plants, and arranging flowers — the child''s contribution to the shared space.', 3,
    (SELECT id FROM residency_strands WHERE slug = 'practical-life')),
  ('Grace and Courtesy', 'grace-and-courtesy', 'How to greet someone, interrupt politely, resolve a conflict, and navigate social life with respect.', 4,
    (SELECT id FROM residency_strands WHERE slug = 'practical-life')),
  ('Food Preparation', 'food-preparation', 'Cutting, spreading, peeling, and cooking — real work that builds concentration, sequencing, and practical skill.', 5,
    (SELECT id FROM residency_strands WHERE slug = 'practical-life'))
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  strand_id = EXCLUDED.strand_id;

-- Sensorial categories
INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Visual Sense', 'visual-sense', 'Discrimination of size, shape, color, and form through materials like the pink tower, brown stair, and color tablets.', 1,
    (SELECT id FROM residency_strands WHERE slug = 'sensorial')),
  ('Tactile Sense', 'tactile-sense', 'Rough and smooth, temperature, weight — refining the sense of touch through focused, hands-on exploration.', 2,
    (SELECT id FROM residency_strands WHERE slug = 'sensorial')),
  ('Auditory Sense', 'auditory-sense', 'Sound cylinders, bells, and silence games — training the ear to distinguish pitch, volume, and timbre.', 3,
    (SELECT id FROM residency_strands WHERE slug = 'sensorial')),
  ('Olfactory and Gustatory', 'olfactory-gustatory', 'Smelling bottles and tasting exercises that sharpen the often-overlooked senses.', 4,
    (SELECT id FROM residency_strands WHERE slug = 'sensorial')),
  ('Stereognostic Sense', 'stereognostic-sense', 'Mystery bags, geometric solids, and sorting by touch alone — building the capacity to identify objects without sight.', 5,
    (SELECT id FROM residency_strands WHERE slug = 'sensorial'))
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  strand_id = EXCLUDED.strand_id;

-- Language categories
INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Spoken Language', 'spoken-language', 'Vocabulary enrichment, storytelling, conversation, and the social foundations of communication.', 1,
    (SELECT id FROM residency_strands WHERE slug = 'language')),
  ('Writing', 'writing', 'From metal insets to sandpaper letters to the moveable alphabet — the child writes before they read.', 2,
    (SELECT id FROM residency_strands WHERE slug = 'language')),
  ('Reading', 'reading', 'Phonetic reading, puzzle words, and the progression from decoding to comprehension and fluency.', 3,
    (SELECT id FROM residency_strands WHERE slug = 'language')),
  ('Grammar and Word Study', 'grammar-word-study', 'Parts of speech, sentence analysis, and word study — grammar as a key to understanding language structure.', 4,
    (SELECT id FROM residency_strands WHERE slug = 'language'))
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  strand_id = EXCLUDED.strand_id;

-- Math categories
INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Numeration', 'numeration', 'Number rods, sandpaper numerals, spindle boxes, and cards and counters — building one-to-one correspondence and number sense.', 1,
    (SELECT id FROM residency_strands WHERE slug = 'math')),
  ('The Decimal System', 'decimal-system', 'Golden beads and stamp game — understanding place value and the four operations with concrete materials.', 2,
    (SELECT id FROM residency_strands WHERE slug = 'math')),
  ('Linear Counting', 'linear-counting', 'Teens and tens boards, hundred chain, thousand chain — skip counting and pattern recognition.', 3,
    (SELECT id FROM residency_strands WHERE slug = 'math')),
  ('Operations', 'operations', 'Addition, subtraction, multiplication, and division — moving from concrete to abstract through carefully sequenced materials.', 4,
    (SELECT id FROM residency_strands WHERE slug = 'math')),
  ('Fractions and Measurement', 'fractions-measurement', 'Fraction circles, measurement activities, and early geometry — extending mathematical thinking.', 5,
    (SELECT id FROM residency_strands WHERE slug = 'math'))
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  strand_id = EXCLUDED.strand_id;

-- Cultural categories
INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Geography', 'geography', 'Land and water forms, puzzle maps, continent studies — building a sense of place in the world.', 1,
    (SELECT id FROM residency_strands WHERE slug = 'cultural')),
  ('Science and Nature', 'science-nature', 'Botany, zoology, physical science, and nature study — cultivating observation, wonder, and scientific thinking.', 2,
    (SELECT id FROM residency_strands WHERE slug = 'cultural')),
  ('History and Time', 'history-time', 'Timelines, calendar work, and the story of human civilization — connecting children to the past and their place in it.', 3,
    (SELECT id FROM residency_strands WHERE slug = 'cultural')),
  ('Art and Music', 'art-music', 'Creative expression, art appreciation, rhythm, melody, and the cultural arts that enrich the prepared environment.', 4,
    (SELECT id FROM residency_strands WHERE slug = 'cultural'))
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  strand_id = EXCLUDED.strand_id;

-- Equity and Community categories
INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Anti-Bias Curriculum', 'anti-bias-curriculum', 'Identity, diversity, justice, and action — the four goals of anti-bias education applied in the Montessori context.', 1,
    (SELECT id FROM residency_strands WHERE slug = 'equity-and-community')),
  ('Classroom Community', 'classroom-community', 'Building belonging, conflict resolution, restorative practices, and a classroom culture where every child is seen.', 2,
    (SELECT id FROM residency_strands WHERE slug = 'equity-and-community')),
  ('Family Partnership', 'family-partnership', 'Engaging families as partners in the child''s education — communication, conferences, and cultural responsiveness.', 3,
    (SELECT id FROM residency_strands WHERE slug = 'equity-and-community')),
  ('Inclusive Practice', 'inclusive-practice', 'Adapting the environment, materials, and presentations for neurodivergent learners and children with disabilities.', 4,
    (SELECT id FROM residency_strands WHERE slug = 'equity-and-community'))
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  strand_id = EXCLUDED.strand_id;

-- ─── Index for category-strand relationship ───────────────────────────────

CREATE INDEX IF NOT EXISTS idx_categories_strand ON residency_categories(strand_id);
