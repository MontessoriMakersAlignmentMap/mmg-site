// lib/residency/sampleLessons.ts
// Placeholder lesson data for the MMR sample lessons preview section.
// Replace the field values with real lesson content from the Montessori Albums folder.
// Each lesson maps to one strand at one level.

export interface SampleLesson {
  id: string
  title: string
  strand: string
  level: 'primary' | 'elementary'
  whyThisMatters: string
  directAim: string
  indirectAim: string
  equityAim: string
  materials: string
  presentation: string
  pointsOfInterest: string
  variationsAndExtensions: string
  neurodivergenceNotes: string
}

// ─── PRIMARY 3–6 ──────────────────────────────────────────────────────────────

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Primary/Practical Life/

export const primaryPracticalLife: SampleLesson = {
  id: 'primary-practical-life',
  title: 'Pouring: Dry Beans, Pitcher to Pitcher',
  strand: 'Practical Life',
  level: 'primary',
  whyThisMatters:
    'Control of movement is the foundation of everything else in the Primary environment. When a child transfers dry beans from one pitcher to another, they are not just pouring beans. They are building the neural pathways for attention, sequencing, and the capacity to care for themselves and their community. This work matters because independence is not a developmental luxury — it is a civil right.',
  directAim:
    'To develop the child\'s ability to control the movement of the wrist and forearm in a precise pouring motion, to refine the pincer grip on the pitcher handle, and to build the concentration required to complete a purposeful cycle of work.',
  indirectAim:
    'To prepare the hand for writing through controlled movement, to develop the mathematical mind\'s sensitivity to quantity and volume, and to build the child\'s confidence in their capacity to execute complex tasks independently.',
  equityAim:
    'This material is designed so that any child — regardless of prior experience with kitchen work at home — can access and succeed. We name aloud that families pour things in many different ways and with many different tools, and that all of those ways are correct. The beauty of this material is not that it teaches the "right" way to pour. It is that it gives every child a guaranteed entry point into independent work.',
  materials:
    'A small tray with two matching pitchers (one filled approximately two-thirds with dry beans), a small dustpan and brush placed to the right of the tray, a small mat for the tray to rest on.',
  presentation:
    'Invite the child by name and walk with them to where the material is stored. Carry the tray together to a table, or place it on a floor mat if the child prefers floor work. Sit beside the child — not across from them — so they can observe your dominant hand without mirroring. Name the material: "This is the pouring work with dry beans." Demonstrate a complete, slow cycle: pick up the full pitcher with your dominant hand, place your other hand under it to show the child how to control it, and pour slowly and deliberately into the empty pitcher. Pause at the natural stopping point when the beans begin to near the rim. Set the pitcher down and observe the child\'s face. Offer the turn: "Would you like to try?" Step back entirely and allow the child to work without commentary. If beans spill — and they will — wait to see if the child notices and reaches for the dustpan independently. Only intervene if the child becomes frustrated. When the cycle is complete, return the material to its place together.',
  pointsOfInterest:
    'The sound of the beans as they fall, the visual feedback of watching the level rise in the receiving pitcher, and the satisfying completeness of a full cycle.',
  variationsAndExtensions:
    'Graduate to pouring with funnels, pouring water (introduced after mastery with dry beans), transferring with a ladle, and eventually pouring from a community-size pitcher at snack time. For children who are ready, introduce the concept of measuring by marking the pitcher at a fill line.',
  neurodivergenceNotes:
    'For children with fine motor differences, offer a pitcher with a wide, ergonomic handle or a spouted cup instead. For children with sensory sensitivities, introduce the sound of the beans separately before the full lesson. For children who need a longer runway into focus, offer this material during a protected period of the work cycle when the room is quieter. For children who seek proprioceptive input, a slightly heavier material (like rice or lentils) may increase engagement. Never rush a child through this work or interrupt a focused cycle to redirect to something "more academic."',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Primary/Sensorial/

export const primarySensorial: SampleLesson = {
  id: 'primary-sensorial',
  title: 'The Pink Tower',
  strand: 'Sensorial',
  level: 'primary',
  whyThisMatters:
    'The Pink Tower is the most recognized Montessori material in the world — and it is also the most misunderstood. It is not a stacking toy. It is a three-dimensional introduction to the mathematical concept of progression in three dimensions, a refinement of the visual-spatial sense, and a preparation for the decimal system. Every child in a Primary classroom should have the opportunity to engage deeply with this material across multiple years.',
  directAim:
    'To develop the child\'s ability to discriminate among objects that differ in three dimensions simultaneously, to refine the visual sense for perceiving gradations of size, and to build the muscular sense through carrying cubes of graduated weight.',
  indirectAim:
    'To prepare the mathematical mind for the decimal system by introducing the concept of ten-cube progression, to develop vocabulary for size relationships (large, larger, largest; small, smaller, smallest), and to build the vestibular sense through the physical act of squatting, lifting, and rising repeatedly.',
  equityAim:
    'We name that "biggest" and "smallest" are relative terms that depend entirely on what is in the room with you. In a world that constantly tells some children they are "too much" and others they are "not enough," the Pink Tower teaches that every size belongs in the structure, that nothing is excluded, and that the smallest cube holds just as much precision and intention as the largest. We build that awareness into how we talk about this work.',
  materials:
    'Ten pink wooden cubes graduating from one centimeter to ten centimeters in side length, a floor mat sized to accommodate the full built tower.',
  presentation:
    'Bring the cubes to the mat one at a time, in random order, by carrying each one with both hands at your fingertips — model the muscular engagement. Sit beside the child and begin by finding the largest cube with exaggerated searching. Place it at the center of the mat. Continue building from largest to smallest, each time pausing to look across the remaining cubes. Place each cube precisely in the center of the one below it. When complete, sit back and allow the child to look. Then, in a gesture of invitation, take the smallest cube from the top and set it aside as if confused. Watch what the child does.',
  pointsOfInterest:
    'The satisfying visual line of the completed tower, the physical sensation of carrying cubes of dramatically different weight, and the challenge of locating the control of error (the cube that is clearly wrong).',
  variationsAndExtensions:
    'Build the tower on a table instead of a floor mat. Build a staircase arrangement. Introduce the extension activity of building a tower with the Brown Stair crossing through it. Introduce vocabulary: centimeter, cube, dimension. For older children, introduce the numerical relationship between each cube.',
  neurodivergenceNotes:
    'For children who are sensitive to color or visual overwhelm, introduce the Brown Stair first as the surface variations are more subtle. For children who prefer tactile feedback, invite them to trace the edges of each cube with their fingertips before building. For children with motor planning challenges, model each step with deliberate pausing between movements. For children who are in a parallel play stage, place a second set of materials nearby — do not require shared use of the tower before the child is ready.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Primary/Language/

export const primaryLanguage: SampleLesson = {
  id: 'primary-language',
  title: 'The Sandpaper Letters: Individual Letter Introduction',
  strand: 'Language',
  level: 'primary',
  whyThisMatters:
    'Reading and writing are not academic skills. They are the primary tools of liberation. A child who cannot yet decode print is not behind — they are at the beginning of a journey that every human being takes at their own pace. The Sandpaper Letters do not rush that journey. They honor it, by giving the child simultaneous access to the shape, sound, and feel of each letter — so that literacy is not memorization but embodiment.',
  directAim:
    'To give the child the sound of a letter as distinguished from its name, to connect that sound to its written symbol through the tactile sense, and to build the muscular memory for writing the letter before the child ever holds a pencil.',
  indirectAim:
    'To prepare the hand for writing by practicing the stroke pattern against a textured surface, to begin building phonemic awareness at the symbol level, and to give the child a tool for silent reading of their environment.',
  equityAim:
    'We begin with the sounds that appear most frequently in the child\'s spoken language, not with the beginning of the alphabet. For children whose home language is not English, we acknowledge explicitly that their language has its own sounds and symbols, and that learning English letters does not replace or diminish that knowledge — it adds to it. We never ask a child to set aside the languages they came to us with.',
  materials:
    'Sandpaper letters mounted on boards (consonants on pink/red boards, vowels on blue boards), stored in alphabetical groupings. Present no more than two or three letters in a single lesson.',
  presentation:
    'Select two consonants and one vowel that are phonically distinct from one another. Lay them face-up on the mat. Pick up the first letter. Say the sound — not the name — clearly and without exaggeration: "This says /m/." Trace the letter with two fingers in the direction of writing while saying the sound again. Hand the letter to the child: "Your turn." After the child traces and sounds, introduce the second letter the same way. Then use the Three Period Lesson to consolidate: Period One ("This says..."), Period Two ("Show me..."), Period Three ("What does this say?"). Never move to Period Three until Periods One and Two are fully secure.',
  pointsOfInterest:
    'The texture of the sandpaper against the fingertips, the visual contrast of the letter against the board, and the private, almost ceremonial quality of learning something new.',
  variationsAndExtensions:
    'Trace letters in a tray of sand. Find objects in the room that begin with the target sound. Begin blending two sounds together using moveable alphabet letters. For children who are ready, introduce the Moveable Alphabet for word building before reading.',
  neurodivergenceNotes:
    'For children who are tactile-defensive, offer a letter tracing card with a raised outline instead of sandpaper. For children with auditory processing differences, use a visual cue (pointing to mouth) alongside the sound. For children who are not yet ready for symbolic representation, stay in phonemic awareness activities (sound games, I Spy) longer before introducing letters. For dyslexic learners, the multi-sensory nature of this material is its greatest strength — lean into it rather than rushing through it.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Primary/Mathematics/

export const primaryMathematics: SampleLesson = {
  id: 'primary-mathematics',
  title: 'Introduction to the Decimal System: Quantity and Symbol',
  strand: 'Mathematics',
  level: 'primary',
  whyThisMatters:
    'The decimal system is the architecture of modern mathematics. Before a child can add, subtract, or understand place value, they must have a physical, sensorial experience of what the quantities mean. The Golden Beads make the abstract concrete — a thousand is not a word. It is something you can hold in your hands, carry across the room, and struggle with because it is genuinely heavy.',
  directAim:
    'To give the child a concrete, physical understanding of the units, tens, hundreds, and thousands of the decimal system through direct sensory experience with the Golden Bead material.',
  indirectAim:
    'To build the foundation for all four arithmetic operations, to develop the child\'s sense of the relative size of numbers, and to prepare the child for abstract mathematical reasoning through repeated concrete experience.',
  equityAim:
    'Mathematics is not a subject that belongs to some children and not others. It belongs to everyone. We name that explicitly, and we design the environment so that every child — regardless of prior mathematical exposure at home — can access and succeed with this material. We do not track or group children by "math ability" in the Primary environment.',
  materials:
    'Golden Bead material: single unit beads, ten-bars, hundred-squares, and a thousand-cube. Number cards 1–9 (units), 10–90, 100–900, 1000. A mat large enough to hold the full layout.',
  presentation:
    'Bring one unit bead to the mat and hold it up: "This is one." Place it on the mat. Bring a ten-bar: "This is ten — ten ones put together." Place it beside the unit. Continue with the hundred-square and thousand-cube, each time relating it back to the previous quantity. Allow the child to handle each piece extensively. Then bring out the number cards and do a Three Period Lesson matching quantities to symbols. The matching itself — walking across the room to retrieve the quantity that matches the symbol — is the heart of the lesson.',
  pointsOfInterest:
    'The dramatic visual and physical difference between one unit bead and the thousand-cube, the sound of the beads, and the social nature of the large number work that often draws other children in.',
  variationsAndExtensions:
    'The Bank Game (arithmetic operations with the full Golden Bead material). Stamp Game. Bead Frame. For children who are ready, naming numbers beyond 1,000.',
  neurodivergenceNotes:
    'For children with fine motor differences, the larger pieces of the Golden Bead material (hundred-squares and thousand-cube) are naturally more accessible. For children who are hypersensitive to sound, introduce the material when the room is quieter. For children with attention differences, begin with just the unit/ten relationship before extending to hundreds and thousands. For children who need movement, build in the carry-and-retrieve aspect of the Bank Game as the primary learning vehicle.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Primary/Theory/

export const primaryTheory: SampleLesson = {
  id: 'primary-theory',
  title: 'The Sensitive Periods: Why We Observe with Urgency',
  strand: 'Theory',
  level: 'primary',
  whyThisMatters:
    'A guide who does not understand the sensitive periods is navigating without a map. Maria Montessori\'s identification of these windows of heightened developmental receptivity is not philosophy — it is biology. When we miss a sensitive period, we do not simply delay learning. We make it harder. Understanding this should create urgency without panic, and deep attentiveness without anxiety. That is the disposition we are trying to cultivate in every MMR resident.',
  directAim:
    'To develop the resident\'s ability to identify sensitive period behaviors in real children during the work cycle, to distinguish between sensitive period expression and behavioral dysregulation, and to design the environment to respond to each sensitive period as it presents.',
  indirectAim:
    'To build the resident\'s observational vocabulary, to deepen their theoretical grounding in Montessori developmental science, and to connect abstract theory to the daily lived reality of the Primary classroom.',
  equityAim:
    'Sensitive period expression does not look the same in every child. A child\'s sensitive period for order may be read as "rigid" or "difficult" by adults who do not understand it. A child\'s sensitive period for language may be suppressed when their home language is treated as an obstacle rather than an asset. We must know the theory deeply enough to protect its expression in every child — especially in children whose sensitive period behaviors are most likely to be pathologized.',
  materials:
    'Observation journal, sample observation forms, case study vignettes of sensitive period expression across diverse children.',
  presentation:
    'This is an album entry, not a material presentation. The resident will write a theoretical overview, document observed evidence of sensitive periods in their practicum classroom, and reflect on at least two instances where sensitive period understanding changed how they responded to a child\'s behavior.',
  pointsOfInterest:
    'The moment when a theoretical concept becomes visible in a real child — when a resident sees what they have been reading about — is one of the most significant learning experiences in the program.',
  variationsAndExtensions:
    'Document the disappearance of a sensitive period in a specific child over time. Design an environmental modification in direct response to a sensitive period observation. Lead a parent education evening on the sensitive periods.',
  neurodivergenceNotes:
    'The sensitive periods are particularly relevant to understanding neurodivergent children, whose sensitive period expression may be more intense, longer-lasting, or less predictable than neurotypical developmental norms. Residents must understand that the sensitive periods were identified in a particular historical and cultural context, and apply the theory with critical awareness of its limitations and expansions in contemporary developmental science.',
}

// ─── ELEMENTARY 6–12 ──────────────────────────────────────────────────────────

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Geography/

export const elementaryGeography: SampleLesson = {
  id: 'elementary-geography',
  title: 'The Story of the Universe: First Great Lesson',
  strand: 'Geography',
  level: 'elementary',
  whyThisMatters:
    'The child at six years old is ready to hold the entire cosmos in their imagination. They are no longer satisfied with the immediate environment — they want to know where everything came from. The First Great Lesson does not answer that question with a textbook paragraph. It answers it with fire, darkness, swirling matter, and billions of years. This is not mythology dressed up as science. This is science told with the reverence it deserves.',
  directAim:
    'To give the child a cosmic sense of the origins of the universe and the Earth, to ignite wonder and curiosity about the physical world, and to establish the timeline framework within which all subsequent Elementary work will be situated.',
  indirectAim:
    'To prepare the child for detailed study of physics, chemistry, geology, and astronomy, to develop the capacity for abstract temporal thinking, and to cultivate the disposition of a scientist: one who sits comfortably with the vastness of what is not yet known.',
  equityAim:
    'We tell this story with awareness that many cultures have creation narratives of extraordinary beauty and scientific sophistication. We do not present the scientific story as the only story or the correct story. We present it as one extraordinary account of the universe\'s origins — and we create space for children to bring other accounts they carry. The goal is wonder, not displacement.',
  materials:
    'Black cloth to represent the void, a bowl of steel filings and a magnet to demonstrate magnetic attraction, balloons to demonstrate expansion, a candle and a non-flammable bowl for the fire experiment, the First Great Lesson script (resident-written and memorized), and the Timeline of the Universe chart for follow-up.',
  presentation:
    'This lesson is a performance. The room should be as dark as possible. The guide begins in silence. Every detail of the presentation — the timing of the fire, the moment of the first light, the introduction of gravity — is rehearsed and intentional. The story takes approximately 20-30 minutes for the first telling. Children who hear it for the first time in Lower Elementary will ask for it again. By Upper Elementary, they know it by heart and begin to see it differently.',
  pointsOfInterest:
    'The fire experiment, the moment the lights come back on, and the child\'s first question after the story ends — which invariably reveals what they are most alive to.',
  variationsAndExtensions:
    'Timeline of the Universe. Research projects on any element of the story. The Birth of the Earth impressionistic charts. The Coming of Life charts. Any question a child asks after the First Great Lesson is a valid entry point into months of research.',
  neurodivergenceNotes:
    'For children with sensory sensitivities, preview the fire experiment in advance so there are no surprise sounds or smells. For children who have difficulty with the length of the presentation, allow them to engage with a portion and return. For children who are highly literal thinkers, provide scaffolding for the distinction between story and scientific theory. The immersive, dramatic nature of this lesson is often deeply engaging for children with ADHD — lean into that rather than sanitizing the presentation.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Biology/

export const elementaryBiology: SampleLesson = {
  id: 'elementary-biology',
  title: 'The Kingdom of Living Things: Characteristics of Life',
  strand: 'Biology',
  level: 'elementary',
  whyThisMatters:
    'Before a child can classify, name, or study any living organism, they must have a felt sense of what makes something alive. This lesson does not open with definitions. It opens with a question: What do all living things need? The child\'s own body is the first piece of evidence. Their hunger, their breath, their growth — all of it points toward the characteristics of life before a single taxonomy has been introduced.',
  directAim:
    'To give the child a clear, memorable framework for the seven characteristics of living things, to connect those characteristics to organisms the child already knows, and to establish the vocabulary for biological classification.',
  indirectAim:
    'To prepare the child for all subsequent biological study including botany, zoology, ecology, and the Five Kingdoms, to develop the child\'s capacity for scientific observation, and to build a sense of kinship with all living things.',
  equityAim:
    'Life science has historically been used to justify hierarchy among human beings through pseudoscientific racial categorization. We name this directly with Upper Elementary children. The science of life tells us that all humans are one species, that genetic variation within our species is vast and beautiful, and that no biological trait is a marker of superiority. We build that awareness into how we teach classification from the beginning.',
  materials:
    'Sorting cards with living and non-living things, the Characteristics of Life booklet (resident-produced), magnifying glasses, living plants or organisms for observation, and the Three-Part Cards for the Five Kingdoms.',
  presentation:
    'Begin with objects: a rock, a seed, a cup of water, a dried leaf, a living plant. Ask the child to sort them: "Which of these is alive?" After sorting, ask: "How do you know?" Build the list of characteristics from the children\'s own reasoning before introducing the formal vocabulary. This is the Montessori approach to concept formation: from concrete experience to abstraction.',
  pointsOfInterest:
    'The edge cases — is a virus alive? Is fire alive? Is a dormant seed alive? — are where the deepest thinking happens. Hold these open questions with curiosity, not urgency for resolution.',
  variationsAndExtensions:
    'The Five Kingdoms charts. Detailed study of cells. The story of Carl Linnaeus and taxonomic classification. The study of local ecosystems. For Upper Elementary, the study of evolution as the mechanism connecting all living things.',
  neurodivergenceNotes:
    'For children with anxiety, the discussion of death as a characteristic of living things (mortality) should be handled with care. For children with sensory sensitivities, allow the use of gloves for handling biological specimens. For children with ADHD, the hands-on sorting activity at the beginning of this lesson is intentional — it provides movement and decision-making before any sitting or writing. For autistic children, the clear categorical framework of the Five Kingdoms is often intrinsically satisfying.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/History/

export const elementaryHistory: SampleLesson = {
  id: 'elementary-history',
  title: 'The Story of the Coming of Human Beings: Third Great Lesson',
  strand: 'History',
  level: 'elementary',
  whyThisMatters:
    'The child at six, seven, eight years old is ready to understand that they are the inheritor of an unbroken chain of human ingenuity stretching back hundreds of thousands of years. Every tool they use, every word they speak, every system they live inside was built by human beings who came before them. This lesson does not begin with civilization. It begins with the fire-keeper, the tool-maker, and the storyteller — with the humans who lived before writing, before cities, and before the categories we use to divide ourselves.',
  directAim:
    'To give the child a sense of the deep history of human beings on Earth, to introduce the concept of human exceptionalism through the specific gifts of mind, hand, and heart, and to situate the child\'s own life within the long arc of human history.',
  indirectAim:
    'To prepare the child for detailed study of world history, economics, government, and culture, to develop the child\'s sense of moral imagination through historical empathy, and to build the foundation for understanding cause and effect across centuries.',
  equityAim:
    'Human history as typically taught in American schools begins with Greece and Rome and moves primarily through Europe. We refuse that truncation. The Third Great Lesson explicitly includes the civilizations of Africa, the Americas, Asia, and Oceania as primary contributors to human knowledge and culture. We use the Black History Timeline, the Indigenous Peoples\' contributions to governance and ecology, and the scientific achievements of the Islamic Golden Age as central — not supplemental — content.',
  materials:
    'The Third Great Lesson script (resident-written), the Black History Timeline, the Timeline of Human Prehistory, artifacts or images representing early human tools and art, and the Fundamental Needs of Humans chart.',
  presentation:
    'This lesson is told as a story — not read from a script. The guide knows the story well enough to make eye contact with children throughout, to pause at moments of wonder, and to respond to questions without losing the narrative thread. The lesson typically takes 25-40 minutes for an experienced guide.',
  pointsOfInterest:
    'The moment when children realize that the fire-keeper was doing something no other animal had ever done, and the question of why human beings are the only species that transmits knowledge across generations through language and writing.',
  variationsAndExtensions:
    'The Fundamental Needs of Humans chart and sorting activity. Research projects on any early human civilization. Archaeology projects. The study of written language across cultures. The timeline of economic systems from barter to global trade.',
  neurodivergenceNotes:
    'The story format of the Great Lessons is often more accessible for children with reading differences than text-based instruction. For children who process information more slowly, the Great Lessons should be told more than once — children benefit from hearing the full story before being asked to do any follow-up work. For children with attention differences, the natural pause-and-wonder moments in the story are built-in movement breaks. For children who have experienced historical trauma in their families, handle the portions of the story that involve slavery, colonization, and displacement with particular care and forewarning.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Language/

export const elementaryLanguage: SampleLesson = {
  id: 'elementary-language',
  title: 'The Functions of Words: Introduction to the Parts of Speech',
  strand: 'Language',
  level: 'elementary',
  whyThisMatters:
    'Grammar in Montessori is not taught as a set of rules to memorize. It is taught as a discovery about how language works — how human beings organized meaning into categories that allow communication across time, distance, and difference. The child who understands the function of a verb does not just know what a verb is. They understand something about how thought becomes action, and how action becomes language.',
  directAim:
    'To introduce the child to the concept that every word in a sentence plays a specific role, to give the child the Montessori symbols for the parts of speech, and to develop the child\'s ability to identify nouns, verbs, and adjectives in real sentences.',
  indirectAim:
    'To develop the child\'s capacity for close reading and textual analysis, to build the foundation for written composition and revision, and to give the child vocabulary for talking about language itself — which is a form of power.',
  equityAim:
    'Standard American English grammar is one grammar. It is not better or more logical than African American Vernacular English, Spanish grammar, or any other linguistic system. We teach Montessori grammar as a tool for understanding how language works in general, not as a judgment about how children speak at home. We explicitly name that code-switching is a skill, not a correction, and that children who speak more than one language or dialect are not behind — they are ahead.',
  materials:
    'Grammar symbols (the large black triangle for the noun, the red circle for the verb, the medium dark blue triangle for the adjective), grammar boxes, sentence strips, and the Montessori grammar booklets (resident-produced).',
  presentation:
    'Begin with the noun. Hold up a familiar object. "What do you call this?" — the child answers. "That word — the name you just used — is a noun. Every person, place, or thing has a name. The symbol for the noun is this black triangle. Black because it is solid and stable, like the ground. A triangle because it stands firm on three points." Do not lecture. Show, name, invite exploration. Move to the verb only after the noun is secure.',
  pointsOfInterest:
    'The moment children begin applying grammar symbols to their own writing, and the discovery that the same word can function as different parts of speech depending on how it is used.',
  variationsAndExtensions:
    'The Sentence Analysis material. Parsing complex sentences. Writing compositions and then analyzing them for grammar. The study of etymology as a window into how meaning evolves.',
  neurodivergenceNotes:
    'The visual-symbolic system of Montessori grammar (colored shapes for each part of speech) is particularly supportive for visual learners and children with language-based learning differences. For children with dyslexia, the grammar symbols allow engagement with grammatical concepts without requiring fluent decoding. For children who are highly verbal, the grammar work often opens into extended discussions about language — follow that thread rather than redirecting to the written material.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Mathematics/

export const elementaryMathematics: SampleLesson = {
  id: 'elementary-mathematics',
  title: 'The Story of Numbers: Introduction to the History of Mathematics',
  strand: 'Mathematics',
  level: 'elementary',
  whyThisMatters:
    'Mathematics is not a fixed body of knowledge that arrived complete and perfect. It is a human invention, built over thousands of years by people across every culture on Earth. When we teach the history of mathematics alongside its content, we give children something that textbooks almost never give them: the knowledge that mathematics was made by people like them, and that it is still being made.',
  directAim:
    'To give the child a sense of the history and cultural origins of mathematical concepts, to introduce the concept of numerical systems across cultures, and to connect abstract mathematical content to the human story behind it.',
  indirectAim:
    'To develop the child\'s mathematical identity — their belief that they belong in mathematics — by expanding their understanding of who has historically done mathematics and for what purposes.',
  equityAim:
    'The standard mathematics curriculum in American schools traces its lineage almost exclusively through European mathematicians. We correct that record explicitly: the concept of zero originated in India; algebra was developed in the Islamic world; advanced astronomical mathematics was practiced across sub-Saharan Africa and Mesoamerica centuries before European contact. We teach this not as a footnote but as the foundation.',
  materials:
    'Timeline of Mathematics, examples of different numeral systems (Roman, Mayan, Egyptian, Hindu-Arabic), the story of zero, and the resident\'s own prepared narrative for the introduction.',
  presentation:
    'This is an impression lesson told as a story, similar in spirit to the Great Lessons. The guide tells the story of how humans have counted, recorded, and calculated across millennia, with vivid detail about the specific humans who made key discoveries. Follow the story with hands-on exploration of different numeral systems — can the child add Roman numerals? What is difficult about it? Why did the invention of zero change everything?',
  pointsOfInterest:
    'The discovery of how difficult arithmetic is without the zero, and the realization that something as fundamental as the concept of "nothing" had to be invented.',
  variationsAndExtensions:
    'Research projects on any mathematician from any culture. The study of mathematical patterns in nature (Fibonacci sequence). Applied mathematics projects: budgeting, measurement, architecture. For Upper Elementary, introduction to algebra as a language for describing patterns.',
  neurodivergenceNotes:
    'For children who have developed math anxiety from prior schooling, the history-of-mathematics approach provides a powerful reframe: mathematics is a human construction, full of dead ends and wrong turns and brilliant mistakes, and every person who has ever struggled with a mathematical idea was in good company. This reframe should be stated explicitly, not just implied.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Geometry/

export const elementaryGeometry: SampleLesson = {
  id: 'elementary-geometry',
  title: 'The Story of Geometry: From the Rope-Stretchers to Euclid',
  strand: 'Geometry',
  level: 'elementary',
  whyThisMatters:
    'Geometry is the oldest branch of mathematics, and it was born not from abstraction but from necessity. The rope-stretchers of ancient Egypt were rebuilding field boundaries after the Nile flood. From that practical problem came the entire formal system of Euclidean geometry that still underlies architecture, engineering, and computer graphics today. Children who know this history understand geometry differently — as a living tool, not a dead subject.',
  directAim:
    'To give the child an impression of the origins of geometry as a practical human discipline, to introduce the Montessori geometric materials in their historical context, and to develop the child\'s facility with basic geometric concepts through hands-on construction.',
  indirectAim:
    'To prepare the child for formal geometric proof and measurement, to connect geometry to its applications in architecture, art, and science, and to develop spatial reasoning as a mathematical competency.',
  equityAim:
    'Euclidean geometry is named for a Greek mathematician, but its roots are Egyptian, Babylonian, and Indian. We name those roots explicitly. We also note that the geometric principles embedded in Islamic architecture, African textile design, and Indigenous land stewardship reflect mathematical sophistication that predates and parallels European geometric theory.',
  materials:
    'The Geometric Cabinet, the Geometric Solids, the Constructive Triangles, a compass and straightedge, and the resident-prepared Story of Geometry.',
  presentation:
    'Tell the story first. Then bring out the rope (a knotted cord that can form a right angle) and let the child discover the 3-4-5 right triangle. From there, move into the Geometric Cabinet for nomenclature and the constructive triangles for exploration.',
  pointsOfInterest:
    'The moment when a child uses the knotted rope to form a right angle and realizes they are doing exactly what an Egyptian surveyor did 4,000 years ago.',
  variationsAndExtensions:
    'Geometric proof (Upper Elementary). Architecture projects. The study of geometric patterns across cultural traditions. Measurement and area. The relationship between geometry and algebra through the Pythagorean theorem.',
  neurodivergenceNotes:
    'Geometry is often a strength for visual-spatial learners and for children with dyslexia who struggle in language-heavy subjects. Create explicit entry points through the hands-on materials before introducing any symbolic or written work. For children who are strong visual-spatial thinkers, geometry may be the subject that first gives them a felt sense of mathematical competence — protect that experience.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Art/

export const elementaryArt: SampleLesson = {
  id: 'elementary-art',
  title: 'Art as Record: From Cave Paintings to the Present',
  strand: 'Art',
  level: 'elementary',
  whyThisMatters:
    'Art is not a break from learning. It is learning in its most ancient and primary form. The first humans left marks on cave walls not as decoration but as record, communication, and meaning-making. When a child in the Elementary environment makes art, they are participating in an unbroken human tradition that is as old as language. Art in MMR is integrated into the academic curriculum, not siloed as a "special."',
  directAim:
    'To give the child a sense of the history of human art-making and its connection to the rest of the curriculum, to introduce specific techniques and materials in their historical context, and to develop the child\'s capacity for intentional creative expression.',
  indirectAim:
    'To develop observation skills that transfer to scientific and mathematical work, to build the child\'s sense of themselves as a maker and creator, and to connect aesthetic experience to intellectual inquiry.',
  equityAim:
    'The Western art canon is not the only art canon. We teach art history with explicit attention to the visual traditions of Africa, Asia, the Americas, and Oceania — not as "world art" versus "real art," but as the full scope of human visual expression. We ensure that children see themselves and their communities in the art they study and make.',
  materials:
    'A curated collection of art reproduction cards spanning multiple cultures and historical periods, basic art-making supplies organized by technique (drawing, painting, collage, construction), and the resident-prepared Art Timeline.',
  presentation:
    'Begin with the Art Timeline — an impressionistic sweep through 40,000 years of human art-making. Then invite children to choose a medium and make something in response to what they\'ve seen. The lesson is the invitation. The making is the learning.',
  pointsOfInterest:
    'The discovery that art made before the invention of writing is the only record we have of those human lives, and the question of what the people who made it wanted future humans to know.',
  variationsAndExtensions:
    'Study of specific artists in depth. Replication projects. Art criticism and analysis. The connection between visual art and mathematics (proportion, pattern, symmetry). Community art projects with families.',
  neurodivergenceNotes:
    'Art is often a primary mode of expression for children who struggle with verbal or written communication. Create time and space for art-making that is not assessed or corrected. For children with fine motor differences, offer a wide range of media so that the constraint is not dexterity but creativity. For children with anxiety, art-making should always be an invitation, never a requirement.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Music/

export const elementaryMusic: SampleLesson = {
  id: 'elementary-music',
  title: 'The Language of Music: Notation, Rhythm, and the Musical Staff',
  strand: 'Music',
  level: 'elementary',
  whyThisMatters:
    'Music is a language. Like written language, it has a notational system that allows human beings to communicate complex sequences of sound across time and distance. A child who can read music has access to every piece ever written for their instrument — hundreds of years of human expression. We teach music reading in MMR not because every child will become a musician but because every child deserves fluency in as many languages as possible.',
  directAim:
    'To give the child the foundational concepts of Western musical notation — staff, clef, note names, and basic rhythmic values — as well as an introduction to the musical traditions of other cultures that do not use Western notation.',
  indirectAim:
    'To develop the child\'s capacity for pattern recognition through rhythm, to build auditory discrimination, and to connect musical experience to mathematical understanding of fractions through rhythmic notation.',
  equityAim:
    'Western musical notation is one system among many. Oral musical traditions, griotic transmission, and non-Western notational systems represent the majority of the world\'s musical knowledge. We teach Western notation as a useful tool while naming explicitly that it is not the language of music — it is a language of music.',
  materials:
    'Bells and/or simple pitched instruments, the Montessori musical staff board, note name cards, rhythm strips, and a curated playlist of music from multiple cultural traditions.',
  presentation:
    'Begin with listening: play a short piece from a tradition the children may not have heard before and ask them to describe what they notice. Then move into the notation material, introducing the staff as a kind of map that tells a musician exactly which pitch to play and when.',
  pointsOfInterest:
    'The moment when a child realizes that the notes on a page can be translated into sound by anyone who knows the system, regardless of what language they speak.',
  variationsAndExtensions:
    'Instrument study. Composition. Musical history and biography. The study of how music travels and changes across cultures. For Upper Elementary, the study of music theory as a branch of mathematics.',
  neurodivergenceNotes:
    'Music can be a profound entry point for children who struggle in other academic areas. For children with auditory processing differences, provide visual supports alongside listening activities. For children who are highly sensitive to sound, offer headphones or modify volume. For autistic children who have strong interests in music, that interest is an extraordinary learning lever — follow it rather than redirecting to the planned curriculum.',
}

// TODO: Replace placeholder content below with real lesson from:
// ~/Desktop/Montessori Albums/Residency Albums/Elementary/Theory/

export const elementaryTheory: SampleLesson = {
  id: 'elementary-theory',
  title: 'The Cosmic Task: Each Life as a Contribution',
  strand: 'Theory',
  level: 'elementary',
  whyThisMatters:
    'Cosmic Education is the philosophical foundation of the entire Elementary program. Every lesson — every Great Lesson, every impression story, every research project — is in service of helping the child understand their place in the universe and their responsibility to it. This is not spirituality dressed as curriculum. It is the clearest statement of educational purpose in the entire Montessori tradition: we are preparing children not just to succeed in the world but to improve it.',
  directAim:
    'To develop the resident\'s deep understanding of Cosmic Education as a philosophical framework and a practical curriculum design tool, to connect specific lessons and materials to their cosmic purpose, and to develop the resident\'s capacity to communicate this framework to families and colleagues.',
  indirectAim:
    'To build the resident\'s sense of themselves as a cosmic educator — one who is doing work that matters beyond the classroom — and to prepare them to sustain that sense of purpose across the years and difficulties of their teaching career.',
  equityAim:
    'Cosmic Education as Montessori described it was developed in a particular colonial historical moment and carries assumptions that must be examined. The concept of "cosmic task" has been used to justify hierarchical arrangements of human beings. We teach Cosmic Education with clear eyes about its limitations and its expansions — foregrounding the framework\'s potential for liberation rather than its historical misapplication.',
  materials:
    'Montessori\'s writings on Cosmic Education (excerpts from To Educate the Human Potential), the resident\'s observation journal, and case study examples of Cosmic Education in practice.',
  presentation:
    'This is a seminar-style lesson for residents, not a material presentation. The resident reads the primary source, identifies the core claims, and then maps those claims onto their practicum observations: Where did I see a child experiencing their cosmic task today? What was the guide doing to make that possible? What was I doing that was getting in the way?',
  pointsOfInterest:
    'The moment when a resident stops seeing Cosmic Education as a theoretical abstraction and starts seeing it as a lens that makes every moment in the classroom more meaningful.',
  variationsAndExtensions:
    'The study of peace education as an expression of Cosmic Education. Curriculum design project: design a unit of study that is explicitly grounded in Cosmic Education. Lead a family education session on Cosmic Education in plain language.',
  neurodivergenceNotes:
    'Cosmic Education has particular power for neurodivergent children who have often received the message that their way of being in the world is a problem to be managed rather than a gift to be developed. The cosmic task framework — which insists that every being has a contribution to make — is one of the most powerful anti-deficit frameworks in education. Residents must internalize this conviction before they can transmit it.',
}

// ─── Organized exports ─────────────────────────────────────────────────────────

export const primaryLessons: SampleLesson[] = [
  primaryPracticalLife,
  primarySensorial,
  primaryLanguage,
  primaryMathematics,
  primaryTheory,
]

export const elementaryLessons: SampleLesson[] = [
  elementaryGeography,
  elementaryBiology,
  elementaryHistory,
  elementaryLanguage,
  elementaryMathematics,
  elementaryGeometry,
  elementaryArt,
  elementaryMusic,
  elementaryTheory,
]

export const strandDescriptions: Record<string, string> = {
  'Practical Life': 'Care of self, care of environment, and the development of independence through purposeful movement',
  'Sensorial': 'Refinement of all the senses through graduated, self-correcting materials that prepare the mathematical and scientific mind',
  'Language': 'Spoken language, phonics, reading, writing, and grammar through a multi-sensory, child-directed sequence',
  'Mathematics': 'From concrete quantity to abstract symbol across all four operations, geometry, and early algebraic thinking',
  'Theory': 'Montessori philosophy, child development, observation, and the design of prepared environments',
  'Geography': 'From the cosmos to the classroom — the story of the Earth, its peoples, and the physical forces that shaped them both',
  'Biology': 'The living world: classification, life cycles, anatomy, ecology, and the interconnection of all organisms',
  'History': 'The human story from prehistory to the present, centered on equity, multiple perspectives, and cause-and-effect thinking',
  'Geometry': 'From the rope-stretchers of ancient Egypt to modern spatial reasoning — geometry as a living, human discipline',
  'Art': 'Art as language, record, and cultural expression — connected to every other strand in the Elementary curriculum',
  'Music': 'The language of sound — notation, rhythm, cultural traditions, and music as a mathematical and expressive system',
}
