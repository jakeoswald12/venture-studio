'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_EMAIL, FOOTER_EXTRA, NAV } from './nav'

export function Footer() {
  const pathname = usePathname()
  // The master plan deck fills the screen and has its own controls.
  if (pathname === '/master-plan') return null

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-14 sm:grid-cols-[1fr_auto] sm:px-8 pb-[calc(56px+env(safe-area-inset-bottom))]">
        <div className="flex flex-col gap-3">
          <span className="font-serif text-[1.45rem] font-semibold uppercase italic leading-none tracking-[.03em] text-ink">
            West
          </span>
          <p className="max-w-[42ch] text-[0.9rem]">
            West Ventures. A venture studio affiliated with Austin Christian University, Georgetown,
            Texas.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-line w-fit text-[0.9rem] text-ink">
            {CONTACT_EMAIL}
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 text-[0.9rem] sm:flex-col sm:items-end">
          {[...NAV, ...FOOTER_EXTRA].map((item) => (
            <Link key={item.href} href={item.href} className="link-line w-fit hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
