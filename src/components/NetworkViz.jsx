import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
const nodes = [[60,200,'UCLA'],[170,90,'SRI'],[170,310,'UCSB'],[290,200,'Utah'],[400,80],[420,190],[400,320],[520,130],[540,260],[630,200]]
const edges = [[0,1],[0,2],[1,3],[2,3],[1,2],[3,5],[3,4],[3,6],[4,7],[5,7],[5,8],[6,8],[7,9],[8,9]]
export default function NetworkViz() {
  const ref = useRef()
  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lines = gsap.utils.toArray('.edge'), dots = gsap.utils.toArray('.node')
    gsap.set(lines, { strokeDashoffset: 1 }); gsap.set(dots.slice(4), { opacity: 0 })
    gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 40%', scrub: true } })
      .to(lines, { strokeDashoffset: 0, stagger: .2, ease: 'none' }).to(dots.slice(4), { opacity: 1, stagger: .1 }, 0.3)
  }, { scope: ref })
  return (
    <figure className="net" ref={ref}>
      <svg viewBox="0 0 690 400" role="img" aria-label="Network diagram: the four original ARPANET sites, then more nodes joining as the network grows">
        {edges.map(([a, b], i) => <line key={i} className="edge" pathLength="1" x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
        {nodes.map(([x, y, l], i) => <g key={i} className="node"><circle cx={x} cy={y} r="7" />{l && <text x={x} y={y - 16} textAnchor="middle">{l}</text>}</g>)}
      </svg>
      <figcaption>Scroll to grow the network. The labelled nodes are the four ARPANET sites of December 1969; the rest are illustrative.</figcaption>
    </figure>
  )
}
