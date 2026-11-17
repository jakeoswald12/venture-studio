/** Pages in the menu, in order. Info Packet sits under Thesis. */
export const NAV = [
  { href: '/ventures', label: 'Ventures' },
  { href: '/partners', label: 'Partners' },
  { href: '/team', label: 'Team' },
  { href: '/thesis', label: 'Thesis' },
  { href: '/info-packet', label: 'Info Packet' },
] as const

/** Pages linked from the footer only. */
export const FOOTER_EXTRA = [] as const

/** Where every "Contact" and "Get in touch" control leads. */
export const CONTACT_HREF = '/info-packet'

export const CONTACT_EMAIL = 'partners@west.ventures'
