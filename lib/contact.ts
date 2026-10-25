export const PERSONAS = ['Partner', 'Advisor', 'Student Fellow', 'Founder'] as const
export type Persona = (typeof PERSONAS)[number]

/** How each persona reads in the "I am a…" dropdown. */
export const PERSONA_LABELS: Record<Persona, string> = {
  Partner: 'Prospective partner',
  Advisor: 'Prospective advisor',
  'Student Fellow': 'Prospective Student Fellow',
  Founder: 'Founder',
}

export const STAGES = ['Idea', 'Building, no revenue', 'Revenue', 'Raising capital'] as const

/** general: homepage. partner: /partners. venture: /ventures startup submissions. */
export type FormVariant = 'general' | 'partner' | 'venture'

export interface ContactPayload {
  variant: FormVariant
  persona: Persona
  firstName: string
  lastName: string
  email: string
  phone?: string
  orgName?: string
  orgWebsite?: string
  stage?: string
  message: string
  /** Honeypot. Real visitors never fill it. */
  website?: string
}
