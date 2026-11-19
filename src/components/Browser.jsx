import { useState } from 'react'
export default function Browser({ pages, retro }) {
  const keys = Object.keys(pages), [k, setK] = useState(keys[0]), p = pages[k]
  return (
    <figure className={'browser' + (retro ? ' retro' : '')}>
      <div className="bar"><span className="dots" aria-hidden="true"><i /><i /><i /></span><div className="addr" aria-live="polite">{p.url}</div></div>
      <div className="page"><h4>{p.title}</h4><p>{p.text}</p>
        <ul>{keys.filter(x => x !== k).map(x => <li key={x}><button className="link" onClick={() => setK(x)}>{pages[x].title}</button></li>)}</ul></div>
      <figcaption>Educational recreation. Not original software or a real website.</figcaption>
    </figure>
  )
}
export const webPages = {
  home: { url: 'http://example.web/ (recreation)', title: 'World Wide Web', text: 'A project to link documents across many computers, so a reader can follow a reference from one page to another with a single click.' },
  how: { url: 'http://example.web/how.html', title: 'How it works', text: 'A page is written in HTML, sits on a server, and is fetched by a browser using HTTP. Each page has an address, called a URL.' },
  people: { url: 'http://example.web/people.html', title: 'Who built it', text: 'Tim Berners-Lee proposed the web at CERN in 1989 with help from colleagues such as Robert Cailliau.' },
}
export const retroPages = {
  home: { url: 'http://www.homepage.example/', title: 'Welcome to my home page!', text: 'You are visitor number 00042. This page is best viewed at 800x600. Sign the guestbook!' },
  construct: { url: 'http://www.homepage.example/new.html', title: 'Under construction', text: 'Early sites were never finished. Banners like this one were everywhere in the late 1990s.' },
  guest: { url: 'http://www.homepage.example/guestbook.html', title: 'Guestbook', text: 'Guestbooks were one of the first ways for strangers to leave a message on someone\'s site.' },
}
