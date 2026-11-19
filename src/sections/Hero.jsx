import { Suspense, lazy, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../animations/gsap.js";
import { useMotionPreference } from "../hooks/useMotionPreference.js";
import { useInView } from "../hooks/useInView.js";
import { scrollToTarget } from "../animations/scroll.js";
import LogoMark from "../components/LogoMark.jsx";

const HeroScene = lazy(() => import("../components/three/HeroScene.jsx"));

/* Static constellation shown while the 3D chunk loads (or forever, for reduced motion). */
function StaticConstellation() {
  const pts = [
    [12, 22], [28, 12], [44, 26], [58, 14], [72, 30], [88, 18],
    [18, 52], [36, 64], [54, 50], [70, 68], [86, 56], [94, 80],
    [10, 82], [30, 90], [50, 78], [68, 88], [82, 92],
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [0, 6], [2, 8], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [6, 12],
    [12, 13], [13, 14], [14, 15], [15, 16], [9, 15], [7, 13],
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full opacity-50"
      aria-hidden="true"
    >
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={pts[a][0]} y1={pts[a][1]}
          x2={pts[b][0]} y2={pts[b][1]}
          stroke="#f5f5f0"
          strokeOpacity="0.14"
          strokeWidth="0.2"
        />
      ))}
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x} cy={y} r={i % 5 === 0 ? 0.8 : 0.45}
          fill={i % 7 === 0 ? "#d8ff3e" : "#f5f5f0"}
          fillOpacity={i % 3 === 0 ? 0.9 : 0.5}
        />
      ))}
    </svg>
  );
}

export default function Hero({ ready }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const sceneHostRef = useRef(null);
  const [sceneRef, sceneActive] = useInView({ rootMargin: "5% 0px" });
  const { reduced } = useMotionPreference();

  // Entrance: staggered character reveal once the preloader has lifted.
  useGSAP(
    () => {
      if (reduced || !ready || !titleRef.current) return;
      const split = new SplitText(titleRef.current, {
        type: "chars",
        mask: "chars",
      });
      gsap.from(split.chars, {
        yPercent: 115,
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.022,
        delay: 0.15,
      });
      gsap.from("[data-hero-fade]", {
        y: 24,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.7,
        clearProps: "opacity,visibility",
      });
    },
    { scope: sectionRef, dependencies: [ready, reduced], revertOnUpdate: true }
  );

  // Exit choreography: content lifts away, constellation zooms slightly.
  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      tl.to(contentRef.current, { yPercent: -18, opacity: 0.15 }, 0);
      if (sceneHostRef.current) {
        tl.to(sceneHostRef.current, { scale: 1.12 }, 0);
      }
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction — The Internet, a journey through time"
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* Constellation backdrop */}
      <div ref={sceneHostRef} className="absolute inset-0" aria-hidden="true">
        <div ref={sceneRef} className="absolute inset-0">
          {!reduced ? (
            <Suspense fallback={<StaticConstellation />}>
              <HeroScene active={sceneActive} />
            </Suspense>
          ) : (
            <StaticConstellation />
          )}
        </div>
        <div className="absolute inset-0 vignette" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col justify-between mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-6 sm:pb-8"
      >
        {/* Museum meta */}
        <div
          data-hero-fade
          className="flex items-center justify-between kicker text-muted"
        >
          <span className="flex items-center gap-2.5">
            <LogoMark className="w-4 h-4" />
            A digital museum
          </span>
          <span className="hidden sm:block tabular">Est. 2026 — N° 01–09</span>
          <span className="tabular">1945 → beyond</span>
        </div>

        {/* Headline */}
        <div className="py-14 sm:py-10">
          <h1 ref={titleRef} className="d-hero max-w-[12ch] text-paper">
            <span className="block">The Internet.</span>
            <span className="block text-muted">
              A journey through time.
            </span>
          </h1>
          <p
            data-hero-fade
            className="body-lg text-muted max-w-xl mt-8 sm:mt-10"
          >
            From the first connected computers to a world transformed by the
            web. Explore the history of the technology that changed everything.
          </p>
        </div>

        {/* Bottom row: scroll cue + chapter label */}
        <div
          data-hero-fade
          className="flex items-end justify-between gap-6"
        >
          <button
            onClick={() => scrollToTarget("#beginning")}
            className="group flex items-center gap-4 text-left"
            aria-label="Begin the tour — scroll to the first chapter"
          >
            <span className="block w-px h-14 sm:h-20 bg-line overflow-hidden">
              <span className="block w-px h-full bg-accent scroll-hint-line" />
            </span>
            <span>
              <span className="kicker text-paper block mb-1.5 group-hover:text-accent transition-colors">
                Scroll to begin
              </span>
              <span className="kicker text-muted/70 block">
                The tour starts below
              </span>
            </span>
            <ArrowDown
              size={15}
              aria-hidden="true"
              className="text-muted group-hover:text-accent transition-colors group-hover:translate-y-1"
            />
          </button>
          <p className="kicker text-muted/60 text-right hidden sm:block">
            CH.01 — Introduction
            <span className="block mt-1.5 text-muted/40">
              Scroll-driven · 9 chapters · 1 timeline
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
