<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> f374fb7253c9faa008e87cddf5a693b3c57721ea
import { useId, useRef } from "react";
import { ScrollTrigger, useGSAP } from "../animations/gsap.js";
import { setupReveals } from "../animations/transitions.js";
import { useUI } from "./UIContext.jsx";
import { useMotionPreference } from "../hooks/useMotionPreference.js";

/*
 * Shared chapter shell: museum label, big heading, lede.
 * Registers the scroll-driven reveal vocabulary and reports the active
 * chapter to the navbar. `tone="paper"` switches to the archival-paper look.
 */
export default function Chapter({
  id,
  chapterId,
  num,
  kicker,
  years,
  title,
  lede,
  tone = "dark",
  children,
  className = "",
  contentClassName = "",
}) {
  const ref = useRef(null);
  const headingId = useId();
  const { reduced } = useMotionPreference();
  const { setActiveChapter } = useUI();
  const isPaper = tone === "paper";

  useGSAP(
    () => {
      setupReveals(ref.current, { reduced });
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      if (!ref.current) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActiveChapter(chapterId || id);
        },
      });
    },
    { scope: ref, dependencies: [chapterId, id], revertOnUpdate: true }
  );

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={`relative ${isPaper ? "bg-parchment text-ink-soft paper-tex" : ""} ${className}`}
    >
      <div
        className={`mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 pb-20 sm:pb-28 ${contentClassName}`}
      >
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-6 kicker">
            <span className={isPaper ? "text-ink-soft" : "text-accent"}>
              CH.{num}
            </span>
            <span className={isPaper ? "text-ink-soft/60" : "text-muted"}>
              {kicker}
            </span>
            <span
              className={
                isPaper ? "text-ink-soft/40 tabular" : "text-muted/70 tabular"
              }
            >
              {years}
            </span>
          </div>
          <h2
            id={headingId}
            data-split
            className={`d-1 max-w-5xl ${isPaper ? "text-ink-soft" : "text-paper"}`}
          >
            {title}
          </h2>
          {lede && (
            <p
              data-fade
              className={`body-lg mt-7 max-w-2xl ${
                isPaper ? "text-ink-soft/75" : "text-muted"
              }`}
            >
              {lede}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
<<<<<<< HEAD
=======
>>>>>>> 10b01fe (Version 2.0)
>>>>>>> f374fb7253c9faa008e87cddf5a693b3c57721ea
}
