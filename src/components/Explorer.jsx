import { useState } from 'react'
import { chapters } from '../data/chapters.js'
export default function Explorer() {
  const [i, setI] = useState(0), c = chapters[i]
  return (
    <section id="explorer" className="explorer" aria-labelledby="ex-h">
      <h2 id="ex-h">Era Explorer</h2>
      <div role="tablist" aria-label="Choose an era" className="tabs">
        {chapters.map((x, n) => <button key={x.id} role="tab" id={'t-' + x.id} aria-selected={n === i} aria-controls="ex-panel" onClick={() => setI(n)}>{x.years}</button>)}
      </div>
      <div role="tabpanel" id="ex-panel" aria-labelledby={'t-' + c.id} className="panel">
        <h3>{c.title}</h3>
        <p className="meta">Technologies: {c.tech.join(', ')}</p>
        <ul>{c.events.map(e => <li key={e.y + e.t}><b>{e.y}</b> {e.t}</li>)}</ul>
        <p className="body">{c.fact.t}</p>
      </div>
    </section>
  )
}
