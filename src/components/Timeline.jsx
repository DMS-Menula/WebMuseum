import { chapters } from '../data/chapters.js'
export default function Timeline({ active }) {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return (
    <section id="timeline" className="timeline" aria-label="Timeline">
      <h2>Timeline</h2>
      <ol className="strip">
        {chapters.flatMap(c => c.events.map(e => ({ ...e, id: c.id }))).map(e => (
          <li key={e.y + e.t} className={e.id === active ? 'on' : ''}>
            <button onClick={() => go(e.id)}><time>{e.y}</time><span>{e.t}</span></button>
          </li>))}
      </ol>
    </section>
  )
}
