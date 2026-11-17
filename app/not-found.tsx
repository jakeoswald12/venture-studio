import Link from 'next/link'
import { Atmosphere } from '@/components/chrome/Atmosphere'
import { Arrow } from '@/components/modules/Media'

export default function NotFound() {
  return (
    <main className="home theme-dark" data-hdr="dark">
      <Atmosphere overlay={0.4} />
      <div style={{ position: 'absolute', left: 'var(--g)', bottom: '14%', zIndex: 2 }}>
        <h1 className="serif t-hero" style={{ margin: '0 0 24px' }}>
          Page not found
        </h1>
        <Link href="/" className="text-link">
          Home <Arrow />
        </Link>
      </div>
    </main>
  )
}
