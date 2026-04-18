export type TrackKey = 'primary' | 'elementary'

export interface TrackTuition {
  key: TrackKey
  credential: string
  name: string
  programLength: string
  lessons: number
  strands: number
  payInFull: number
  monthly: number
  monthlyTermMonths: number
}

export const TRACK_TUITION: Record<TrackKey, TrackTuition> = {
  primary: {
    key: 'primary',
    credential: 'Primary Credential',
    name: 'Primary Track (3–6)',
    programLength: '9-month program',
    lessons: 224,
    strands: 7,
    payInFull: 5000,
    monthly: 417,
    monthlyTermMonths: 12,
  },
  elementary: {
    key: 'elementary',
    credential: 'Elementary Credential',
    name: 'Elementary Track (6–12)',
    programLength: '12-month program',
    lessons: 325,
    strands: 11,
    payInFull: 7000,
    monthly: 438,
    monthlyTermMonths: 16,
  },
}
