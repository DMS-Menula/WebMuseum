import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { sources } from '../data/sources.js'
import NetworkViz from './NetworkViz.jsx'
import Browser, { webPages, retroPages } from './Browser.jsx'
export default function Chapter({ c }) {
  const ref = useRef()
  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('h2', { clipPath: 'inset(0 0 100% 0)', y: 30, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
    gsap.from('.years', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: ref.current, scrub: true } })
  }, { scope: ref })
  const s = sources[c.fact.s]
  return (
    <section id={c.id} data-theme={c.theme} className="chapter" ref={ref} aria-labelledby={c.id + '-h'}>
      <div className="years" aria-hidden="true">{c.years}</div>
      <div className="main">
        <h2 id={c.id + '-h'}>{c.title}</h2>
        <p className="meta">{c.years}</p>
        {c.body.map((t, i) => <p key={i} className="body">{t}</p>)}
        {c.viz === 'network' && <NetworkViz />}
        {c.viz === 'browser' && <Browser pages={webPages} />}
        {c.viz === 'retro' && <Browser pages={retroPages} retro />}
        <ol className="events">{c.events.map(e => <li key={e.y + e.t}><time>{e.y}</time><span>{e.t}</span></li>)}</ol>
        <aside className="fact"><h3>Did you know?</h3><p>{c.fact.t}</p><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></aside>
      </div>
    </section>
  )
}
