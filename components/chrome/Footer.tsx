'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Arrow } from '@/components/modules/Media'
import { CONTACT_EMAIL } from '@/lib/site'
import { Atmosphere } from './Atmosphere'

/**
 * The footer is a closing scene: one prompt, three ways to answer it, and the
 * small print at the very bottom. Three modes, chosen by page: standard,
 * links only (contact), and hidden (home, which does not scroll).
 */
const PATHS = [
  { href: '/ventures#submit', label: 'Submit a startup' },
  { href: '/partners#partner-form', label: 'Partnership inquiry' },
  { href: '/contact', label: 'General contact' },
]
const PAGES = [
  { href: '/ventures', label: 'Ventures' },
  { href: '/partners', label: 'Partners' },
  { href: '/team', label: 'Team' },
  { href: '/thesis', label: 'Thesis' },
]

function Bottom() {
  return (
    <div className="grid12 ftr-bottom">
      <nav aria-label="Footer" className="d-1-4">
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href}>
            {p.label}
          </Link>
        ))}
      </nav>
      <nav aria-label="Contact" style={{ gridColumn: 'span 3' }}>
        <Link href="/contact">Contact</Link>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </nav>
      <p style={{ gridColumn: 'span 4', margin: 0 }}>
        West Ventures. A venture studio affiliated with Austin Christian University, Georgetown, Texas.
      </p>
      <span className="wordmark m-hide" style={{ justifySelf: 'end', fontSize: 18 }} aria-hidden="true">
        West
      </span>
    </div>
  )
}

export function Footer() {
  const pathname = usePathname()
  if (pathname === '/') return null

  if (pathname === '/contact') {
    return (
      <footer className="ftr links-only">
        <Bottom />
      </footer>
    )
  }

  return (
    <footer className="ftr theme-dark" data-hdr="dark">
      <Atmosphere variant="lines" overlay={0.6} />
      <div className="grid12 m-gap">
        <h2 className="serif t-hero d-1-6" style={{ margin: 0 }}>
          Contact
          <br />
          the studio
        </h2>
        <nav aria-label="Contact paths" className="ftr-links d-7-6">
          {PATHS.map((p) => (
            <Link key={p.href} href={p.href}>
              {p.label}
              <Arrow />
            </Link>
          ))}
        </nav>
      </div>
      <Bottom />
    </footer>
  )
}
