import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { Lines } from '@/components/modules/Media'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'For prospective partners, advisors and Student Fellows, and for founders with a project.',
}

/** /contact — the general form, which used to sit at the bottom of the home page. */
export default function ContactPage() {
  return (
    <main>
      <section className="grid12 page-top m-gap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="d-1-5">
          <Lines as="h1" className="t-hero" lines={['Contact']} />
          <p className="t-body fade" data-io style={{ margin: '24px 0 16px', maxWidth: '36ch', '--d': 2 } as React.CSSProperties}>
            For prospective partners, advisors and Student Fellows, and for founders with a project.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="d-7-6">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
