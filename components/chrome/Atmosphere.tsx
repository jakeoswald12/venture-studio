'use client'

import { useEffect, useRef } from 'react'

/**
 * A generated loop that stands in for the abstract video backgrounds in the
 * reference: slow glossy light on black in the accent colour. `forms` drifts
 * soft volumes (hero, 404); `lines` draws thin light lines (footer, contact).
 * Drawn small and scaled up, paused off screen, still under reduced motion.
 */
export function Atmosphere({ variant = 'forms', overlay = 0.4 }: { variant?: 'forms' | 'lines'; overlay?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = (canvas.width = 480)
    const H = (canvas.height = 300)
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let visible = true

    const draw = (ms: number) => {
      const t = ms / 1000
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      if (variant === 'forms') {
        const blobs = [
          { r: 190, c: '88,77,255', a: 0.85, sx: 0.11, sy: 0.07, px: 0.62, py: 0.42, ax: 0.22, ay: 0.2 },
          { r: 150, c: '40,28,160', a: 0.9, sx: 0.07, sy: 0.12, px: 0.3, py: 0.66, ax: 0.2, ay: 0.18 },
          { r: 90, c: '190,180,255', a: 0.5, sx: 0.16, sy: 0.1, px: 0.72, py: 0.3, ax: 0.14, ay: 0.16 },
          { r: 120, c: '110,40,220', a: 0.55, sx: 0.05, sy: 0.09, px: 0.5, py: 0.8, ax: 0.3, ay: 0.1 },
        ]
        blobs.forEach((b, i) => {
          const x = (b.px + Math.sin(t * b.sx * 6.28 + i * 1.7) * b.ax) * W
          const y = (b.py + Math.cos(t * b.sy * 6.28 + i * 2.3) * b.ay) * H
          const g = ctx.createRadialGradient(x, y, 0, x, y, b.r)
          g.addColorStop(0, `rgba(${b.c},${b.a})`)
          g.addColorStop(0.5, `rgba(${b.c},${b.a * 0.28})`)
          g.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, W, H)
        })
        // Dark glossy forms cut back into the light.
        ctx.globalCompositeOperation = 'source-over'
        for (let i = 0; i < 3; i += 1) {
          const x = (0.5 + Math.sin(t * 0.09 + i * 2.1) * 0.34) * W
          const y = (0.5 + Math.cos(t * 0.07 + i * 1.3) * 0.3) * H
          const r = 70 + i * 26
          const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.1, x, y, r)
          g.addColorStop(0, 'rgba(30,26,60,0.9)')
          g.addColorStop(0.75, 'rgba(0,0,0,0.96)')
          g.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(x, y, r, 0, 6.3)
          ctx.fill()
        }
      } else {
        for (let i = 0; i < 26; i += 1) {
          const p = i / 25
          ctx.beginPath()
          for (let x = 0; x <= W; x += 8) {
            const y =
              H * (0.2 + p * 0.6) +
              Math.sin(x * 0.012 + t * 0.35 + i * 0.42) * 26 * (0.4 + p) +
              Math.sin(x * 0.004 - t * 0.2 + i) * 30
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.strokeStyle = i % 5 === 0 ? 'rgba(235,232,255,0.5)' : `rgba(88,77,255,${0.18 + p * 0.4})`
          ctx.lineWidth = i % 5 === 0 ? 0.6 : 1
          ctx.stroke()
        }
      }
    }

    const loop = (ms: number) => {
      if (visible) draw(ms)
      raf = requestAnimationFrame(loop)
    }
    if (still) draw(4000)
    else raf = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [variant])

  return (
    <div className="atmos" aria-hidden="true" style={{ '--overlay': overlay } as React.CSSProperties}>
      <canvas ref={ref} style={{ filter: variant === 'forms' ? 'blur(18px) saturate(1.2)' : 'blur(0.4px)', transform: 'scale(1.08)' }} />
    </div>
  )
}
