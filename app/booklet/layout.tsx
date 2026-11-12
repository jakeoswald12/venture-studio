import type { Metadata } from 'next'
import './booklet.css'

export const metadata: Metadata = {
  title: 'Info Booklet',
  robots: { index: false, follow: false, nocache: true },
}

export default function BookletLayout({ children }: { children: React.ReactNode }) {
  return children
}
