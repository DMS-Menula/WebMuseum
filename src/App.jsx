<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Analytics } from '@vercel/analytics/react'
import { chapters } from './data/chapters.js'
import { sources } from './data/sources.js'
import Chapter from './components/Chapter.jsx'
import Explorer from './components/Explorer.jsx'
import Timeline from './components/Timeline.jsx'
import ParticleField from './components/ParticleField.jsx'
gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const [active, setActive] = useState('Introduction'), bar = useRef(), hero = useRef()
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis, tick
    if (!reduce) {
      lenis = new Lenis(); lenis.on('scroll', ScrollTrigger.update)
      tick = t => lenis.raf(t * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    }
    const onScroll = () => { const h = document.documentElement; bar.current.style.transform = 'scaleX(' + (scrollY / (h.scrollHeight - innerHeight || 1)) + ')' }
    addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.dataset.name)), { rootMargin: '-45% 0px -45% 0px' })
    document.querySelectorAll('[data-name]').forEach(el => io.observe(el))
    return () => { removeEventListener('scroll', onScroll); io.disconnect(); if (lenis) { gsap.ticker.remove(tick); lenis.destroy() } }
  }, [])
  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('.hero h1 span', { yPercent: 110, stagger: .12, duration: 1, ease: 'power4.out' })
    gsap.to('.hero .inner', { opacity: 0, y: -80, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: hero })
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="progress" ref={bar} aria-hidden="true" />
      <header className="nav">
        <a href="#top" className="logo">WebMuseum</a>
        <nav aria-label="Primary"><a href="#before">Explore</a><a href="#timeline">Timeline</a><a href="#about">About</a></nav>
        <span className="now" aria-live="polite">{active}</span>
      </header>
      <main id="main">
        <section id="top" className="hero" ref={hero} data-name="Introduction">
          <ParticleField />
          <div className="inner">
            <h1><span>THE INTERNET.</span><span>A JOURNEY THROUGH TIME.</span></h1>
            <p>From the first connected computers to a world transformed by the web. Explore the history of the technology that changed everything.</p>
            <a href="#before" className="scroll">Scroll to begin</a>
          </div>
        </section>
        {chapters.map(c => <div key={c.id} data-name={c.years}><Chapter c={c} /></div>)}
        <Timeline active={active && chapters.find(c => c.years === active)?.id} />
        <Explorer />
        <section className="future" data-name="The future" aria-labelledby="fu-h">
          <ParticleField count={110} />
          <div className="inner"><h2 id="fu-h">WHAT COMES NEXT?</h2>
            <p>The internet is still evolving. Its next chapter hasn't been written yet.</p></div>
        </section>
        <section id="about" className="about" data-name="About" aria-labelledby="ab-h">
          <h2 id="ab-h">About WebMuseum</h2>
          <p className="body">WebMuseum is an educational project that tells the story of the internet. Dates and events were checked against the sources below; where a topic is still unfolding, the text says so. Visuals are original, and the browser windows are recreations, not original software.</p>
          <h3>Sources and further reading</h3>
          <ul>{Object.values(sources).map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
        </section>
      </main>
      <footer className="foot">WebMuseum. Explore the Evolution of the Internet. MIT licensed.</footer>
      <Analytics />
    </>
  )
=======
>>>>>>> f374fb7253c9faa008e87cddf5a693b3c57721ea
import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { ScrollTrigger } from "./animations/gsap.js";
import { initSmoothScroll } from "./animations/scroll.js";
import { useMotionPreference } from "./hooks/useMotionPreference.js";
import { UIProvider } from "./components/UIContext.jsx";
import Preloader from "./components/Preloader.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Cursor from "./components/Cursor.jsx";
import Footer from "./components/Footer.jsx";
import Timeline from "./components/Timeline.jsx";
import EraExplorer from "./components/EraExplorer.jsx";
import AboutPanel from "./components/AboutPanel.jsx";
import Hero from "./sections/Hero.jsx";
import Beginning from "./sections/Beginning.jsx";
import InternetOrigins from "./sections/InternetOrigins.jsx";
import BirthOfWeb from "./sections/BirthOfWeb.jsx";
import BrowserEra from "./sections/BrowserEra.jsx";
import SocialWeb from "./sections/SocialWeb.jsx";
import MobileEra from "./sections/MobileEra.jsx";
import ModernWeb from "./sections/ModernWeb.jsx";
import FutureWeb from "./sections/FutureWeb.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  const { reduced } = useMotionPreference();

  // Smooth scrolling (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    const destroy = initSmoothScroll({ reduced });
    return () => destroy();
  }, [reduced]);

  // Layout changes (motion toggle, fonts) shift trigger positions
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const onPreloaderDone = useCallback(() => {
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <Preloader onDone={onPreloaderDone} />
        <ProgressBar />
        <Navbar />
        <Cursor />

        <main id="main">
          <Hero ready={ready} />
          <Beginning />
          <InternetOrigins />
          <BirthOfWeb />
          <BrowserEra />
          <SocialWeb />
          <MobileEra />
          <ModernWeb />
          <Timeline />
          <FutureWeb />
        </main>

        <Footer />

        <EraExplorer />
        <AboutPanel />

        <div className="grain" aria-hidden="true" />
      </UIProvider>
    </MotionConfig>
  );
<<<<<<< HEAD
=======
>>>>>>> 10b01fe (Version 2.0)
>>>>>>> f374fb7253c9faa008e87cddf5a693b3c57721ea
}
