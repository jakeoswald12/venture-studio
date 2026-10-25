export const PERSONAS = ['Partner', 'Advisor', 'Student Fellow', 'Founder'] as const
export type Persona = (typeof PERSONAS)[number]

export interface ContactPayload {
  persona: Persona
  name: string
  email: string
  organization?: string
  message: string
  /** Honeypot. Real visitors never fill it. */
  website?: string
}
