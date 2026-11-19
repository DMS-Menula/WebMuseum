import { useRef } from "react";
import {
  Smartphone,
  LayoutGrid,
  StretchHorizontal,
  CloudUpload,
  PlayCircle,
  Heart,
} from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import FactCard from "../components/FactCard.jsx";
import { gsap, useGSAP } from "../animations/gsap.js";
import { useMotionPreference } from "../hooks/useMotionPreference.js";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { factsForChapter } from "../data/facts.js";

/* ------------------------------------------------------------------ */
/* Device illustrations (original line art)                            */
/* ------------------------------------------------------------------ */

function MonitorArt({ className = "" }) {
  return (
    <svg
      viewBox="0 0 360 300"
      className={className}
      role="img"
      aria-label="Line illustration of an early-2000s desktop computer displaying a webpage"
    >
      <g fill="none" stroke="#F5F5F0" strokeWidth="2.5" strokeLinecap="square">
        {/* CRT shell */}
        <rect x="30" y="20" width="300" height="220" rx="10" />
        <rect x="48" y="38" width="264" height="184" fill="#161b16" stroke="#2f2f2c" />
        {/* screen content: a webpage mock */}
        <rect x="64" y="52" width="120" height="10" fill="#D8FF3E" stroke="none" />
        <line x1="64" y1="76" x2="200" y2="76" stroke="#6b716b" />
        <line x1="64" y1="90" x2="180" y2="90" stroke="#6b716b" />
        <rect x="64" y="108" width="80" height="52" stroke="#3d4a3d" />
        <rect x="156" y="108" width="80" height="52" stroke="#3d4a3d" />
        <rect x="248" y="108" width="50" height="52" stroke="#3d4a3d" />
        <line x1="64" y1="176" x2="296" y2="176" stroke="#2f2f2c" />
        <line x1="64" y1="192" x2="260" y2="192" stroke="#2f2f2c" />
        {/* stand */}
        <rect x="156" y="240" width="48" height="22" />
        <rect x="120" y="262" width="120" height="12" rx="3" />
        {/* keyboard hint */}
        <line x1="96" y1="292" x2="264" y2="292" strokeOpacity="0.35" />
      </g>
      <text x="34" y="16" fill="#A1A1AA" fontSize="10" style={{ font: "10px 'JetBrains Mono', monospace", letterSpacing: "0.12em" }}>
        DESKTOP — 2004
      </text>
    </svg>
  );
}

function PhoneArt({ className = "" }) {
  return (
    <svg
      viewBox="0 0 190 330"
      className={className}
      role="img"
      aria-label="Line illustration of a modern smartphone displaying an app grid"
    >
      <g fill="none" stroke="#F5F5F0" strokeWidth="2.5" strokeLinecap="square">
        <rect x="14" y="10" width="162" height="310" rx="26" />
        <rect x="26" y="30" width="138" height="270" rx="4" fill="#121812" stroke="#2f2f2c" />
        <line x1="78" y1="19" x2="112" y2="19" strokeWidth="5" stroke="#2f2f2c" />
        {/* app grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={40 + col * 32}
              y={58 + row * 34}
              width="22"
              height="22"
              rx="5"
              stroke={
                (row + col) % 5 === 0 ? "#D8FF3E" : (row + col) % 3 === 0 ? "#6b716b" : "#3d4a3d"
              }
            />
          ))
        )}
        {/* feed lines */}
        <line x1="40" y1="172" x2="150" y2="172" stroke="#2f2f2c" />
        <rect x="40" y="184" width="110" height="8" rx="4" fill="#1f291f" stroke="none" />
        <rect x="40" y="198" width="90" height="8" rx="4" fill="#1f291f" stroke="none" />
        <circle cx="95" cy="256" r="16" stroke="#D8FF3E" />
        <line x1="89" y1="256" x2="101" y2="256" stroke="#D8FF3E" />
        <line x1="95" y1="250" x2="95" y2="262" stroke="#D8FF3E" />
      </g>
      <text x="14" y="345" fill="#A1A1AA" fontSize="10" style={{ font: "10px 'JetBrains Mono', monospace", letterSpacing: "0.12em" }}>
        PHONE — 2014
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* The morph exhibit (pinned + scrubbed on desktop)                    */
/* ------------------------------------------------------------------ */

const MORPH_STAGES = [
  {
    year: "2007",
    title: "One device, three things",
    text: "“An iPod, a phone, and an internet communicator.” Apple's iPhone (29 June 2007) put a real browser in a pocket — and made the touchscreen the default way to touch the internet.",
  },
  {
    year: "2008",
    title: "Apps for everything",
    text: "Apple's App Store opens on 10 July; the first Android phone ships in October. Software becomes a store, an SDK, an economy — and the web learns a new gesture: the swipe.",
  },
  {
    year: "2010s",
    title: "The internet, everywhere",
    text: "Responsive design teaches sites to fit any screen, 4G makes streaming ordinary, and the cloud keeps every device in sync. By October 2016, mobile browsing passes desktop worldwide.",
  },
];

function DeviceMorph() {
  const ref = useRef(null);
  const { reduced } = useMotionPreference();
  const isMobile = useIsMobile();
  const staticVariant = isMobile || reduced;

  useGSAP(
    () => {
      if (staticVariant || !ref.current) return;
      const q = gsap.utils.selector(ref);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      });

      // Stage 1 → 2: monitor retreats, phone arrives
      tl.to(q("[data-monitor]"), { scale: 0.55, x: "-42%", y: "6%", opacity: 0.25, duration: 1 }, 0.35)
        .fromTo(q("[data-phone]"), { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 0.65)
        .to(q('[data-morph-caption="0"]'), { autoAlpha: 0, y: -14, duration: 0.25 }, 0.55)
        .fromTo(q('[data-morph-caption="1"]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.75)
        // Stage 2 → 3: monitor fully out, phone centers and grows slightly
        .to(q("[data-monitor]"), { opacity: 0, duration: 0.4 }, 1.55)
        .to(q("[data-phone]"), { scale: 1.08, duration: 0.5 }, 1.6)
        .to(q('[data-morph-caption="1"]'), { autoAlpha: 0, y: -14, duration: 0.25 }, 1.55)
        .fromTo(q('[data-morph-caption="2"]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 1.75);

      tl.fromTo(
        q("[data-morph-rail]"),
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left", duration: tl.duration(), ease: "none" },
        0
      );
    },
    { scope: ref, dependencies: [staticVariant], revertOnUpdate: true }
  );

  if (staticVariant) {
    return (
      <div ref={ref} className="border border-line bg-ink-2/40 p-4 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <p className="kicker text-accent">From desk to pocket</p>
          <span className="kicker text-muted/60">2004 → 2014</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          <MonitorArt className="w-56 sm:w-72" />
          <span className="font-display text-accent text-4xl" aria-hidden="true">→</span>
          <PhoneArt className="w-40 sm:w-48" />
        </div>
        <ol className="mt-8 space-y-6">
          {MORPH_STAGES.map((s) => (
            <li key={s.year} className="border-l border-line pl-5">
              <p className="font-mono tabular text-[11px] tracking-[0.18em] text-accent mb-1">{s.year}</p>
              <h4 className="font-display font-semibold text-lg text-paper">{s.title}</h4>
              <p className="text-muted text-sm leading-relaxed mt-1.5">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative -mx-4 sm:-mx-6 lg:-mx-10 border-y border-line bg-ink-2/30"
    >
      <div className="h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="kicker text-accent">From desk to pocket</p>
          <p className="kicker text-muted/60 hidden sm:block">keep scrolling — watch the shift</p>
          <span className="kicker text-muted/40 tabular">FIG. 03</span>
        </div>

        <div className="relative flex-1 min-h-0 grid place-items-center">
          <div data-monitor className="w-[min(52vw,480px)]">
            <MonitorArt className="w-full h-auto" />
          </div>
          <div data-phone className="absolute w-[min(34vw,300px)] opacity-0">
            <PhoneArt className="w-full h-auto" />
          </div>
        </div>

        <div className="mt-8">
          <div className="relative min-h-[130px]">
            {MORPH_STAGES.map((s, i) => (
              <div
                key={s.year}
                data-morph-caption={i}
                className={`absolute inset-0 ${i > 0 ? "invisible opacity-0" : ""}`}
              >
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <span className="font-mono tabular text-accent text-sm tracking-[0.14em]">{s.year}</span>
                  <h4 className="font-display font-semibold text-2xl sm:text-3xl text-paper">{s.title}</h4>
                </div>
                <p className="mt-3 text-muted leading-relaxed text-[15px] max-w-2xl">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono text-[11px] text-muted tracking-[0.18em]">DESK</span>
            <div className="relative flex-1 h-px bg-line">
              <div data-morph-rail className="absolute inset-0 bg-accent origin-left" />
            </div>
            <span className="font-mono text-[11px] text-muted tracking-[0.18em]">POCKET</span>
          </div>
        </div>
      </div>
      <ol className="sr-only">
        {MORPH_STAGES.map((s) => (
          <li key={s.year}>{s.year}: {s.title}. {s.text}</li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const topics = [
  {
    icon: Smartphone,
    title: "Smartphones",
    text: "The iPhone (2007) redefined the category; Android (2008) made it universal. Within a decade, more humans held a connected computer than ever held a landline.",
  },
  {
    icon: LayoutGrid,
    title: "App stores",
    text: "From 10 July 2008, software came from a store — curated, one-tap, updated forever. Native apps and the mobile web grew up as friendly rivals.",
  },
  {
    icon: StretchHorizontal,
    title: "Responsive design",
    text: "Ethan Marcotte's May 2010 article gave the discipline its name: one codebase, fluid grids, media queries — the same page gracefully fits every screen.",
  },
  {
    icon: CloudUpload,
    title: "Cloud & sync",
    text: "Your photos, notes and playlists stopped living in one machine. Phones became windows onto cloud state — lose the phone, keep the life.",
  },
  {
    icon: PlayCircle,
    title: "Streaming on the go",
    text: "4G turned commutes into cinema and radio. In January 2016 Netflix expanded to 190 new countries in a single day; music and video became services, not files.",
  },
  {
    icon: Heart,
    title: "Feeds & friends",
    text: "Instagram (2010), Snapchat (2011) and short-video apps rebuilt social life around the camera — likes, stories and an algorithmic feed for everyone.",
  },
];

export default function MobileEra() {
  const facts = factsForChapter("mobile");

  return (
    <Chapter
      id="mobile-era"
      chapterId="mobile"
      num="07"
      kicker="The mobile revolution"
      years="2010–2020"
      title="The internet becomes everywhere."
      lede="The web escaped the desk. A connected computer slid into the pocket of half of humanity — and everything from design to commerce, news to friendship, reorganized itself around a thumb."
    >
      <DeviceMorph />

      <div className="mt-20 sm:mt-28 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="d-2 text-paper">The pocket decade</h3>
          <p className="text-muted leading-relaxed mt-5">
            Every chapter of this museum changed machines. This one changed
            where the machines live: with us. The shift shows up in the
            numbers — and in the way a whole generation says “phone” when
            they mean “internet”.
          </p>
        </div>
        <div data-fade-group className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
          {topics.map((t) => (
            <article key={t.title} className="border border-line bg-card/60 p-6 sm:p-7">
              <t.icon size={20} className="text-accent mb-4" aria-hidden="true" />
              <h4 className="font-display font-semibold text-lg text-paper mb-2.5">{t.title}</h4>
              <p className="text-muted text-[15px] leading-relaxed">{t.text}</p>
            </article>
          ))}
        </div>
      </div>

      {/* stats band */}
      <div data-fade-group className="mt-20 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
        {[
          { year: "JUL 2008", big: "Day 1", label: "of the App Store", note: "500 apps; billions of downloads followed." },
          { year: "OCT 2012", big: "1B", label: "monthly users on Facebook", note: "Mostly mobile by then — the feed had moved to the pocket." },
          { year: "OCT 2016", big: "51.3%", label: "of browsing is mobile + tablet", note: "Desktop falls to 48.7% — a first (StatCounter)." },
          { year: "LATE 2010s", big: ">50%", label: "of humanity online", note: "A first, per the ITU — and still climbing." },
        ].map((s) => (
          <div key={s.year} className="border-r border-b border-line p-6 sm:p-8">
            <p className="kicker text-muted/60 mb-3 tabular">{s.year}</p>
            <p className="font-display font-semibold text-4xl sm:text-5xl text-paper tabular">{s.big}</p>
            <p className="text-muted text-sm mt-2">{s.label}</p>
            <p className="text-muted/60 text-[12px] leading-relaxed mt-2">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 max-w-4xl">
        <FactCard fact={facts.find((f) => f.id === "mobile-majority")} index={7} />
        <FactCard fact={facts.find((f) => f.id === "responsive-2010")} index={8} />
      </div>
    </Chapter>
  );
}
