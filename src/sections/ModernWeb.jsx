import { useRef } from "react";
import {
  CloudCog,
  RadioTower,
  Boxes,
  BrainCircuit,
  ShieldCheck,
  Telescope,
} from "lucide-react";
import Chapter from "../components/Chapter.jsx";
import FactCard from "../components/FactCard.jsx";
import { gsap, useGSAP } from "../animations/gsap.js";
import { useMotionPreference } from "../hooks/useMotionPreference.js";
import { factsForChapter } from "../data/facts.js";

/* Animated number that counts up when it enters the viewport. */
function CountUp({ value, decimals = 0, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const { reduced } = useMotionPreference();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
        return;
      }
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
        },
      });
    },
    { dependencies: [value, decimals, suffix, prefix, reduced], revertOnUpdate: true }
  );

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 5.5,
    decimals: 1,
    suffix: "B",
    label: "people online in 2024",
    note: "From 4 nodes in 1969 to most of humanity — measured by the ITU.",
  },
  {
    value: 68,
    suffix: "%",
    label: "of the world connected",
    note: "The remaining third is the next chapter of the story.",
  },
  {
    value: 227,
    suffix: "M",
    label: "new users in 2024 alone",
    note: "Roughly the population of Germany joins every year.",
  },
  {
    value: 100,
    suffix: "M",
    label: "ChatGPT users in ~2 months",
    note: "The fastest consumer-app adoption ever recorded (UBS).",
  },
];

const topics = [
  {
    icon: CloudCog,
    title: "Cloud & edge",
    text: "The internet's engines moved into hyperscale data centres and edge nodes close to users. A website is no longer a machine — it's a planet-scale elastic system that grew out of AWS's 2006 rent-a-computer idea.",
  },
  {
    icon: RadioTower,
    title: "Real-time everything",
    text: "WebRTC carries video calls browser-to-browser; documents edit themselves while colleagues type. When the 2020 pandemic moved life online, the infrastructure — mercifully — was already waiting.",
  },
  {
    icon: Boxes,
    title: "A maturing platform",
    text: "WebAssembly (2017) runs near-native code in the browser, HTTP/2 and HTTP/3 cut latency, service workers let web apps work offline. The open web platform became what plugins once promised.",
  },
  {
    icon: BrainCircuit,
    title: "The AI turn",
    text: "From 30 November 2022, conversational AI moved from research demos to default tool. Language models now draft, summarise, code and converse — woven into search, editors and this decade's products.",
  },
];

export default function ModernWeb() {
  const facts = factsForChapter("modern");

  return (
    <Chapter
      id="modern-web"
      chapterId="modern"
      num="08"
      kicker="The modern internet"
      years="2020–PRESENT"
      title="A world built on the internet."
      lede="Work, school, markets, medicine, friendship — the load-bearing walls of modern life now sit on a network invented to share papers between labs. This is what that looks like, in numbers."
    >
      {/* stats */}
      <div
        data-fade-group
        className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line"
      >
        {stats.map((s) => (
          <div key={s.label} className="border-r border-b border-line p-6 sm:p-8">
            <p className="font-display font-semibold text-5xl sm:text-6xl text-paper">
              <CountUp
                value={s.value}
                decimals={s.decimals ?? 0}
                suffix={s.suffix}
              />
            </p>
            <p className="text-muted text-sm mt-3">{s.label}</p>
            <p className="text-muted/60 text-[12px] leading-relaxed mt-2">
              {s.note}
            </p>
          </div>
        ))}
      </div>

      {/* topics */}
      <div className="mt-20 sm:mt-28 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="d-2 text-paper">The infrastructure of everything</h3>
          <p className="text-muted leading-relaxed mt-5">
            None of this arrived at once. Each layer shipped quietly, then
            became assumed. The modern internet is what decades of quiet
            compounding looks like — suddenly.
          </p>
        </div>
        <div data-fade-group className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
          {topics.map((t) => (
            <article key={t.title} className="border border-line bg-card/60 p-6 sm:p-7">
              <t.icon size={20} className="text-accent mb-4" aria-hidden="true" />
              <h4 className="font-display font-semibold text-lg text-paper mb-2.5">
                {t.title}
              </h4>
              <p className="text-muted text-[15px] leading-relaxed">{t.text}</p>
            </article>
          ))}
        </div>
      </div>

      {/* established vs emerging */}
      <div className="mt-20 sm:mt-28 grid gap-4 md:grid-cols-2">
        <div data-fade className="border border-line bg-ink-2 p-6 sm:p-8">
          <p className="kicker text-accent flex items-center gap-2 mb-5">
            <ShieldCheck size={13} aria-hidden="true" /> Established — we report it as fact
          </p>
          <ul className="space-y-3.5 text-[15px] text-muted leading-relaxed">
            <li>
              <span className="text-paper">5.5 billion people online (68%)</span>{" "}
              in 2024 — the ITU's measurement.
            </li>
            <li>
              <span className="text-paper">Cloud is the default</span> — the
              majority of new enterprise workloads run on rented
              infrastructure.
            </li>
            <li>
              <span className="text-paper">ChatGPT's record adoption</span> —
              ~100 million users within two months (UBS analysis, Feb 2023).
            </li>
            <li>
              <span className="text-paper">The web platform matured</span> —
              WebAssembly, HTTP/3 and PWAs all shipped and are widely
              supported.
            </li>
          </ul>
        </div>
        <div data-fade className="border border-dashed border-muted/40 bg-ink-2/60 p-6 sm:p-8">
          <p className="kicker text-muted flex items-center gap-2 mb-5">
            <Telescope size={13} aria-hidden="true" /> Emerging — we report it as trend
          </p>
          <ul className="space-y-3.5 text-[15px] text-muted leading-relaxed">
            <li>
              <span className="text-paper">AI's long-term shape</span> — how
              deeply models reshape interfaces is still an open question.
            </li>
            <li>
              <span className="text-paper">Regulation</span> — the EU's AI Act
              entered into force in 2024 and rolls out in phases; its effects
              are unfolding.
            </li>
            <li>
              <span className="text-paper">New interfaces</span> — spatial
              computing and agents are promising, not yet dominant.
            </li>
            <li>
              <span className="text-paper">Decentralisation debates</span> —
              from Web3 to protocol renaissance, contested and unresolved.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 max-w-4xl">
        <FactCard fact={facts.find((f) => f.id === "chatgpt-speed")} index={9} />
        <FactCard
          fact={facts.find((f) => f.id === "five-point-five-billion")}
          index={10}
        />
      </div>
    </Chapter>
  );
}
