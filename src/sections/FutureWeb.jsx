import { Suspense, lazy, useRef } from "react";
import {
  Satellite,
  Orbit,
  Bot,
  Atom,
  Radio,
  Network,
} from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import { useInView } from "../hooks/useInView.js";
import { useMotionPreference } from "../hooks/useMotionPreference.js";
import { scrollToTarget } from "../animations/scroll.js";

const FutureScene = lazy(() => import("../components/three/FutureScene.jsx"));

const directions = [
  {
    icon: Satellite,
    tag: "SHIPPING",
    title: "Orbital internet",
    text: "Mega-constellations already beam broadband to places cables never reached — deserts, seas, disaster zones.",
    float: "floaty-a",
  },
  {
    icon: Orbit,
    tag: "EARLY",
    title: "Spatial computing",
    text: "Headsets blur the room and the page. The browser may yet escape the rectangle entirely.",
    float: "floaty-b",
  },
  {
    icon: Bot,
    tag: "EMERGING",
    title: "AI agents",
    text: "From browsing pages to delegating tasks — software that acts with you, not just for you.",
    float: "floaty-a",
  },
  {
    icon: Atom,
    tag: "RESEARCH",
    title: "Quantum networking",
    text: "Entangled links promise channels no eavesdropper can touch. In laboratories — for now.",
    float: "floaty-b",
  },
  {
    icon: Radio,
    tag: "RESEARCH",
    title: "6G",
    text: "Terahertz radio, sensing networks, a decade of standards work ahead. The name is already spoken for.",
    float: "floaty-a",
  },
  {
    icon: Network,
    tag: "EVOLVING",
    title: "Re-decentralising",
    text: "Tim Berners-Lee and others keep asking the founding question: could the web belong to its users again?",
    float: "floaty-b",
  },
];

export default function FutureWeb() {
  const { reduced } = useMotionPreference();
  const [sceneRef, sceneActive] = useInView({ rootMargin: "10% 0px" });
  const closeRef = useRef(null);

  return (
    <Chapter
      id="future-web"
      chapterId="future"
      num="09"
      kicker="The future"
      years="BEYOND"
      title="What comes next?"
      lede="Every era in this museum began as a rumour in a laboratory. Here are today's rumours — some already shipping, some still scribbles — arranged on the museum's final wall."
      className="overflow-hidden"
    >
      {/* 3D backdrop + floating direction cards */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-10">
        <div
          ref={sceneRef}
          className="absolute inset-0 min-h-[560px] pointer-events-none"
          aria-hidden="true"
        >
          {!reduced && (
            <Suspense fallback={null}>
              <FutureScene active={sceneActive} />
            </Suspense>
          )}
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 py-10">
          {directions.map((d, i) => (
            <article
              key={d.title}
              data-fade
              className={`border border-line bg-ink/70 backdrop-blur-[2px] p-6 sm:p-7 ${d.float}`}
              style={{ animationDelay: `${i * -1.3}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <d.icon size={20} className="text-accent" aria-hidden="true" />
                <span
                  className={`kicker px-2 py-1 border ${
                    d.tag === "SHIPPING"
                      ? "text-accent border-accent/50"
                      : d.tag === "RESEARCH"
                        ? "text-muted border-line"
                        : "text-paper/80 border-muted/40"
                  }`}
                >
                  {d.tag}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-paper mb-2.5">
                {d.title}
              </h3>
              <p className="text-muted text-[15px] leading-relaxed">{d.text}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Closing message */}
      <div ref={closeRef} className="relative py-24 sm:py-36 text-center">
        <p className="kicker text-muted/60 mb-8">
          Museum exit — thank you for visiting
        </p>
        <blockquote className="max-w-5xl mx-auto">
          <p data-split className="d-1 text-paper">
            The internet is still evolving.
          </p>
          <p
            data-split
            className="d-1 text-muted mt-2"
          >
            Its next chapter hasn&rsquo;t been written yet.
          </p>
        </blockquote>
        <p className="text-muted mt-10 max-w-xl mx-auto leading-relaxed">
          Somewhere tonight, in a lab or a dorm room, a first message is
          being typed for something that doesn&rsquo;t have a name. In fifty
          years, a museum like this one will tell its story.
        </p>
        <button
          onClick={() => scrollToTarget("#timeline")}
          className="kicker text-paper hover:text-accent border border-line hover:border-accent/50 px-6 py-3.5 mt-10 transition-colors"
        >
          Revisit the master timeline
        </button>
      </div>
    </Chapter>
  );
}
