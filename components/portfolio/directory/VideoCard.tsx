'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Click-to-play video card — the same treatment the /startups deck uses: the
 * still frame with a bronze play button over it, swapped for the real player
 * only once someone asks for it.
 *
 * A bare <iframe> would show YouTube's own chrome (title bar, channel avatar,
 * share controls, red button) before anyone presses anything, which reads as
 * someone else's UI dropped into the page. It also saves loading the player on
 * every visit.
 */
export function VideoCard({
  videoId,
  title,
  thumbnail,
}: {
  videoId: string
  title: string
  /** Defaults to YouTube's own max-resolution still. */
  thumbnail?: string
}) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="block aspect-video w-full rounded-[7px] border-0 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-[7px] bg-[#1b1a17] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]"
    >
      <Image
        src={thumbnail ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 768px) 92vw, 60vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bronze bg-bronze shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-105">
          <svg viewBox="0 0 16 16" width="23" height="23" fill="currentColor" className="text-[#f7f5f0]">
            <path d="M5 3.5v9l8-4.5z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
