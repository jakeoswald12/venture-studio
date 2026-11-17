/**
 * Who is writing in. The first four are the original interest-form choices;
 * the rest are the info packet audiences. Each one maps to a packet.
 */
export const PERSONAS = [
  'Student',
  'Parent',
  'Founder',
  'High school',
  'University',
  'Partner',
  'Advisor',
  'Student Fellow',
] as const
export type Persona = (typeof PERSONAS)[number]

/** How each persona reads in the "I am a…" dropdown. */
export const PERSONA_LABELS: Record<Persona, string> = {
  Student: 'Student',
  Parent: 'Parent',
  Founder: 'Founder or executive',
  'High school': 'High school representative',
  University: 'University representative',
  Partner: 'Prospective partner',
  Advisor: 'Prospective advisor',
  'Student Fellow': 'Prospective Student Fellow',
}

export interface Packet {
  /** Packet name as shown on the page and in the confirmation email. */
  title: string
  /** What the packet covers. Literal, one line each. */
  contents: string[]
  /**
   * Name of the environment variable holding this packet's link. When it is
   * set, the confirmation email includes the link; when it is not, the studio
   * sends the packet by hand.
   */
  env: string
}

export const PACKETS: Record<Persona, Packet> = {
  Student: {
    title: 'Student packet',
    contents: ['How a term works', 'Roles, hours and course credit', 'Cost and scholarships', 'How to apply'],
    env: 'PACKET_URL_STUDENT',
  },
  Parent: {
    title: 'Parent packet',
    contents: ['What students do on a project', 'Hours, supervision and course credit', 'Cost and scholarships', 'How to nominate a student'],
    env: 'PACKET_URL_PARENT',
  },
  Founder: {
    title: 'Founder and executive packet',
    contents: ['What a project team delivers in a term', 'What the founder provides', 'Equity and intellectual property', 'How to submit a project'],
    env: 'PACKET_URL_FOUNDER',
  },
  'High school': {
    title: 'High school packet',
    contents: ['How schools nominate students', 'What students do and the credit they earn', 'Cost to the school and to families', 'Next steps for a partnership'],
    env: 'PACKET_URL_HIGH_SCHOOL',
  },
  University: {
    title: 'University packet',
    contents: ['How universities nominate students', 'Course credit and academic paperwork', 'Cost to the university and to families', 'Next steps for a partnership'],
    env: 'PACKET_URL_UNIVERSITY',
  },
  Partner: {
    title: 'Partner packet',
    contents: ['The studio and its thesis', 'How partners work with the studio', 'Current ventures', 'Next steps'],
    env: 'PACKET_URL_PARTNER',
  },
  Advisor: {
    title: 'Advisor packet',
    contents: ['What a project advisor does', 'Time commitment per term', 'How teams and projects are assigned', 'Next steps'],
    env: 'PACKET_URL_ADVISOR',
  },
  'Student Fellow': {
    title: 'Student Fellow packet',
    contents: ['What Student Fellows do', 'How Fellows are selected', 'Work on the studio’s joint ventures', 'How to apply'],
    env: 'PACKET_URL_STUDENT_FELLOW',
  },
}

/**
 * general: the Info Packet page (every persona). partner: /partners.
 * venture: /ventures startup submissions.
 */
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
  message: string
  /** Honeypot. Real visitors never fill it. */
  website?: string
}
