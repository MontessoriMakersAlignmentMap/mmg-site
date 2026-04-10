-- ============================================================================
-- Add Theory strand, fix encoding, add Elementary level if missing
-- 2026-04-10
-- ============================================================================

-- ─── Add Theory strand ────────────────────────────────────────────────────

INSERT INTO residency_strands (name, slug, description, sort_order) VALUES
  ('Theory', 'theory', 'The philosophical, developmental, and historical foundations of Montessori education. Understanding why we do what we do.', 7)
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- ─── Theory categories ────────────────────────────────────────────────────

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Philosophy of Education', 'philosophy-of-education', 'Montessori philosophy, the prepared environment, the role of the adult, freedom within limits, and the absorbent mind.', 1,
    (SELECT id FROM residency_strands WHERE slug = 'theory')),
  ('Child Development', 'child-development', 'Planes of development, sensitive periods, human tendencies, and the science of how children learn.', 2,
    (SELECT id FROM residency_strands WHERE slug = 'theory')),
  ('Observation', 'observation', 'The discipline of watching before intervening. Recording, interpreting, and responding to what children show us.', 3,
    (SELECT id FROM residency_strands WHERE slug = 'theory')),
  ('Montessori History', 'montessori-history', 'Maria Montessori, the origins of the method, its global evolution, and its ongoing transformation.', 4,
    (SELECT id FROM residency_strands WHERE slug = 'theory')),
  ('Classroom Leadership', 'classroom-leadership', 'Environment design, scheduling, record keeping, parent communication, and the practical work of running a Montessori classroom.', 5,
    (SELECT id FROM residency_strands WHERE slug = 'theory'))
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  strand_id = EXCLUDED.strand_id;

-- ─── Fix encoding on strand descriptions ─────────────────────────────────

UPDATE residency_strands SET description = 'Geography, science, history, art, and music — the subjects that connect children to the wider world and cultivate wonder, empathy, and belonging.' WHERE slug = 'cultural';
UPDATE residency_strands SET description = 'From spoken language to writing to reading — a carefully sequenced progression that honors the child''s natural development of communication and literacy.' WHERE slug = 'language';
UPDATE residency_strands SET description = 'Lessons and practices that center justice, belonging, and anti-bias work in the Montessori classroom. Not an add-on — a through-line.' WHERE slug = 'equity-and-community';

-- ─── Fix encoding on category descriptions ────────────────────────────────

UPDATE residency_categories SET description = 'The first lessons a child receives — carrying, pouring, folding, and the basic movements that underpin all later work.' WHERE slug = 'preliminary-exercises';
UPDATE residency_categories SET description = 'Dressing, grooming, and personal hygiene — lessons that build autonomy and dignity.' WHERE slug = 'care-of-self';
UPDATE residency_categories SET description = 'Sweeping, polishing, watering plants, and arranging flowers — the child''s contribution to the shared space.' WHERE slug = 'care-of-environment';
UPDATE residency_categories SET description = 'Cutting, spreading, peeling, and cooking — real work that builds concentration, sequencing, and practical skill.' WHERE slug = 'food-preparation';
UPDATE residency_categories SET description = 'Rough and smooth, temperature, weight — refining the sense of touch through focused, hands-on exploration.' WHERE slug = 'tactile-sense';
UPDATE residency_categories SET description = 'Sound cylinders, bells, and silence games — training the ear to distinguish pitch, volume, and timbre.' WHERE slug = 'auditory-sense';
UPDATE residency_categories SET description = 'Mystery bags, geometric solids, and sorting by touch alone — building the capacity to identify objects without sight.' WHERE slug = 'stereognostic-sense';
UPDATE residency_categories SET description = 'From metal insets to sandpaper letters to the moveable alphabet — the child writes before they read.' WHERE slug = 'writing';
UPDATE residency_categories SET description = 'Parts of speech, sentence analysis, and word study — grammar as a key to understanding language structure.' WHERE slug = 'grammar-word-study';
UPDATE residency_categories SET description = 'Number rods, sandpaper numerals, spindle boxes, and cards and counters — building one-to-one correspondence and number sense.' WHERE slug = 'numeration';
UPDATE residency_categories SET description = 'Golden beads and stamp game — understanding place value and the four operations with concrete materials.' WHERE slug = 'decimal-system';
UPDATE residency_categories SET description = 'Teens and tens boards, hundred chain, thousand chain — skip counting and pattern recognition.' WHERE slug = 'linear-counting';
UPDATE residency_categories SET description = 'Addition, subtraction, multiplication, and division — moving from concrete to abstract through carefully sequenced materials.' WHERE slug = 'operations';
UPDATE residency_categories SET description = 'Fraction circles, measurement activities, and early geometry — extending mathematical thinking.' WHERE slug = 'fractions-measurement';
UPDATE residency_categories SET description = 'Land and water forms, puzzle maps, continent studies — building a sense of place in the world.' WHERE slug = 'geography';
UPDATE residency_categories SET description = 'Botany, zoology, physical science, and nature study — cultivating observation, wonder, and scientific thinking.' WHERE slug = 'science-nature';
UPDATE residency_categories SET description = 'Timelines, calendar work, and the story of human civilization — connecting children to the past and their place in it.' WHERE slug = 'history-time';
UPDATE residency_categories SET description = 'Identity, diversity, justice, and action — the four goals of anti-bias education applied in the Montessori context.' WHERE slug = 'anti-bias-curriculum';
UPDATE residency_categories SET description = 'Engaging families as partners in the child''s education — communication, conferences, and cultural responsiveness.' WHERE slug = 'family-partnership';

-- ─── Ensure Elementary level exists ───────────────────────────────────────

INSERT INTO residency_levels (name, slug, age_range, sort_order) VALUES
  ('Elementary', 'elementary', '6–12', 2)
ON CONFLICT (slug) DO UPDATE SET
  age_range = EXCLUDED.age_range,
  sort_order = EXCLUDED.sort_order;

-- Update Lower/Upper Elementary to just Elementary if they exist
UPDATE residency_levels SET name = 'Elementary', age_range = '6–12', sort_order = 2 WHERE slug = 'elementary';
