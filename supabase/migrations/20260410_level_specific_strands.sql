-- ============================================================================
-- Level-Specific Strands & Categories
-- Restructures strands to be level-specific (Primary vs Elementary have
-- different album sets) and seeds categories from AMI album TOCs.
-- 2026-04-10
-- ============================================================================

-- ─── Add level_id to strands ─────────────────────────────────────────────
ALTER TABLE residency_strands
  ADD COLUMN IF NOT EXISTS level_id uuid REFERENCES residency_levels(id);

-- ─── Drop old unique constraints ─────────────────────────────────────────
-- We need "Language", "Mathematics", "Theory" etc. to exist for both levels
ALTER TABLE residency_strands DROP CONSTRAINT IF EXISTS residency_strands_name_key;
ALTER TABLE residency_strands DROP CONSTRAINT IF EXISTS residency_strands_slug_key;

ALTER TABLE residency_categories DROP CONSTRAINT IF EXISTS residency_categories_name_key;
ALTER TABLE residency_categories DROP CONSTRAINT IF EXISTS residency_categories_slug_key;

-- ─── Delete existing seed data ───────────────────────────────────────────
-- No lessons have been uploaded yet, so safe to clear and reseed
DELETE FROM residency_categories;
DELETE FROM residency_strands;

-- ─── Add composite unique constraints ────────────────────────────────────
ALTER TABLE residency_strands
  ADD CONSTRAINT residency_strands_slug_level_key UNIQUE (slug, level_id);

ALTER TABLE residency_categories
  ADD CONSTRAINT residency_categories_slug_strand_key UNIQUE (slug, strand_id);

-- ============================================================================
-- PRIMARY (3-6) STRANDS & CATEGORIES
-- Albums: Practical Life, Sensorial, Language, Mathematics, Theory
-- ============================================================================

-- Get Primary level ID
DO $$
DECLARE
  primary_id uuid;
  elementary_id uuid;
  strand_id uuid;
BEGIN

SELECT id INTO primary_id FROM residency_levels WHERE slug = 'primary';
SELECT id INTO elementary_id FROM residency_levels WHERE slug = 'elementary';

-- ─── PRIMARY: Practical Life ─────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Practical Life', 'practical-life', 'The foundation of the Montessori classroom -- carrying, pouring, folding, sweeping, and the care of self and environment that builds concentration, coordination, independence, and order.', 1, primary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Preliminary Exercises', 'preliminary-exercises', 'The first lessons a child receives -- carrying a chair, rolling a rug, pouring, sponging, and the basic movements that underpin all later work.', 1, strand_id),
  ('Care of Self', 'care-of-self', 'Dressing frames, hand washing, shoe polishing, food preparation, sewing -- lessons that build autonomy and dignity.', 2, strand_id),
  ('Care of the Environment', 'care-of-environment', 'Sweeping, dusting, polishing, washing, flower arranging, and composting -- the child''s contribution to the shared space.', 3, strand_id),
  ('Social Relations', 'social-relations', 'Grace and courtesy lessons -- greeting, interrupting politely, passing by someone, offering comfort, and the social fabric of the classroom.', 4, strand_id),
  ('Control of Movement', 'control-of-movement', 'Walking on the line, the silence game, and other explorations of movement that refine coordination and build inner discipline.', 5, strand_id);

-- ─── PRIMARY: Sensorial ─────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Sensorial', 'sensorial', 'Cylinder blocks, pink tower, brown stair, color tablets, and the geometry cabinet -- refining each sense through carefully graded, self-correcting materials.', 2, primary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Visual Sense', 'visual-sense', 'Cylinder blocks, pink tower, brown stair, red rods, color tablets, geometry cabinet, and botany cabinet -- discrimination of size, form, and color.', 1, strand_id),
  ('Tactile Sense', 'tactile-sense', 'Rough and smooth boards, touch tablets, fabric boxes, thermic bottles and tablets, baric tablets -- refining the sense of touch.', 2, strand_id),
  ('Gustatory Sense', 'gustatory-sense', 'Tasting bottles -- developing the ability to distinguish sweet, salty, sour, and bitter.', 3, strand_id),
  ('Olfactory Sense', 'olfactory-sense', 'Smelling bottles -- training the nose to distinguish and classify scents.', 4, strand_id),
  ('Auditory Sense', 'auditory-sense', 'Sound cylinders and bells -- training the ear to distinguish pitch, volume, and timbre.', 5, strand_id),
  ('Stereognostic Activities', 'stereognostic-activities', 'Geometric solids, sorting exercises, and the mystery bag -- identifying objects through touch alone.', 6, strand_id),
  ('Mixed Impressions', 'mixed-impressions', 'Binomial and trinomial cubes, constructive triangles, knobless cylinders, and the sensorial decanomial -- combining multiple visual discriminations.', 7, strand_id);

-- ─── PRIMARY: Language ───────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Language', 'language', 'From spoken language to sandpaper letters to the moveable alphabet to reading -- a carefully sequenced progression that honors the child''s natural development of communication and literacy.', 3, primary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Spoken Language', 'spoken-language', 'Singing, storytelling, conversation, the question game, classified pictures, and vocabulary enrichment -- building the oral foundation for literacy.', 1, strand_id),
  ('Written Language', 'written-language', 'Sound games, sandpaper letters, the moveable alphabet, and aides to handwriting including metal insets -- the child writes before they read.', 2, strand_id),
  ('Reading Exercises', 'reading-exercises', 'Phonetic object box, puzzle words, phonogram exercises, classified reading cards, and definitions -- mechanics of reading and comprehension.', 3, strand_id),
  ('Function of Words', 'function-of-words', 'Article, adjective, conjunction, preposition, verb, adverb -- parts of speech through the grammar symbols and games.', 4, strand_id),
  ('Reading Analysis', 'reading-analysis', 'Sentence analysis in stages -- understanding sentence structure from simple sentences through extensions, attributes, and appositions.', 5, strand_id);

-- ─── PRIMARY: Mathematics ────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Mathematics', 'mathematics', 'Number rods to golden beads to the stamp game to the bead frame -- concrete to abstract, building number sense, place value, and operations through hands-on materials.', 4, primary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Numbers 0 to 10', 'numbers-0-to-10', 'Number rods, sandpaper numerals, spindle boxes, cards and counters, and the memory game -- building one-to-one correspondence and number sense.', 1, strand_id),
  ('The Decimal System', 'decimal-system', 'Golden beads and formation of numbers -- understanding place value and the four operations with concrete materials.', 2, strand_id),
  ('Continuation of Counting', 'continuation-of-counting', 'Teen boards, tens boards, and linear counting with the 100 and 1,000 chains -- skip counting and pattern recognition.', 3, strand_id),
  ('Memorization Work', 'memorization-work', 'Snake games, strip boards, bead bars, and division boards -- committing math facts to memory through concrete exploration.', 4, strand_id),
  ('Passage to Abstraction', 'passage-to-abstraction', 'Small bead frame, wooden hierarchy material, large bead frame, and racks and tubes -- moving from concrete to abstract.', 5, strand_id),
  ('Fractions', 'fractions', 'Fraction circles -- exploration, naming, writing, equivalence, and operations with fractions.', 6, strand_id);

-- ─── PRIMARY: Theory ─────────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Theory', 'theory', 'The philosophical and developmental foundations of Montessori pedagogy -- Dr. Montessori''s life, the planes of development, sensitive periods, the absorbent mind, and the prepared environment.', 5, primary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Dr. Montessori -- Her Life and Work', 'dr-montessori-life-work', 'Timeline of Maria Montessori''s life, contributions, and the development of her method.', 1, strand_id),
  ('Human Tendencies', 'human-tendencies-primary', 'The universal human tendencies -- exploration, orientation, order, communication, activity, manipulation, work, repetition, exactness, abstraction, and self-perfection.', 2, strand_id),
  ('The Four Planes of Development', 'four-planes-primary', 'The constructive rhythm of life from birth through maturity -- characteristics, needs, and sensitivities of each plane.', 3, strand_id),
  ('The Absorbent Mind', 'absorbent-mind', 'The unique capacity of the child in the first plane to absorb the environment unconsciously and then consciously.', 4, strand_id),
  ('The Sensitive Periods', 'sensitive-periods', 'Windows of intense sensitivity -- order, language, movement, refinement of the senses, social behavior, and small objects.', 5, strand_id),
  ('Adaptation', 'adaptation', 'How the child adapts to the culture and environment, becoming a member of the group.', 6, strand_id),
  ('The Prepared Environment', 'prepared-environment-primary', 'Principles and design of the Montessori classroom -- freedom, structure, beauty, and order.', 7, strand_id),
  ('Observation', 'observation-primary', 'The art and practice of observing children -- what to look for, how to record, and how observation guides the adult.', 8, strand_id),
  ('Development of Movement', 'development-of-movement', 'The relationship between movement and cognition, and how the Montessori environment supports motor development.', 9, strand_id),
  ('Development of Independence', 'development-of-independence', 'How the environment and the adult foster the child''s growing autonomy.', 10, strand_id),
  ('Freedom and Discipline', 'freedom-and-discipline-primary', 'The Montessori understanding of freedom within limits and the emergence of inner discipline.', 11, strand_id),
  ('Development of the Will and Obedience', 'will-and-obedience', 'The three levels of obedience and the development of the will through purposeful activity.', 12, strand_id),
  ('Normalization and Deviations', 'normalization-and-deviations', 'The process of normalization through concentrated work and the recognition of developmental deviations.', 13, strand_id),
  ('Indirect Preparation', 'indirect-preparation', 'How earlier activities prepare the child for later, more complex work -- a hallmark of Montessori sequencing.', 14, strand_id),
  ('The Mixed Age Group', 'mixed-age-group', 'The rationale and benefits of a three-year age span in one classroom.', 15, strand_id),
  ('Social Development', 'social-development-primary', 'How the child develops socially within the prepared environment and the role of the community.', 16, strand_id),
  ('The Montessori Guide', 'montessori-guide-primary', 'The role and qualities of the Montessori teacher -- the prepared adult.', 17, strand_id);


-- ============================================================================
-- ELEMENTARY (6-12) STRANDS & CATEGORIES
-- Albums: Geography, Biology, History, Geometry, Language, Mathematics,
--         Art, Music, Theory
-- ============================================================================

-- ─── ELEMENTARY: Geography ───────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Geography', 'geography', 'From the creation of the Earth to the work of air and water to human interdependence -- the great story of our planet told through impressionistic lessons, experiments, and charts.', 1, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to Geography', 'intro-geography', 'Overview and orientation to the study of geography in the elementary classroom.', 1, strand_id),
  ('Practical Considerations', 'practical-considerations-geo', 'Experiments, command cards, charts, nomenclature, outline maps, and practical materials for geography study.', 2, strand_id),
  ('Idea of Universe and Creation of Earth', 'universe-creation-earth', 'The 1st Great Story: God Who Has No Hands -- the formation of the universe, composition of the Earth, continental drift, and mountain formation.', 3, strand_id),
  ('Nature of the Elements', 'nature-of-elements', 'Attraction and gravity, combining and separating, states of matter -- the fundamental properties of the physical world.', 4, strand_id),
  ('The Sun and the Earth', 'sun-and-earth', 'Rotation, day and night, longitude and latitude, the tilt of the axis, seasons, tropics, climate zones, and the atmosphere.', 5, strand_id),
  ('Work of Air', 'work-of-air', 'The wind, global winds, rain and seasonal rain, ocean currents, and wind erosion.', 6, strand_id),
  ('Work of Water', 'work-of-water', 'The river, water erosion, the water cycle, spread of vegetation, and people living in different zones.', 7, strand_id),
  ('Human Beings on Earth', 'human-beings-on-earth', 'Human interdependencies, economic geography, production, consumption, and world trade.', 8, strand_id),
  ('Review of Geography', 'review-geography', 'Synthesis of geography content, aims, and the role of geography in cosmic education.', 9, strand_id);

-- ─── ELEMENTARY: Biology ─────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Biology', 'biology', 'The Coming of Life, the Timeline of Life, botany, and zoology -- the study of living things from the earliest organisms to the interdependence of all life.', 2, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to Biology', 'intro-biology', 'Overview and orientation to the study of biology in the elementary classroom.', 1, strand_id),
  ('The Coming of Life', 'coming-of-life', 'The 2nd Great Story and the Timeline of Life -- the narrative of life on Earth from single cells to the present.', 2, strand_id),
  ('Botany: Needs of the Plant', 'botany-needs', 'Water, light, warmth, air, minerals, and the nitrogen cycle -- what plants need to thrive.', 3, strand_id),
  ('Botany: The Leaf', 'botany-leaf', 'The food factory of the plant -- function, parts, variety, and modification of leaves.', 4, strand_id),
  ('Botany: The Root', 'botany-root', 'Anchoring and absorbing -- function, parts, tropisms, variety, and modification of roots.', 5, strand_id),
  ('Botany: The Stem', 'botany-stem', 'Carrying water and supporting leaves -- function, herbaceous vs. woody stems, variety, and modification.', 6, strand_id),
  ('Botany: The Flower', 'botany-flower', 'Pollination stories, parts, variations, and the reproductive function of the flower.', 7, strand_id),
  ('Botany: The Fruit', 'botany-fruit', 'The ripened ovary -- function, parts, classification (simple, aggregate, multiple, accessory), and seed dispersal.', 8, strand_id),
  ('Botany: The Seed', 'botany-seed', 'Germination, parts of the seed, and the beginning of a new plant.', 9, strand_id);

-- ─── ELEMENTARY: History ─────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('History', 'history', 'From the Black Strip to the Coming of Human Beings to civilizations and migrations -- the story of humanity told through great stories, timelines, and key lessons.', 3, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to History', 'intro-history', 'Overview and orientation to the study of history in the elementary classroom.', 1, strand_id),
  ('The Black Strip', 'black-strip', 'The dramatic visual representation of the vastness of time before human beings appeared.', 2, strand_id),
  ('The Coming of Human Beings', 'coming-of-human-beings', 'The 3rd Great Story -- the arrival of humans with their special gifts of mind and hand.', 3, strand_id),
  ('The Hand Timeline', 'hand-timeline', 'Exploring the relationship between the human hand, tools, and the development of civilization.', 4, strand_id),
  ('The Clock of Eras', 'clock-of-eras', 'A visual representation of geological time showing the major eras of Earth''s history.', 5, strand_id),
  ('Fundamental Needs of Human Beings', 'fundamental-needs', 'Material and spiritual needs -- the universal needs that drive human progress and connect all cultures.', 6, strand_id),
  ('Timelines of Human Beings', 'timelines-human-beings', 'The first and second timelines -- tracing the development of early human civilization.', 7, strand_id),
  ('Three Phases in History', 'three-phases', 'Nomadic, agricultural, and urban -- the great transitions of human society.', 8, strand_id),
  ('History Question Charts', 'history-question-charts', 'Nature of the country, practical activities, intellectual and spiritual life, relationships -- a framework for studying any civilization.', 9, strand_id),
  ('Civilizations', 'civilizations', 'River civilizations, early civilizations of the Americas, and the study of cultures through time.', 10, strand_id),
  ('Migrations of People', 'migrations', 'The hunt, glaciation, displacement, infiltration and fusion -- the forces that moved peoples across the globe.', 11, strand_id),
  ('Making a Timeline', 'making-a-timeline', 'The art and process of creating, presenting, and exploring timelines.', 12, strand_id),
  ('Timeline of the Child''s Own Country', 'timeline-own-country', 'Connecting the child to their own national history through timeline work.', 13, strand_id),
  ('Time Activities', 'time-activities', 'Calendar, BC/AD, months, days, telling time -- exercises for understanding time itself.', 14, strand_id),
  ('Review of History', 'review-history', 'Synthesis of history content, cosmic education, and the child as builder of humanity.', 15, strand_id);

-- ─── ELEMENTARY: Geometry ────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Geometry', 'geometry', 'From the story of how geometry got its name to the study of lines, angles, polygons, and area -- abstract mathematical thinking grounded in sensorial exploration.', 4, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to Geometry', 'intro-geometry', 'The story of how geometry got its name and an overview of geometry in the elementary classroom.', 1, strand_id),
  ('Geometry Nomenclature & Activities', 'geometry-nomenclature', 'Nomenclature, command cards, design work, constructions, and the geometry portfolio.', 2, strand_id),
  ('Geometric Solids', 'geometric-solids', 'Names, parts, polyhedrons, solids of rotation -- three-dimensional forms explored through the hands.', 3, strand_id),
  ('Congruence, Similarity, Equivalence', 'congruence-similarity', 'The three fundamental geometric relationships explored with divided figures and constructive triangles.', 4, strand_id),
  ('Lines', 'lines', 'Types, positions, parallel and non-parallel, intersecting, and perpendicular bisectors.', 5, strand_id),
  ('Angles', 'angles', 'Types, parts, measurement, bisecting, and relationships between angles formed by intersecting lines and transversals.', 6, strand_id),
  ('Polygons', 'polygons', 'Naming, parts, interior angles, diagonals, regular polygons, triangles, and quadrilaterals.', 7, strand_id);

-- ─── ELEMENTARY: Language ────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Language', 'language', 'The Story of Communication in Signs, the history of language, grammar and syntax, word study, parts of speech, and sentence analysis -- language as a tool for thinking and communicating.', 5, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to Language', 'intro-language-el', 'Overview of language in the elementary classroom and its role in the second plane.', 1, strand_id),
  ('The Story of Communication in Signs', 'story-communication-signs', 'The 4th Great Story -- the human invention of writing and symbolic communication.', 2, strand_id),
  ('History of Language', 'history-of-language', 'History of written language (pre-alphabetic to modern), history of spoken language, origins and language families.', 3, strand_id),
  ('Word Study', 'word-study-el', 'Suffixes, prefixes, compound words, word families, and definitions -- building vocabulary and understanding word construction.', 4, strand_id),
  ('Parts of Speech', 'parts-of-speech', 'Noun, article, adjective, verb, adverb, preposition, pronoun, conjunction, interjection -- grammar through the grammar boxes and symbols.', 5, strand_id),
  ('Sentence Analysis', 'sentence-analysis-el', 'Simple and compound sentences, clauses, phrases -- understanding the structure of language.', 6, strand_id);

-- ─── ELEMENTARY: Mathematics ─────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Mathematics', 'mathematics', 'The Story of Our Numerals, the decimal system, laws of operations, long multiplication and division, fractions, and the passage to abstraction -- mathematical thinking from concrete to abstract.', 6, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Great Story for Mathematics', 'great-story-math', 'The Story of Our Numerals -- the 5th Great Story of how humans developed a system to express quantity.', 1, strand_id),
  ('The Decimal System', 'decimal-system-el', 'Wooden hierarchy, large bead frame, numeration, and laws of numbers.', 2, strand_id),
  ('Basic Operations', 'basic-operations-el', 'Counting, addition, subtraction -- foundational work with whole numbers and memorization of facts.', 3, strand_id),
  ('Laws for Multiplication', 'laws-multiplication', 'Commutative and distributive laws explored with bead bars and number cards.', 4, strand_id),
  ('Long Multiplication', 'long-multiplication', 'Checkerboard, large bead frame, bank game, and flat bead frame -- multi-digit multiplication.', 5, strand_id),
  ('Long Division', 'long-division', 'Racks and tubes, test tube division -- multi-digit division with increasing abstraction.', 6, strand_id),
  ('Fractions', 'fractions-el', 'Fraction circles, equivalence, operations -- a deep exploration of parts and wholes.', 7, strand_id),
  ('Squaring and Cubing', 'squaring-cubing', 'Squares and cubes of numbers, square roots, and cube roots -- algebraic preparation.', 8, strand_id);

-- ─── ELEMENTARY: Art ─────────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Art', 'art', 'The Story of the Created Image, elements and principles of art, drawing techniques, painting, clay, printmaking, and book arts -- nurturing the creative spirit through structured exploration.', 7, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to Art', 'intro-art', 'What is art, its history, and the role of art in the Montessori elementary classroom.', 1, strand_id),
  ('Story of the Created Image', 'story-created-image', 'The impressionistic telling of humanity''s drive to create images across time and culture.', 2, strand_id),
  ('Elements of Art', 'elements-of-art', 'Line, shape, form, space, color, texture, value, and perspective -- the building blocks of visual art.', 3, strand_id),
  ('Principles of Art', 'principles-of-art', 'Emphasis, balance, unity, contrast, pattern, movement, rhythm -- how elements are organized in composition.', 4, strand_id),
  ('Art Media and Techniques', 'art-media-techniques', 'Drawing, painting, clay, printmaking, fiber art, and the art of making books.', 5, strand_id),
  ('Artists and Their Work', 'artists-and-their-work', 'Selection of art prints, study of artists, and the prepared art environment.', 6, strand_id);

-- ─── ELEMENTARY: Music ───────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Music', 'music', 'The Story of Music, singing, rhythm, listening, the tone bars, and the grand staff -- a structured exploration of the language of music.', 8, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to Music', 'intro-music', 'Overview of music in the Montessori elementary classroom and the story of music.', 1, strand_id),
  ('Singing', 'singing', 'Unison and solo singing, part singing, rounds, ostinatos, partner songs, and descants.', 2, strand_id),
  ('Rhythm', 'rhythm', 'Notation of rhythm, note values, rests, equivalence with dotted notes, and rhythm charts.', 3, strand_id),
  ('Rhythm Instruments', 'rhythm-instruments', 'Introduction to instruments, playing techniques, and playing the beat.', 4, strand_id),
  ('Listening', 'listening', 'Listening games, listening to music, and developing the ability to hear structure and beauty.', 5, strand_id),
  ('The Tone Bars', 'tone-bars', 'Playing, naming, notation, degrees of the scale, intervals, key signatures, and transposition.', 6, strand_id),
  ('The Grand Staff', 'grand-staff', 'The story and structure of the grand staff -- reading and writing music notation.', 7, strand_id);

-- ─── ELEMENTARY: Theory ──────────────────────────────────────────────────
INSERT INTO residency_strands (name, slug, description, sort_order, level_id) VALUES
  ('Theory', 'theory', 'The philosophical and developmental foundations for the second plane -- cosmic education, the great stories, the prepared environment, the role of the adult, and the child of the second plane.', 9, elementary_id)
  RETURNING id INTO strand_id;

INSERT INTO residency_categories (name, slug, description, sort_order, strand_id) VALUES
  ('Introduction to Theory', 'intro-theory-el', 'Overview of theory topics for the elementary level and the relationship between 3-6 and 6-12 theory.', 1, strand_id),
  ('Self-Construction, Human Needs, and Tendencies', 'self-construction-tendencies', 'The child''s self-construction, universal human needs, and the tendencies that drive development.', 2, strand_id),
  ('The Four Planes of Development', 'four-planes-el', 'The constructive rhythm of life, the bulb, and detailed study of each plane with emphasis on the second.', 3, strand_id),
  ('Cosmic Education', 'cosmic-education', 'The organizing principle of the elementary curriculum -- the universe story, interdependence, and the child''s place in the cosmos.', 4, strand_id),
  ('Great Stories and Key Lessons', 'great-stories-key-lessons', 'The five great stories and the key lessons that radiate from them.', 5, strand_id),
  ('The Prepared Environment', 'prepared-environment-el', 'Design and principles of the elementary prepared environment -- how it differs from primary.', 6, strand_id),
  ('The Role of the Adult', 'role-of-adult', 'The trained adult, the assistant, other adults, and the parent -- the ecosystem of support around the child.', 7, strand_id),
  ('Observation', 'observation-el', 'Observation in the elementary classroom -- what to look for and how observation informs the adult''s work.', 8, strand_id),
  ('Going-Out', 'going-out', 'Theory and practical considerations for elementary going-out experiences -- the child''s research in the world.', 9, strand_id),
  ('Grace and Courtesy in Elementary', 'grace-courtesy-el', 'Social life in the second plane -- how grace and courtesy evolves from primary to elementary.', 10, strand_id),
  ('Freedom and Responsibility', 'freedom-responsibility', 'The elementary understanding of freedom -- choice, responsibility, and the social contract.', 11, strand_id),
  ('The 9-12 Class', 'the-9-12-class', 'Considerations specific to the upper elementary years and the transition toward the third plane.', 12, strand_id),
  ('Imagination', 'imagination', 'The role of imagination in the second plane and its relationship to reasoning and abstraction.', 13, strand_id);

END $$;
