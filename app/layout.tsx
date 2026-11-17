import type { Metadata, Viewport } from 'next'
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import { Chrome } from '@/components/chrome/Chrome'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { RevealObserver } from '@/components/site/Reveal'
import './globals.css'

/* The reference pairs a light, high-contrast display serif with a plain
 * grotesque. Its own faces are commercial; these are the open equivalents. */
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const grotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-grotesk',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'West Ventures', template: '%s · West Ventures' },
  description:
    'West Ventures is a venture studio affiliated with Austin Christian University. Student teams work on real companies for course credit, and the studio builds companies of its own.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

/* Runs before first paint so the page never flashes the wrong theme. Dark is
 * the default; a stored choice wins. */
const themeScript = `(function(){var t='dark';try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')t=s}catch(e){}document.documentElement.dataset.theme=t})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${grotesk.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.preloader{display:none}.hdr{opacity:1!important}.home-enter{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll />
        <RevealObserver />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  )
}
