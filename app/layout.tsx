import type { Metadata, Viewport } from 'next'
import { Fraunces, IBM_Plex_Mono, Inter_Tight, Public_Sans, Unbounded } from 'next/font/google'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { RevealObserver } from '@/components/site/Reveal'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-public-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

// Used only for the launch.kids and Builder's Quotient wordmarks.
const unbounded = Unbounded({ subsets: ['latin'], weight: ['700'], variable: '--font-unbounded', display: 'swap' })
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['700'], variable: '--font-inter-tight', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'West Ventures', template: '%s · West Ventures' },
  description:
    'West Ventures is a venture studio affiliated with Austin Christian University. Student teams work on real companies for course credit, and the studio co-founds a small number of joint ventures.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#121110' },
  ],
}

/* Runs before first paint so the page never flashes the wrong theme. The
 * stored choice wins; otherwise the system setting decides. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable} ${unbounded.variable} ${interTight.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        <RevealObserver />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
