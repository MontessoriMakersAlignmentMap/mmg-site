/**
 * Master Curriculum Sequence data derived from MMR_Master_Curriculum_Sequence.xlsx.
 * Each entry maps to one weekly bundle. Lesson codes reference strand abbreviation + sort_order.
 *
 * Primary strand abbreviations: T=Theory, PL=Practical Life, S=Sensorial, L=Language, M=Mathematics
 * Elementary strand abbreviations: T=Theory, Geo=Geography, Bio=Biology, His=History,
 *   Lang=Language, Math=Mathematics, Geom=Geometry, Art=Art, Mus=Music
 */

export interface BundleTemplate {
  week: number
  month: string
  theme: string
  strands: string
  /** Lesson codes like "T1-T3, PL1-PL3" */
  lessonCodes: string
  lessonCount: number
  practicumFocus: string
  albumDue: boolean
  liveSession: boolean
  discussionTheme: string | null
}

export const PRIMARY_SEQUENCE: BundleTemplate[] = [
  { week: 1, month: 'September', theme: 'Orientation: The Montessori Guide Begins', strands: 'Theory + PL', lessonCodes: 'T1-T3, PL1-PL3', lessonCount: 6, practicumFocus: 'Observe the classroom environment for 30 minutes without intervening. Note the physical layout, traffic patterns, and how children move through the space.', albumDue: false, liveSession: true, discussionTheme: 'Welcome and Program Overview: What brought you to Montessori and what do you hope to build?' },
  { week: 2, month: 'September', theme: 'The Prepared Environment: Where It All Begins', strands: 'Theory + PL', lessonCodes: 'T4-T5, PL4-PL7', lessonCount: 6, practicumFocus: 'Map your placement classroom. Identify each area, note what is on every shelf, and observe which areas children gravitate toward.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 3, month: 'September', theme: 'Practical Life: Preliminary Exercises', strands: 'PL', lessonCodes: 'PL8-PL13', lessonCount: 6, practicumFocus: 'Observe three children doing Practical Life work. Record what you see without judgment: hand movements, repetition, concentration, satisfaction.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 4, month: 'September', theme: 'The Prepared Hand: Care of Self', strands: 'PL + Theory', lessonCodes: 'PL14-PL18, T6', lessonCount: 6, practicumFocus: "Practice one Care of Self presentation (dressing frame or hand washing) with a child. Note the child's response to each step.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 5, month: 'October', theme: 'Care of the Environment: Inside', strands: 'PL', lessonCodes: 'PL19-PL24', lessonCount: 6, practicumFocus: 'Set up and present one Care of Environment exercise. Observe whether children return to it independently over the following days.', albumDue: false, liveSession: true, discussionTheme: "The Adult as Obstacle: How does your presence help or hinder the child's independence?" },
  { week: 6, month: 'October', theme: 'Care of the Environment: Food Preparation', strands: 'PL', lessonCodes: 'PL25-PL30', lessonCount: 6, practicumFocus: "Observe a food preparation activity from start to cleanup. Note the child's engagement with each phase and where they need support versus where they are independent.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 7, month: 'October', theme: 'Grace and Courtesy: The Social Curriculum', strands: 'PL + Theory', lessonCodes: 'PL31-PL35, T7', lessonCount: 6, practicumFocus: 'Observe three grace and courtesy interactions between children. Note which social skills seem internalized and which are still developing.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 8, month: 'October', theme: 'Practical Life: Advanced Exercises and Integration', strands: 'PL', lessonCodes: 'PL36-PL42', lessonCount: 7, practicumFocus: "Present one advanced Practical Life exercise. Document the full sequence: your preparation, the presentation, the child's response, and your reflection.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 9, month: 'November', theme: 'Practical Life: Completion and the Work Cycle', strands: 'PL + Theory', lessonCodes: 'PL43-PL47, T8', lessonCount: 6, practicumFocus: 'Observe an uninterrupted work cycle from start to finish. Time it. Note the false starts, the deepening, and the satisfaction at completion.', albumDue: false, liveSession: true, discussionTheme: 'Normalization: What does it look like in your classroom? What conditions support or prevent it?' },
  { week: 10, month: 'November', theme: 'Sensorial: The Education of the Senses', strands: 'Sensorial + Theory', lessonCodes: 'S1-S4, T9-T10', lessonCount: 6, practicumFocus: 'Observe a child working with a Sensorial material. Note which senses are engaged and how the child self-corrects using the control of error.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 11, month: 'November', theme: 'Visual Discrimination: Dimension and Form', strands: 'Sensorial', lessonCodes: 'S5-S10', lessonCount: 6, practicumFocus: "Present one visual discrimination material (Cylinder Blocks, Pink Tower, or Brown Stair). Document the child's process of discrimination.", albumDue: false, liveSession: false, discussionTheme: null },
  { week: 12, month: 'November', theme: 'Visual Discrimination: Color and Pattern', strands: 'Sensorial', lessonCodes: 'S11-S16', lessonCount: 6, practicumFocus: 'Observe how children use Color Tablets at different levels. Note extensions they create independently.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 13, month: 'December', theme: 'Tactile and Thermic Senses', strands: 'Sensorial', lessonCodes: 'S17-S22', lessonCount: 6, practicumFocus: "Present one tactile material. Observe how the child's hands move and whether they close their eyes to isolate the sense.", albumDue: false, liveSession: true, discussionTheme: 'Freedom and Discipline: How does the prepared environment create the conditions for both?' },
  { week: 14, month: 'December', theme: 'Baric, Stereognostic, and Auditory Senses', strands: 'Sensorial', lessonCodes: 'S23-S28', lessonCount: 6, practicumFocus: "Observe a child working with the Sound Cylinders or Bells. Note how auditory discrimination differs from visual discrimination in the child's approach.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 15, month: 'December', theme: 'Sensorial Extensions and the Binomial Cube', strands: 'Sensorial + Theory', lessonCodes: 'S29-S33, T11', lessonCount: 6, practicumFocus: 'Observe how children extend Sensorial materials into other areas. Document one example of a child making a cross-curricular connection.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 16, month: 'December', theme: 'Sensorial: Geometry Foundations and Integration', strands: 'Sensorial', lessonCodes: 'S34-S39', lessonCount: 6, practicumFocus: 'Observe the geometric cabinet or constructive triangles in use. Note how children explore shape relationships.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 17, month: 'January', theme: 'Language: The Explosion into Reading', strands: 'Language + Theory', lessonCodes: 'L1-L4, T12-T13', lessonCount: 6, practicumFocus: 'Observe a child in a language work cycle. Note which phase they are in: spoken language, phonemic awareness, writing, or reading.', albumDue: false, liveSession: true, discussionTheme: 'Observation as Practice: Share one observation that changed how you see a child. What bias did you have to set aside?' },
  { week: 18, month: 'January', theme: 'Sound and Symbol: Beginning Phonics', strands: 'Language', lessonCodes: 'L5-L10', lessonCount: 6, practicumFocus: 'Present Sandpaper Letters to a child. Document the three-period lesson process: naming, recognition, recall.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 19, month: 'January', theme: 'The Moveable Alphabet: Writing Before Reading', strands: 'Language', lessonCodes: 'L11-L16', lessonCount: 6, practicumFocus: 'Observe a child using the Moveable Alphabet. Note whether they are encoding (writing) or decoding (reading) and at what level of complexity.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 20, month: 'January', theme: 'Phonogram Introduction and Word Building', strands: 'Language', lessonCodes: 'L17-L22', lessonCount: 6, practicumFocus: 'Track which phonograms a specific child has mastered and which are in progress. Create a simple record of their phonics journey.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 21, month: 'February', theme: 'Reading: Object to Picture to Symbol', strands: 'Language + Theory', lessonCodes: 'L23-L27, T14', lessonCount: 6, practicumFocus: 'Observe reading materials in use across the classroom. Note the progression from object boxes to early readers.', albumDue: false, liveSession: true, discussionTheme: 'Equity in Language: Whose stories are told in your classroom library? Whose languages are honored?' },
  { week: 22, month: 'February', theme: 'Reading Classification and Comprehension', strands: 'Language', lessonCodes: 'L28-L33', lessonCount: 6, practicumFocus: 'Present a reading classification activity. Document how the child interacts with the text and whether comprehension accompanies decoding.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 23, month: 'February', theme: 'Mathematics: The Concrete Foundation', strands: 'Math + Theory', lessonCodes: 'M1-M4, T15', lessonCount: 6, practicumFocus: 'Observe a child working with Number Rods or Spindle Boxes. Note how the material makes quantity concrete and countable.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 24, month: 'February', theme: 'Numeration: Symbols and Quantities Unite', strands: 'Math', lessonCodes: 'M5-M10', lessonCount: 6, practicumFocus: 'Present one numeration material. Document how the child connects the symbol to the quantity.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 25, month: 'March', theme: 'Grammar: Function of Words', strands: 'Language', lessonCodes: 'L34-L39', lessonCount: 6, practicumFocus: 'Observe grammar materials in use. Note how children discover word function through the materials rather than memorizing rules.', albumDue: false, liveSession: true, discussionTheme: 'The Development of the Will: Where in your classroom do children exercise genuine choice? Where is choice absent?' },
  { week: 26, month: 'March', theme: 'Language: Writing, Reading, and Total Language', strands: 'Language', lessonCodes: 'L40-L45', lessonCount: 6, practicumFocus: "Document a child's full language profile: where they are in writing, reading, grammar, and oral expression.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 27, month: 'March', theme: 'The Decimal System: Introduction', strands: 'Math + Theory', lessonCodes: 'M11-M15, T16', lessonCount: 6, practicumFocus: 'Observe the Golden Bead material in use. Note how the child experiences the hierarchy: unit, ten, hundred, thousand.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 28, month: 'March', theme: 'The Decimal System: Operations Begin', strands: 'Math', lessonCodes: 'M16-M21', lessonCount: 6, practicumFocus: "Observe or participate in a group decimal system operation (addition or multiplication with golden beads). Note each child's role and understanding.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 29, month: 'April', theme: 'Linear Counting and Skip Counting', strands: 'Math + Theory', lessonCodes: 'M22-M26, T17', lessonCount: 6, practicumFocus: "Observe linear counting materials (bead chains). Note how the child connects counting to squaring and cubing concepts without formal instruction.", albumDue: false, liveSession: true, discussionTheme: 'Race, Access, and Montessori: Who is in your classroom? Who is not? What structures create that reality?' },
  { week: 30, month: 'April', theme: 'Operations: Addition and Subtraction', strands: 'Math', lessonCodes: 'M27-M32', lessonCount: 6, practicumFocus: "Present one operation material (Strip Board or Snake Game). Document the child's path from concrete manipulation to recording the equation.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 31, month: 'April', theme: 'Operations: Multiplication and Division', strands: 'Math', lessonCodes: 'M33-M38', lessonCount: 6, practicumFocus: "Observe multiplication or division materials in use. Note how the child's understanding of the operation develops through repetition with the material.", albumDue: false, liveSession: false, discussionTheme: null },
  { week: 32, month: 'April', theme: 'Math: Fractions, Money, and Time', strands: 'Math + Theory', lessonCodes: 'M39-M43, T18', lessonCount: 6, practicumFocus: 'Observe practical applications of math in the classroom: cooking measurements, calendar work, time-telling. Note which are Montessori materials and which are extensions.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 33, month: 'May', theme: 'Mathematics: Memorization and Abstraction', strands: 'Math', lessonCodes: 'M44-M47', lessonCount: 4, practicumFocus: "Track one child's progression on a memorization material. Note where they are between concrete and abstract.", albumDue: false, liveSession: true, discussionTheme: 'Your Philosophy of Education: What do you now believe about children, learning, and the purpose of education?' },
  { week: 34, month: 'May', theme: 'Theory: The Whole Child and the Whole School', strands: 'Theory', lessonCodes: 'T19-T25', lessonCount: 7, practicumFocus: 'Write a comprehensive observation of one child across all areas of the classroom. Include physical, social, emotional, and cognitive observations.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 35, month: 'May', theme: 'Theory: Equity, Justice, and Your Montessori Practice', strands: 'Theory', lessonCodes: 'T26-T31', lessonCount: 6, practicumFocus: 'Conduct a materials audit of one area of your classroom. Note whose cultures, languages, and experiences are represented and whose are missing.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 36, month: 'May', theme: 'Capstone: Integration and Your Philosophy of Education', strands: 'Theory', lessonCodes: 'T32-T35', lessonCount: 4, practicumFocus: 'Write your philosophy of education integrating everything you have learned. Present it to your Cohort Guide.', albumDue: true, liveSession: false, discussionTheme: null },
]

export const ELEMENTARY_SEQUENCE: BundleTemplate[] = [
  { week: 1, month: 'Month 1', theme: 'Orientation: Cosmic Education and the Elementary Child', strands: 'Theory + Geo', lessonCodes: 'T1-T3, Geo1', lessonCount: 4, practicumFocus: 'Observe the elementary classroom for one full morning. Note how children choose work, move between areas, and interact with peers.', albumDue: false, liveSession: true, discussionTheme: 'Welcome: What is cosmic education and why does it matter for your practice?' },
  { week: 2, month: 'Month 1', theme: 'The First Great Story: How the Earth Came to Be', strands: 'Geography + Theory', lessonCodes: 'Geo2-Geo4, T4-T5', lessonCount: 6, practicumFocus: "Observe or participate in a Great Story presentation. Note children's responses: questions asked, connections made, follow-up work chosen.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 3, month: 'Month 1', theme: 'The Second Great Story: Coming of Life', strands: 'Biology + Theory', lessonCodes: 'Bio1-Bio3, T6-T7', lessonCount: 6, practicumFocus: "Observe how the Timeline of Life is used in the classroom. Note which organisms capture children's interest and what research follows.", albumDue: false, liveSession: false, discussionTheme: null },
  { week: 4, month: 'Month 1', theme: 'The Third Great Story: Coming of Human Beings', strands: 'History + Theory', lessonCodes: 'His1-His3, T8', lessonCount: 6, practicumFocus: "Observe the Black Strip presentation or its aftermath. Note how children respond to the scale of human existence relative to Earth's history.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 5, month: 'Month 2', theme: 'The Fourth and Fifth Great Stories: Language and Mathematics', strands: 'Language + Math + Theory', lessonCodes: 'Lang1-Lang2, Math1-Math2, T9', lessonCount: 5, practicumFocus: 'Observe children during a language or math work period. Note which materials they choose and how long they sustain concentration.', albumDue: false, liveSession: true, discussionTheme: 'Imagination in the Elementary: How do the Great Stories ignite the reasoning mind?' },
  { week: 6, month: 'Month 2', theme: "Geography: Earth's Composition and Forces", strands: 'Geography', lessonCodes: 'Geo3-Geo8', lessonCount: 6, practicumFocus: 'Conduct one geography experiment with children (states of matter or gravity). Document their hypotheses, observations, and conclusions.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 7, month: 'Month 2', theme: 'History: Time, Needs, and Human Development', strands: 'History', lessonCodes: 'His4-His8', lessonCount: 5, practicumFocus: 'Observe children working with the Clock of Eras or Fundamental Needs charts. Note how they connect past human experience to their own lives.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 8, month: 'Month 2', theme: 'Geography and History: The Earth and Its People', strands: 'Geography + History', lessonCodes: 'Geo9-Geo11, His9-His10', lessonCount: 5, practicumFocus: 'Observe how geography and history materials are used together. Note cross-referencing between maps, timelines, and research.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 9, month: 'Month 3', theme: 'Geography: Sun, Earth, and Seasons', strands: 'Geography + Theory', lessonCodes: 'Geo12-Geo14, T10', lessonCount: 4, practicumFocus: 'Present or observe a sun and earth relationship lesson. Note how children connect the concept to their own experience of seasons.', albumDue: false, liveSession: true, discussionTheme: 'The Prepared Environment: How does the elementary environment differ from primary and why?' },
  { week: 10, month: 'Month 3', theme: 'Geography: Atmosphere, Wind, and Water', strands: 'Geography', lessonCodes: 'Geo15-Geo20', lessonCount: 6, practicumFocus: 'Observe children conducting geography experiments. Document one experiment cycle from hypothesis through conclusion.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 11, month: 'Month 3', theme: 'Geography: Erosion, Water Cycle, Human Geography', strands: 'Geography', lessonCodes: 'Geo21-Geo28', lessonCount: 8, practicumFocus: 'Observe economic geography or human interdependence work. Note how children understand trade, resources, and global connection.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 12, month: 'Month 3', theme: 'Biology: Plants Part 1 - Needs and Nomenclature', strands: 'Biology', lessonCodes: 'Bio4-Bio8', lessonCount: 5, practicumFocus: 'Observe botany nomenclature or command card work. Note how children use the materials for independent research.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 13, month: 'Month 4', theme: 'Biology: Plants Part 2 - Leaf, Root, Stem', strands: 'Biology + Theory', lessonCodes: 'Bio9-Bio11, T11', lessonCount: 4, practicumFocus: 'Present or observe a plant anatomy lesson. Document how the child moves from the material to drawing, labeling, and research.', albumDue: false, liveSession: true, discussionTheme: 'Cosmic Education in Practice: How do you see the Great Stories living in daily classroom work?' },
  { week: 14, month: 'Month 4', theme: 'Biology: Plants Part 3 - Flower, Fruit, Seed, Classification', strands: 'Biology', lessonCodes: 'Bio12-Bio15', lessonCount: 4, practicumFocus: 'Observe plant classification work. Note how children use the taxonomy to organize their understanding of the natural world.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 15, month: 'Month 4', theme: 'Biology: Zoology Introduction and Vertebrates', strands: 'Biology', lessonCodes: 'Bio16-Bio23', lessonCount: 8, practicumFocus: 'Observe zoology materials in use. Note how children classify animals and what research questions emerge.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 16, month: 'Month 4', theme: 'Biology: Invertebrates, Human Body, Ecology', strands: 'Biology', lessonCodes: 'Bio24-Bio30', lessonCount: 7, practicumFocus: 'Observe or participate in an ecology lesson. Document how children understand interdependence and the cosmic task of living things.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 17, month: 'Month 5', theme: 'Biology: Human Body Systems', strands: 'Biology + Theory', lessonCodes: 'Bio31-Bio35, T12', lessonCount: 6, practicumFocus: 'Observe human body materials. Note how children connect body systems to the Great River story framework.', albumDue: false, liveSession: true, discussionTheme: 'The Great Stories and Key Lessons: How do you know when a child is ready for the next key lesson?' },
  { week: 18, month: 'Month 5', theme: 'Biology: Ecology, Review, and Integration', strands: 'Biology', lessonCodes: 'Bio36-Bio38', lessonCount: 3, practicumFocus: 'Conduct a nature observation with children. Document what they notice, what questions they ask, and what research follows.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 19, month: 'Month 5', theme: 'History: Three Phases and Question Charts', strands: 'History', lessonCodes: 'His11-His14', lessonCount: 4, practicumFocus: 'Observe children using History Question Charts for research. Note how the charts guide inquiry and what civilizations interest children most.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 20, month: 'Month 5', theme: 'History: Civilizations and Migrations', strands: 'History', lessonCodes: 'His15-His21', lessonCount: 7, practicumFocus: 'Observe civilization studies in progress. Note which cultures are represented in the classroom materials and which are absent.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 21, month: 'Month 6', theme: 'History: Timelines, Time Activities, and Integration', strands: 'History + Theory', lessonCodes: 'His22-His28, T13', lessonCount: 8, practicumFocus: 'Observe or help a child make a timeline. Document the research process, the decisions made about what to include, and the finished product.', albumDue: false, liveSession: true, discussionTheme: 'Going Out: Why is it essential, not enrichment? How do you plan meaningful going-out experiences?' },
  { week: 22, month: 'Month 6', theme: 'Mathematics: Foundation and Hierarchy', strands: 'Mathematics', lessonCodes: 'Math3-Math7', lessonCount: 5, practicumFocus: 'Observe the Wooden Hierarchy or Large Bead Frame in use. Note how the child understands place value through the material.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 23, month: 'Month 6', theme: 'Mathematics: Addition and Subtraction', strands: 'Mathematics', lessonCodes: 'Math8-Math12', lessonCount: 5, practicumFocus: "Present or observe an addition or subtraction material. Document the child's path from concrete to abstract.", albumDue: false, liveSession: false, discussionTheme: null },
  { week: 24, month: 'Month 6', theme: 'Geometry: Foundations - Solids, Lines, and Nomenclature', strands: 'Geometry', lessonCodes: 'Geom1-Geom8', lessonCount: 8, practicumFocus: 'Observe geometry nomenclature work. Note how children connect 3D solids to 2D representations.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 25, month: 'Month 7', theme: 'Mathematics: Multiplication - Laws and Materials', strands: 'Mathematics + Theory', lessonCodes: 'Math13-Math17, T14', lessonCount: 6, practicumFocus: 'Observe the Checkerboard in use. Note how the material makes partial products visible and concrete.', albumDue: false, liveSession: true, discussionTheme: 'Freedom and Responsibility: How do elementary children handle expanded freedom? What happens when they struggle?' },
  { week: 26, month: 'Month 7', theme: 'Mathematics: Multiplication and Division', strands: 'Mathematics', lessonCodes: 'Math18-Math23', lessonCount: 6, practicumFocus: "Observe Racks and Tubes or long division work. Document the child's process and where the transition to abstraction occurs.", albumDue: true, liveSession: false, discussionTheme: null },
  { week: 27, month: 'Month 7', theme: 'Mathematics: Fractions and Decimals', strands: 'Mathematics', lessonCodes: 'Math24-Math28', lessonCount: 5, practicumFocus: 'Present or observe fraction work. Note how the fraction insets make equivalence and operations concrete.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 28, month: 'Month 7', theme: 'Geometry: Congruence, Similarity, Angles', strands: 'Geometry', lessonCodes: 'Geom9-Geom16', lessonCount: 8, practicumFocus: 'Observe angle work or constructive triangle work. Document how children discover geometric relationships through the materials.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 29, month: 'Month 8', theme: 'Mathematics: Squaring, Cubing, and Powers', strands: 'Mathematics + Theory', lessonCodes: 'Math29-Math34, T15', lessonCount: 7, practicumFocus: "Observe squaring or cubing materials. Note the child's reaction to discovering patterns in square and cube numbers.", albumDue: false, liveSession: true, discussionTheme: 'Assessment and Record Keeping: What records serve the child versus the institution?' },
  { week: 30, month: 'Month 8', theme: 'Mathematics: Practical Applications and Integration', strands: 'Mathematics', lessonCodes: 'Math35-Math38', lessonCount: 4, practicumFocus: 'Observe math in practical contexts: measurement, money, data collection. Note how children apply math concepts to real situations.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 31, month: 'Month 8', theme: 'Geometry: Triangles, Quadrilaterals, and Polygons', strands: 'Geometry', lessonCodes: 'Geom17-Geom26', lessonCount: 10, practicumFocus: 'Observe geometric figure work. Document how children derive area formulas from concrete material explorations.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 32, month: 'Month 8', theme: 'Geometry: Circles, Volume, and Integration', strands: 'Geometry', lessonCodes: 'Geom27-Geom32', lessonCount: 6, practicumFocus: 'Observe a child discovering pi or working with volume. Note the moment of understanding.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 33, month: 'Month 9', theme: 'Language: Word Study and History of Language', strands: 'Language + Theory', lessonCodes: 'Lang3-Lang7, T16', lessonCount: 6, practicumFocus: 'Observe word study materials (prefixes, suffixes, compound words). Note how children discover patterns in language structure.', albumDue: false, liveSession: true, discussionTheme: 'The Role of the Adult: What have you learned about when to step in and when to step back?' },
  { week: 34, month: 'Month 9', theme: 'Language: Parts of Speech - Noun through Adjective', strands: 'Language', lessonCodes: 'Lang8-Lang17', lessonCount: 10, practicumFocus: 'Present or observe a grammar box lesson. Document how the child discovers word function through the material rather than memorizing rules.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 35, month: 'Month 9', theme: 'Language: Parts of Speech - Verb through Interjection', strands: 'Language', lessonCodes: 'Lang18-Lang30', lessonCount: 13, practicumFocus: 'Observe command card work for any part of speech. Note how children act out or demonstrate grammar concepts physically.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 36, month: 'Month 9', theme: 'Language: Sentence Structure and Writing', strands: 'Language', lessonCodes: 'Lang31-Lang36', lessonCount: 6, practicumFocus: 'Observe sentence analysis or creative writing. Document how children apply grammar knowledge to their own composition.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 37, month: 'Month 10', theme: 'Language: Reading, Research, and Communication', strands: 'Language + Theory', lessonCodes: 'Lang37-Lang43, T17', lessonCount: 8, practicumFocus: 'Observe a child conducting research using multiple sources. Document their process from question to organized notes.', albumDue: false, liveSession: true, discussionTheme: 'Grace and Courtesy in Elementary: How does social life support academic work?' },
  { week: 38, month: 'Month 10', theme: 'Language: Literature, Integration, and Review', strands: 'Language', lessonCodes: 'Lang44-Lang49', lessonCount: 6, practicumFocus: 'Observe a book discussion or literature circle. Note how children engage with text at different levels of interpretation.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 39, month: 'Month 10', theme: 'Art: Elements of Art Part 1', strands: 'Art', lessonCodes: 'Art1-Art9', lessonCount: 9, practicumFocus: 'Observe the art area. Note which elements of art children explore naturally and which require introduction.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 40, month: 'Month 10', theme: 'Art: Elements of Art Part 2 and Principles', strands: 'Art', lessonCodes: 'Art10-Art17', lessonCount: 8, practicumFocus: 'Present or observe an art element or principle lesson. Document how children apply the concept in their own work.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 41, month: 'Month 11', theme: 'Art: Artists, Media, and the Prepared Environment', strands: 'Art + Theory', lessonCodes: 'Art18-Art28, T18-T19', lessonCount: 13, practicumFocus: 'Observe children working with different art media. Note their choices, concentration, and self-expression.', albumDue: false, liveSession: true, discussionTheme: 'How to Give a Presentation: What have you learned about economy of words and following the child?' },
  { week: 42, month: 'Month 11', theme: 'Music: Foundations - Sound, Rhythm, and Instruments', strands: 'Music', lessonCodes: 'Mus1-Mus8', lessonCount: 8, practicumFocus: 'Observe children exploring musical instruments or rhythm activities. Note sensory engagement and self-directed exploration.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 43, month: 'Month 11', theme: 'Music: Scales, Notation, and Singing', strands: 'Music', lessonCodes: 'Mus9-Mus18', lessonCount: 10, practicumFocus: 'Observe tone bar or singing activities. Document how children develop musicality through the Montessori materials.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 44, month: 'Month 11', theme: 'Music: Listening, Composition, Movement, and Integration', strands: 'Music + Theory', lessonCodes: 'Mus19-Mus26, T20-T21', lessonCount: 10, practicumFocus: 'Observe a music appreciation or movement activity. Note how children respond physically and emotionally to music.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 45, month: 'Month 12', theme: 'Mathematics: Advanced Topics and Problem Solving', strands: 'Mathematics + Theory', lessonCodes: 'Math39-Math50, T22-T24', lessonCount: 15, practicumFocus: 'Observe advanced math work (algebra, ratio, probability). Note which abstract concepts children can engage with and which still need concrete support.', albumDue: false, liveSession: true, discussionTheme: 'Equity and Justice: How does your practice honor every child in the room?' },
  { week: 46, month: 'Month 12', theme: 'Theory: Observation, Planning, and Assessment', strands: 'Theory', lessonCodes: 'T25-T28', lessonCount: 4, practicumFocus: 'Complete a full week of systematic observation records. Reflect on how your observation practice has evolved since Month 1.', albumDue: true, liveSession: false, discussionTheme: null },
  { week: 47, month: 'Month 12', theme: 'Theory: Equity, Classroom Management, and Running a Classroom', strands: 'Theory', lessonCodes: 'T29-T31', lessonCount: 3, practicumFocus: 'Conduct a full materials and practices audit. Document equity, representation, and inclusion in your classroom.', albumDue: false, liveSession: false, discussionTheme: null },
  { week: 48, month: 'Month 12', theme: 'Capstone: Your Elementary Philosophy of Education', strands: 'Theory', lessonCodes: 'T32', lessonCount: 1, practicumFocus: 'Write your philosophy of education integrating everything you have learned. Present it to your Cohort Guide.', albumDue: true, liveSession: false, discussionTheme: null },
]

/** Strand abbreviation → strand name mapping per track */
export const STRAND_ABBREV: Record<string, Record<string, string>> = {
  primary: {
    T: 'Theory',
    PL: 'Practical Life',
    S: 'Sensorial',
    L: 'Language',
    M: 'Mathematics',
  },
  elementary: {
    T: 'Theory',
    Geo: 'Geography',
    Bio: 'Biology',
    His: 'History',
    Lang: 'Language',
    Math: 'Mathematics',
    Geom: 'Geometry',
    Art: 'Art',
    Mus: 'Music',
  },
}

/**
 * Parse lesson codes like "T1-T3, PL1-PL3" into an array of {strand, number} pairs.
 */
export function parseLessonCodes(codes: string, track: string): { strandName: string; lessonNumber: number }[] {
  const abbrevMap = STRAND_ABBREV[track]
  const results: { strandName: string; lessonNumber: number }[] = []

  const segments = codes.split(',').map(s => s.trim())
  for (const seg of segments) {
    // Match patterns like "T1-T3" or "PL4" or "Geo21-Geo28"
    const rangeMatch = seg.match(/^([A-Za-z]+)(\d+)-\1(\d+)$/)
    if (rangeMatch) {
      const [, abbrev, startStr, endStr] = rangeMatch
      const strandName = abbrevMap[abbrev]
      if (!strandName) continue
      const start = parseInt(startStr)
      const end = parseInt(endStr)
      for (let i = start; i <= end; i++) {
        results.push({ strandName, lessonNumber: i })
      }
      continue
    }

    // Match cross-strand range like "T4-T5" already handled above
    // Match single lesson like "T9" or "Geo1"
    const singleMatch = seg.match(/^([A-Za-z]+)(\d+)$/)
    if (singleMatch) {
      const [, abbrev, numStr] = singleMatch
      const strandName = abbrevMap[abbrev]
      if (!strandName) continue
      results.push({ strandName, lessonNumber: parseInt(numStr) })
      continue
    }

    // Handle range across different strands like "T4-T5" (same prefix, handled by rangeMatch)
    // Handle mixed like "Geo3-Geo8" (same prefix, handled by rangeMatch)
    // If we get here, try a more flexible range match
    const flexRange = seg.match(/^([A-Za-z]+)(\d+)\s*-\s*([A-Za-z]+)(\d+)$/)
    if (flexRange) {
      const [, abbrev1, start, abbrev2, end] = flexRange
      if (abbrev1 === abbrev2) {
        const strandName = abbrevMap[abbrev1]
        if (!strandName) continue
        for (let i = parseInt(start); i <= parseInt(end); i++) {
          results.push({ strandName, lessonNumber: i })
        }
      }
    }
  }

  return results
}
