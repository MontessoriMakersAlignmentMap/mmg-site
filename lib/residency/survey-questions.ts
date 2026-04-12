export type SurveyType = 'week_2' | 'week_6' | 'completion'

export interface SurveyQuestion {
  key: string
  text: string
  type: 'text' | 'scale'
}

// Three core questions shared across all surveys
const coreQuestions: SurveyQuestion[] = [
  { key: 'core_learning', text: 'What has been most valuable about your learning experience so far?', type: 'text' },
  { key: 'core_challenge', text: 'What has been your biggest challenge, and how have you navigated it?', type: 'text' },
  { key: 'core_suggestion', text: 'What is one thing the program could do differently to better support your growth?', type: 'text' },
]

const week2Questions: SurveyQuestion[] = [
  ...coreQuestions,
  { key: 'w2_orientation', text: 'How well did orientation prepare you for the residency?', type: 'scale' },
  { key: 'w2_platform', text: 'How easy has it been to navigate the learning platform?', type: 'scale' },
  { key: 'w2_mentor_connection', text: 'How connected do you feel to your mentor?', type: 'scale' },
  { key: 'w2_cohort_belonging', text: 'How strong is your sense of belonging in your cohort?', type: 'scale' },
  { key: 'w2_expectations', text: 'How clear are the program expectations and requirements?', type: 'scale' },
  { key: 'w2_early_support', text: 'Is there anything you need right now that you don\'t have access to?', type: 'text' },
]

const week6Questions: SurveyQuestion[] = [
  ...coreQuestions,
  { key: 'w6_content_quality', text: 'How would you rate the quality of the lesson content?', type: 'scale' },
  { key: 'w6_mentor_feedback', text: 'How useful has your mentor\'s feedback been?', type: 'scale' },
  { key: 'w6_practicum_readiness', text: 'How prepared do you feel for your practicum work?', type: 'scale' },
  { key: 'w6_workload', text: 'How manageable is the program workload?', type: 'scale' },
  { key: 'w6_growth', text: 'How much growth have you experienced as a Montessori educator?', type: 'scale' },
  { key: 'w6_midpoint_reflection', text: 'What would you tell someone considering this residency?', type: 'text' },
]

const completionQuestions: SurveyQuestion[] = [
  ...coreQuestions,
  { key: 'comp_overall', text: 'How would you rate your overall residency experience?', type: 'scale' },
  { key: 'comp_preparation', text: 'How well did the program prepare you to lead a Montessori classroom?', type: 'scale' },
  { key: 'comp_mentor_impact', text: 'How impactful was your mentor relationship on your development?', type: 'scale' },
  { key: 'comp_album_process', text: 'How valuable was the album entry process for your learning?', type: 'scale' },
  { key: 'comp_recommend', text: 'How likely are you to recommend this program to a colleague?', type: 'scale' },
  { key: 'comp_proudest_moment', text: 'What is your proudest moment from the residency?', type: 'text' },
  { key: 'comp_future', text: 'What are your next steps as a Montessori educator?', type: 'text' },
]

export const surveyQuestions: Record<SurveyType, SurveyQuestion[]> = {
  week_2: week2Questions,
  week_6: week6Questions,
  completion: completionQuestions,
}

export const surveyLabels: Record<SurveyType, string> = {
  week_2: 'Week 2 Check-In',
  week_6: 'Week 6 Midpoint',
  completion: 'Completion Survey',
}
