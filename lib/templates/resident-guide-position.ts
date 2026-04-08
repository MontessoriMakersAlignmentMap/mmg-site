export const RESIDENT_GUIDE_TEMPLATE = `Title: Resident Guide
School: {{school_name}}
Location: {{city_state}}
Program Levels: {{program_levels}}
Start Date: {{start_date}}
Compensation: {{compensation_range}}

About This Role

{{school_name}} is seeking a Resident Guide to join our community in a unique and vital capacity. Unlike a traditional guide position, the Resident Guide is not assigned to a single classroom. Instead, this person becomes deeply embedded in every classroom across our {{program_levels}} program, building authentic relationships with every child, every guide, and every family in the school.

The Resident Guide exists to sustain the whole school. This role gives our permanent guides the psychological safety to step away and fully rest, knowing their children are held by someone who knows them by name, knows their work, and knows the rhythm of their classroom. This is not substitute coverage. This is a structural commitment to staff wellness and community continuity.

What You Will Do

You will spend your first month rotating through every classroom to learn each child, each guide, each prepared environment, and each school rhythm. After onboarding you will rotate on a planned schedule to cover for guides who are taking planned wellness time, personal leave, or professional development. You will attend all staff meetings and community events as a full member of the faculty. You will maintain detailed notes on each classroom so your coverage is seamless every time.

What We Are Looking For

You are credentialed in Montessori and have experience across at least two program levels. You thrive on variety rather than routine. You read a room quickly and can hold the prepared environment without disrupting it. You are deeply relational and children trust you fast. You have worked in at least two Montessori schools and carry what you learned from each one. You do not need to build your own classroom to feel fulfilled. You are energized by the idea of belonging to a whole school rather than a single room.

Credential Requirements: {{credential_required}}
Languages: {{languages_required}}
Years of Experience: {{years_experience_min}} or more years in Montessori education

Why This Role Exists

We believe guides who are rested bring their full selves to children. We believe coverage anxiety is a retention crisis in slow motion. We believe that investing in one Resident Guide is less expensive than losing one experienced guide and spending {{turnover_cost_estimate}} to replace them. This role is our commitment to building a school where people stay for decades.

To learn more or express interest contact {{contact_name}} at {{contact_email}}.`

/**
 * Fill in template tokens that can be inferred from form fields.
 * Returns the template with known values substituted; unknown tokens remain as {{placeholders}}.
 */
export function fillResidentGuideTemplate(fields: {
  school_name?: string
  location_city?: string
  location_state?: string
  levels_required?: string[]
  credential_required?: string
  start_date?: string
}): string {
  let result = RESIDENT_GUIDE_TEMPLATE

  if (fields.school_name)
    result = result.replaceAll('{{school_name}}', fields.school_name)

  if (fields.location_city || fields.location_state) {
    const city_state = [fields.location_city, fields.location_state].filter(Boolean).join(', ')
    result = result.replace('{{city_state}}', city_state)
  }

  if (fields.levels_required?.length)
    result = result.replaceAll('{{program_levels}}', fields.levels_required.join(', '))

  if (fields.credential_required)
    result = result.replace('{{credential_required}}', fields.credential_required)

  if (fields.start_date)
    result = result.replace('{{start_date}}', fields.start_date)

  return result
}
