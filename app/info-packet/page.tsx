import type { Metadata } from 'next'
import { Frame } from '@/components/site/Frame'
import { InfoPacket } from '@/components/site/InfoPacket'

/**
 * /info-packet — the site's one inquiry form. Contact, Get in touch and
 * /contact all lead here. The visitor says who they are; the studio replies
 * and sends the info packet written for that audience.
 */

const TITLE = 'Info Packet'
const DESCRIPTION =
  'Submit an inquiry to West Ventures. The studio replies by email and sends the info packet for your situation: student, parent, founder, school, partner, advisor or Student Fellow.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/info-packet' },
  openGraph: { url: '/info-packet', title: TITLE, description: DESCRIPTION, type: 'website' },
}

export default function InfoPacketPage() {
  return (
    <main className="relative z-10 min-h-screen pt-[calc(120px+env(safe-area-inset-top))] sm:pt-[150px]">
      <Frame>
        <h1 className="hero-in max-w-[20ch] text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.98]">Info Packet</h1>
        <p className="hero-in mb-14 mt-6 max-w-[56ch] text-[1.06rem] leading-[1.65]" style={{ animationDelay: '120ms' }}>
          Submit your inquiry. The studio replies by email and also sends the info packet that
          matches your reason for interest. Choose who you are and the packet is shown on the left.
        </p>
        <InfoPacket />
      </Frame>
    </main>
  )
}
