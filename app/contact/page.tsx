import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { Container, PageIntro } from '@/components/site/Section'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact West Ventures: prospective partners, advisors, Student Fellows and founders.',
}

export default function ContactPage() {
  return (
    <main>
      <PageIntro label="Contact" title="Contact">
        <p>For prospective partners, advisors and Student Fellows, and for founders with a project.</p>
      </PageIntro>
      <Container>
        <div data-reveal-item style={{ '--d': 3 } as React.CSSProperties} className="max-w-[760px]">
          <ContactForm />
        </div>
      </Container>
    </main>
  )
}
