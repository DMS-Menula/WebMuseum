import { useEffect, useRef } from 'react'
export default function ParticleField({ count = 70 }) {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const n = innerWidth < 700 ? Math.floor(count / 2) : count
    let w, h, raf, pts = []
    const size = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 })) }
    const draw = () => {
      x.clearRect(0, 0, w, h)
      for (const p of pts) { if (!reduce) { p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h } x.fillStyle = '#D8FF3E'; x.fillRect(p.x, p.y, 2, 2) }
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
        if (d < 130) { x.strokeStyle = 'rgba(216,255,62,' + (1 - d / 130) * .25 + ')'; x.beginPath(); x.moveTo(pts[i].x, pts[i].y); x.lineTo(pts[j].x, pts[j].y); x.stroke() }
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    size(); draw(); addEventListener('resize', size)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [count])
  return <canvas ref={ref} className="field" aria-hidden="true" />
}
