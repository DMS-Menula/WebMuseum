import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "../animations/gsap.js";
import { useMotionPreference } from "../hooks/useMotionPreference.js";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { useUI } from "./UIContext.jsx";
import { timelineEvents } from "../data/timeline.js";
import { getChapter } from "../data/chapters.js";
import { scrollToTarget } from "../animations/scroll.js";

/* ------------------------------------------------------------------ */
/* Panels                                                              */
/* ------------------------------------------------------------------ */

function TimelinePanel({ event, onJump }) {
  const chapter = getChapter(event.chapterId);
  return (
    <button
      onClick={onJump}
      className="group relative text-left w-[250px] sm:w-[270px] shrink-0 border border-line bg-ink-2 hover:border-accent/50 transition-colors p-5"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-[3px] bg-line group-hover:bg-accent transition-colors"
      />
      <p className="font-mono tabular text-accent text-sm tracking-[0.1em]">
        {event.year}
      </p>
      <h4 className="font-display font-semibold text-base text-paper mt-1.5">
        {event.title}
      </h4>
      <p className="text-muted text-[12.5px] leading-relaxed mt-2 line-clamp-4">
        {event.text}
      </p>
      <p className="kicker text-muted/50 mt-4 flex items-center gap-1.5 group-hover:text-accent transition-colors">
        CH.{chapter.num} — {chapter.short}
        <ArrowRight size={10} aria-hidden="true" />
      </p>
    </button>
  );
}

function EndPanel({ onJump }) {
  return (
    <button
      onClick={onJump}
      className="group relative text-left w-[250px] sm:w-[270px] shrink-0 border border-dashed border-muted/40 hover:border-accent/60 transition-colors p-5 bg-ink/50"
    >
      <p className="font-display font-semibold text-5xl text-accent leading-none">
        →
      </p>
      <h4 className="font-display font-semibold text-lg text-paper mt-4">
        The next chapter
      </h4>
      <p className="text-muted text-[12.5px] leading-relaxed mt-2">
        Unwritten. Visit the final wall of the museum.
      </p>
      <p className="kicker text-muted/50 mt-4 flex items-center gap-1.5 group-hover:text-accent transition-colors">
        CH.09 — The future
        <ArrowRight size={10} aria-hidden="true" />
      </p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Timeline() {
  const ref = useRef(null);
  const yearRef = useRef(null);
  const railRef = useRef(null);
  const { reduced } = useMotionPreference();
  const isMobile = useIsMobile();
  const pinned = !isMobile && !reduced;
  const { setActiveChapter } = useUI();

  useGSAP(
    () => {
      if (!ref.current) return;

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActiveChapter("timeline");
        },
      });

      if (!pinned) return;

      const q = gsap.utils.selector(ref);
      const track = q("[data-track]")[0];
      if (!track) return;

      const getDist = () =>
        Math.max(10, track.scrollWidth - window.innerWidth + 80);

      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: q("[data-pin]")[0],
          start: "top top",
          end: () => "+=" + getDist(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              timelineEvents.length - 1,
              Math.max(0, Math.round(self.progress * (timelineEvents.length - 1)))
            );
            if (yearRef.current) yearRef.current.textContent = timelineEvents[idx].year;
            if (railRef.current)
              railRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    },
    { scope: ref, dependencies: [pinned], revertOnUpdate: true }
  );

  const jump = (chapterId) =>
    scrollToTarget(`#${getChapter(chapterId).sectionId}`);

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="kicker text-accent mb-3">Interlude — the master timeline</p>
        <h3 className="d-2 text-paper">Every milestone, one line.</h3>
      </div>
      <p className="kicker text-muted/60 max-w-[220px] text-right">
        {pinned
          ? "Click any year to visit its chapter"
          : "Swipe sideways · tap a year to visit its chapter"}
      </p>
    </div>
  );

  const panels = (
    <>
      {timelineEvents.map((e, i) => (
        <TimelinePanel key={`${e.year}-${i}`} event={e} onJump={() => jump(e.chapterId)} />
      ))}
      <EndPanel onJump={() => jump("future")} />
    </>
  );

  return (
    <section
      ref={ref}
      id="timeline"
      aria-labelledby="timeline-heading"
      className="relative"
    >
      <h2 id="timeline-heading" className="sr-only">
        The master timeline — every milestone from 1945 to today
      </h2>

      {pinned ? (
        <div
          data-pin
          className="relative h-screen flex flex-col justify-center overflow-hidden border-y border-line bg-ink-2/30"
        >
          <div className="px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto w-full">
            <div className="flex flex-wrap items-end justify-between gap-4">
              {header}
              <p
                ref={yearRef}
                className="font-display font-semibold text-5xl sm:text-6xl text-paper tabular select-none"
                aria-hidden="true"
              >
                1945
              </p>
            </div>
          </div>
          <div className="mt-10 overflow-hidden">
            <div
              data-track
              className="flex gap-4 pl-4 sm:pl-6 lg:pl-10 pr-[14vw] w-max items-stretch will-change-transform"
            >
              {panels}
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto w-full mt-8">
            <div className="flex items-center gap-4">
              <span className="kicker text-muted tabular">1945</span>
              <div className="relative flex-1 h-px bg-line">
                <div
                  ref={railRef}
                  className="absolute inset-0 bg-accent origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <span className="kicker text-muted tabular">2024</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-y border-line bg-ink-2/30 py-16 sm:py-20">
          <div className="px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
            {header}
          </div>
          <div className="timeline-scroll gap-4 mt-10 px-4 sm:px-6">
            {panels}
          </div>
        </div>
      )}
    </section>
  );
}
