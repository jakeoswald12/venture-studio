export const NAV = [
  { href: '/ventures', label: 'Ventures' },
  { href: '/partners', label: 'Partners' },
  { href: '/team', label: 'Team' },
  { href: '/thesis', label: 'Thesis' },
  { href: '/contact', label: 'Contact' },
] as const

/** Pages linked from the footer only. */
export const FOOTER_EXTRA = [{ href: '/master-plan', label: 'Master plan' }] as const

export const CONTACT_EMAIL = 'partners@west.ventures'
